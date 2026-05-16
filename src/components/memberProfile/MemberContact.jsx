import { useState, useEffect, useMemo } from "react";
import HomeTest from "../Header";
import { CategoriesNav, BreadcrumbNav, SectionTitle, Pagination, ExportButton } from "../common";
import { fetchMemberContact } from "../../api/services/all.service";
import { exportData as exportDataUtil } from "../../utils/exportUtils";

// ---------------------------------------------------------------------------
// Helpers — the API returns member.langs items as either plain objects OR as
// PowerShell-style "@{key=value; ...}" strings (depending on the serialiser).
// We normalise both shapes here.
// ---------------------------------------------------------------------------

/** Parse a single lang entry regardless of whether it is an object or a string. */
const parseLang = (lang) => {
  if (!lang) return null;
  if (typeof lang === "object") return lang;
  // PowerShell "@{id=1; language_id=2; name=FOO; ...}" → plain object
  if (typeof lang === "string" && lang.startsWith("@{")) {
    const inner = lang.slice(2, -1); // strip "@{" and "}"
    const obj = {};
    inner.split(";").forEach((pair) => {
      const eqIdx = pair.indexOf("=");
      if (eqIdx === -1) return;
      const key = pair.slice(0, eqIdx).trim();
      const val = pair.slice(eqIdx + 1).trim();
      obj[key] = val;
    });
    return obj;
  }
  return null;
};

/** Get the English (language_id=2) name, falling back to the first lang entry. */
const getMemberName = (contact) => {
  const langs = contact?.member?.langs;
  if (!Array.isArray(langs) || langs.length === 0) return "";
  const parsed = langs.map(parseLang).filter(Boolean);
  const en = parsed.find((l) => String(l.language_id) === "2");
  return (en?.name || parsed[0]?.name || "").trim();
};

/** Get the English permanent address, falling back to the first lang entry. */
const getPermanentAddress = (contact) => {
  const langs = contact?.langs;
  if (!Array.isArray(langs) || langs.length === 0) return "";
  // Prefer language_id=2 (English), then first non-empty
  const parsed = langs.map(parseLang).filter(Boolean);
  const en = parsed.find((l) => String(l.language_id) === "2");
  const addr = en?.permanent_address || parsed[0]?.permanent_address || "";
  return (addr === "-" || addr === null) ? "" : (addr || "").trim();
};

/** Deduplicate contacts by member_id — keep the one with the most data. */
const deduplicateByMember = (contacts) => {
  const map = new Map();
  for (const c of contacts) {
    const key = c.member_id;
    if (!map.has(key)) {
      map.set(key, c);
    } else {
      // Prefer the entry that has more contact info
      const existing = map.get(key);
      const existingScore =
        (existing.mobile_nos ? 1 : 0) +
        (existing.email_ids ? 1 : 0) +
        (existing.office_telephone ? 1 : 0);
      const newScore =
        (c.mobile_nos ? 1 : 0) +
        (c.email_ids ? 1 : 0) +
        (c.office_telephone ? 1 : 0);
      if (newScore > existingScore) map.set(key, c);
    }
  }
  return Array.from(map.values());
};

// ---------------------------------------------------------------------------
// Alphabet filter component
// ---------------------------------------------------------------------------
const AlphabetFilter = ({ onLetterClick, activeLetter }) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  return (
    <div className="alphabets d-flex w-100 wow fadeInUp" style={{ flexWrap: "wrap", gap: "2px" }}>
      <a
        href="#"
        className={!activeLetter ? "active" : ""}
        onClick={(e) => { e.preventDefault(); onLetterClick(""); }}
      >
        All
      </a>
      {alphabet.map((letter) => (
        <a
          href="#"
          key={letter}
          className={activeLetter === letter ? "active" : ""}
          onClick={(e) => { e.preventDefault(); onLetterClick(letter); }}
        >
          {letter}
        </a>
      ))}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
const MemberContact = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [allMemberData, setAllMemberData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    memberName: "",
    alphabetFilter: "",
    orderBy: "Members",
  });

  const ITEMS_PER_PAGE = 15;

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch ALL pages once on mount
  useEffect(() => {
    let cancelled = false;

    const loadAll = async () => {
      setLoading(true);
      try {
        let accumulated = [];
        let page = 1;
        let lastPage = 1;

        do {
          const paginated = await fetchMemberContact(page);
          // paginated = { data: [...], last_page, total, ... }
          if (Array.isArray(paginated?.data) && paginated.data.length > 0) {
            accumulated = [...accumulated, ...paginated.data];
            lastPage = paginated.last_page || 1;
          } else {
            break;
          }
          page++;
        } while (page <= lastPage);

        if (!cancelled) {
          // Deduplicate by member_id before storing
          setAllMemberData(deduplicateByMember(accumulated));
        }
      } catch (err) {
        console.error("Error loading member contact:", err);
        if (!cancelled) setAllMemberData([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadAll();
    return () => { cancelled = true; };
  }, []);

  // ---------------------------------------------------------------------------
  // Filtering + sorting (memoised)
  // ---------------------------------------------------------------------------
  const filteredSorted = useMemo(() => {
    let result = allMemberData.filter((contact) => {
      const name = getMemberName(contact);

      // Name search
      if (
        filters.memberName &&
        !name.toLowerCase().includes(filters.memberName.toLowerCase())
      ) {
        return false;
      }

      // Alphabet filter — match against the first letter of the name
      if (filters.alphabetFilter) {
        const firstLetter = name.trimStart().charAt(0).toUpperCase();
        if (firstLetter !== filters.alphabetFilter) return false;
      }

      return true;
    });

    // Sort
    if (filters.orderBy === "Members") {
      result = [...result].sort((a, b) =>
        getMemberName(a).localeCompare(getMemberName(b))
      );
    }

    return result;
  }, [allMemberData, filters]);

  // ---------------------------------------------------------------------------
  // Pagination
  // ---------------------------------------------------------------------------
  const totalPages = Math.ceil(filteredSorted.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredSorted.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleAlphabetClick = (letter) => {
    setFilters((prev) => ({ ...prev, alphabetFilter: letter }));
    setCurrentPage(1);
  };

  // ---------------------------------------------------------------------------
  // Export
  // ---------------------------------------------------------------------------
  const handleExport = (format) => {
    const exportData = filteredSorted.map((contact, index) => ({
      "Sl. No": index + 1,
      "Name of Member": getMemberName(contact),
      "Permanent Address": getPermanentAddress(contact) || "-",
      Telephone: contact.office_telephone || "-",
      Mobile: contact.mobile_nos || "-",
      "E-mail": contact.email_ids || "-",
    }));

    exportDataUtil(exportData, format, "member-contact", {
      title: "Member Contact Details",
      sheetName: "Member Contact",
    });
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <div className="wrapper ovh">
      <header
        className={`header-nav nav-homepage-style2 stricky main-menu ${
          isScrolled ? "scrolled-nav slideInDown animated" : "slideIn animated"
        }`}
      >
        <HomeTest />
      </header>

      <div className="body_content">
        <CategoriesNav />
        <BreadcrumbNav
          breadcrumbs={[
            { name: "Home", href: "/" },
            { name: "RTI/Contacts", href: "/rti" },
            { name: "Member Contact", href: "/member-contact" },
          ]}
        />

        <section className="Bussiness-schedule quest pt20 pb30 pb30-md represent">
          <div className="container">
            <SectionTitle title="Member Contact" />

            <div className="bill-content col-md-12 mt30 committeeDt">
              {/* Filter Section */}
              <div
                className="filter-section mb-4 p-4"
                style={{ backgroundColor: "#f5f5f5", borderRadius: "8px" }}
              >
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Member Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter member name"
                      value={filters.memberName}
                      onChange={(e) => handleFilterChange("memberName", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Alphabet Filter */}
              <div className="mb-4">
                <AlphabetFilter
                  onLetterClick={handleAlphabetClick}
                  activeLetter={filters.alphabetFilter}
                />
              </div>

              {/* Summary + Export */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <strong>Total Records: {filteredSorted.length}</strong>
                  {filters.alphabetFilter && (
                    <span className="ms-2 text-muted">
                      (Filtered by: {filters.alphabetFilter})
                    </span>
                  )}
                  {!filters.alphabetFilter &&
                    !filters.memberName &&
                    filteredSorted.length === allMemberData.length && (
                      <span className="ms-2 text-muted">(Showing All)</span>
                    )}
                </div>
                <ExportButton
                  buttonText="Export"
                  exportOptions={["PDF", "Excel", "CSV", "XML", "DOC"]}
                  onExport={handleExport}
                  buttonClassName="btn btn-secondary dropdown-toggle"
                />
              </div>

              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading…</span>
                  </div>
                  <p className="mt-2 text-muted">Loading member contacts…</p>
                </div>
              ) : (
                <>
                  <div className="table-responsive">
                    <table className="table myTable2">
                      <thead>
                        <tr>
                          <th scope="col">Sl. No</th>
                          <th scope="col">Name of Member (Constituency)</th>
                          <th scope="col">Permanent Address</th>
                          <th scope="col">Telephone / Mobile</th>
                          <th scope="col">E-mail</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData.length > 0 ? (
                          paginatedData.map((contact, index) => {
                            const name = getMemberName(contact);
                            const address = getPermanentAddress(contact);
                            const phone = [
                              contact.office_telephone &&
                              contact.office_telephone !== "-"
                                ? contact.office_telephone
                                : null,
                              contact.mobile_nos && contact.mobile_nos !== "-"
                                ? contact.mobile_nos
                                : null,
                            ]
                              .filter(Boolean)
                              .join(" / ");

                            return (
                              <tr key={`${contact.id}-${contact.member_id}`}>
                                <td className="text-th">
                                  {startIndex + index + 1}
                                </td>
                                <td className="text-th">
                                  <strong>{name || "—"}</strong>
                                </td>
                                <td className="text-th">{address || "—"}</td>
                                <td className="text-th">{phone || "—"}</td>
                                <td className="text-th">
                                  {contact.email_ids &&
                                  contact.email_ids !== "-" ? (
                                    <a
                                      href={`mailto:${contact.email_ids.trim()}`}
                                    >
                                      {contact.email_ids}
                                    </a>
                                  ) : (
                                    "—"
                                  )}
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="5" className="text-center py-4">
                              No records found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-4">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        totalItems={filteredSorted.length}
                        itemsPerPage={ITEMS_PER_PAGE}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MemberContact;
