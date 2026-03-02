import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import FilterComponent from "./Filter"; // your left-side filter component
import DownloadSelector from "./Download";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import HomeTest from "../Header";
import { Tabs } from "../common";
import { BreadcrumbNav, CategoriesNav, Filter, SectionTitle } from "../common";
import "./MemberProfile.css";
import { fetchKlaMembers } from "../../services/MemberService"; // your API function
import { API_ENDPOINTS } from "../../utils/config";

// --------------------------- Helper: safe access ---------------------------
const safeName = (item) =>
  item?.member?.langs?.[0]?.name || item?.member?.name || "Unknown Member";
const safeConstituency = (item) => item?.constituency?.entitle || "";
// const safeDistrict = (item) => item?.district?.name || "";
const safeGender = (item) => (item?.member?.gender != null ? String(item.member.gender) : "");
const safeImage = (item) => item?.member?.image || item?.image || "/images/prof-dummy.png";

// --------------------------- MemberCard ---------------------------
const MemberCard = ({ member, navigate }) => {
  const name = safeName(member);
  const constituency = safeConstituency(member);
  const party = member?.party?.entitle || member?.party || "XYZ";
  const img = safeImage(member);

  return (
    <div
      className="member-card job-list-style1 bdr1 text-center"
      onClick={() => navigate(`/member-profile/${member.id}`)}
      style={{ cursor: "pointer" }}
    >
      <div className="icon d-flex align-items-center mb20">
        <img
          className="mx-auto"
          src={img}
          alt={name}
          style={{ width: 130, height: 180, objectFit: "cover" }}
          onError={(e) => (e.target.src = "/images/prof-dummy.png")}
        />
        <h6 className="parts">{party}</h6>
      </div>
      <div className="details">
        <h5 className="mb10 member-name">{name}</h5>
        <h6 className="member-constituency">{constituency}</h6>
      </div>
    </div>
  );
};

// --------------------------- Pagination ---------------------------
const Pagination = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage = 24 }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      if (currentPage <= 3) end = 4;
      if (currentPage >= totalPages - 2) start = totalPages - 3;
      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mbp_pagination mt30 text-center">
      <ul className="page_navigation">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </a>
        </li>

        {getPageNumbers().map((page, idx) => (
          <li
            key={idx}
            className={`page-item ${page === currentPage ? "active" : ""} ${
              page === "..." ? "d-none d-sm-inline-block" : ""
            }`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page === "..." ? (
              <a className="page-link" href="#">
                ...
              </a>
            ) : (
              <a
                className="page-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page);
                }}
              >
                {page}
              </a>
            )}
          </li>
        ))}

        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </a>
        </li>
      </ul>

      <p className="mt10 mb-0 pagination_page_count text-center">
        {Math.min(1 + (currentPage - 1) * itemsPerPage, totalItems)} –{" "}
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
      </p>
    </div>
  );
};

// --------------------------- AlphabetFilter ---------------------------
const AlphabetFilter = ({ onLetterClick, activeLetter }) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  return (
    <div className="alphabets d-flex w-100 wow fadeInUp">
      {alphabet.map((letter) => (
        <a
          href="#"
          key={letter}
          className={activeLetter === letter ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            onLetterClick(letter === activeLetter ? "" : letter);
          }}
        >
          {letter}
        </a>
      ))}
    </div>
  );
};

// --------------------------- FilterControls ---------------------------
const FilterControls = ({ onFilterClick = () => {} }) => (
  <div className="row align-items-center mb20">
    <div className="col-6 col-sm-6 col-lg-9 pe-0">
      <div className="text-center text-sm-start">
        <div className="dropdown-lists">
          <ul className="p-0 mb-0 text-center text-sm-start">
            <li className="list-inline-item">
              <button type="button" className="open-btn filter-btn-left mb10" onClick={onFilterClick}>
                <img className="me-2" src="/images/all-filter-icon.svg" alt="Filter" /> All Filter
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <DownloadSelector />
  </div>
);

// --------------------------- Parliament selector ---------------------------
const ParliamentTypeSelector = ({ parliamentType, setParliamentType }) => (
  <div className="mSearch d-flex">
    <form>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="parliamentType"
          value="lok"
          checked={parliamentType === "lok"}
          onChange={() => setParliamentType("lok")}
        />
        <label className="form-check-label">
          <b>Lok Sabha</b>
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="parliamentType"
          value="rajya"
          checked={parliamentType === "rajya"}
          onChange={() => setParliamentType("rajya")}
        />
        <label className="form-check-label">
          <b>Rajya Sabha</b>
        </label>
      </div>
    </form>
  </div>
);

// --------------------------- SearchForm ---------------------------
const SearchForm = ({ searchType, setSearchType, searchQuery, setSearchQuery, onSearch }) => {
  return (
    <div className="mSearch wow fadeInUp">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
      >
        <h6 className="mb-2">Search your Member By</h6>

        <div className="rowW">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="searchType"
              id="inlineRadio1"
              value="name"
              checked={searchType === "name"}
              onChange={() => setSearchType("name")}
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              Name
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="searchType"
              id="inlineRadio2"
              value="constituency"
              checked={searchType === "constituency"}
              onChange={() => setSearchType("constituency")}
            />
            <label className="form-check-label" htmlFor="inlineRadio2">
              Constituency
            </label>
          </div>
        </div>

        <div className="col-md-4 mt-2 col-xl-3 col-sm-12">
          <div className="memberSearch">
            <input
              type="text"
              className="form-control py-2"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

// --------------------------- Main MemberList ---------------------------
const MemberList = () => {
  const navigate = useNavigate();
  const sectionTopRef = useRef(null);

  // Tabs and UI state
  const [activeTab, setActiveTab] = useState("pills-profile2"); // current members
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [klaList, setKlaList] = useState([]);
  const [selectedKla, setSelectedKla] = useState(14);
  const [assemblySelection, setAssemblySelection] = useState("sitting"); // 'sitting' or 'former' etc.

  // search & alphabet
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [activeLetter, setActiveLetter] = useState("");

  // parliament type (lok/rajya)
  const [parliamentType, setParliamentType] = useState("lok");

  // members & filters
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // pagination
  const itemsPerPage = 24;
  const [currentMembersPage, setCurrentMembersPage] = useState(1);
  const [formerMembersPage, setFormerMembersPage] = useState(1);

  // left-side filters state (send to FilterComponent)
  const [filters, setFilters] = useState({
    district: "",
    constituency: "",
    gender: "",
    party: "",
    qualification: "",
    terms: "",
  });

  // Former members (static fallback; can be replaced with API)
  const formerMembersStatic = [
    { name: "Shri. A. B. Dev", tenure: "1952 – 1957", img: "https://www.niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Dy_Speakers/1.koayshabhai.jpg" },
    { name: "Smt. Lakshmi Amma", tenure: "1960 – 1965", img: "https://www.niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Dy_Speakers/1.koayshabhai.jpg" },
    { name: "Shri. Madhavan Nair", tenure: "1970 – 1976", img: "https://www.niyamasabha.nic.in/images/Fromer_Speakers_DySpeakers/Former_Dy_Speakers/1.koayshabhai.jpg" },
  ];

  // --------------------------- Fetch KLA list (dynamic) ---------------------------
  useEffect(() => {
    let cancelled = false;
    const loadKlas = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.KLA_LIST);
        const json = await res.json();
        if (!cancelled && json?.status && json?.data) {
          setKlaList(json.data);
          // if selectedKla not in list, set first available
          if (!json.data.find((k) => k.id === selectedKla)) {
            setSelectedKla(json.data[0]?.id || selectedKla);
          }
        }
      } catch (err) {
        // silently fail and keep klaList empty; UI will still work
        console.error("Failed to load KLA list", err);
      }
    };
    loadKlas();
    return () => {
      cancelled = true;
    };
  }, []); // run once

  // --------------------------- Fetch members for selected KLA ---------------------------
  useEffect(() => {
    let cancelled = false;
    const loadMembers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchKlaMembers(selectedKla);
        if (cancelled) return;
        // if API returns objects that are already entries, use as is
        if (Array.isArray(data)) {
          setMembers(data);
          setFilteredMembers(data);
        } else {
          // fallback: if unexpected shape, try to extract .data or keep empty
          setMembers([]);
          setFilteredMembers([]);
        }
      } catch (err) {
        console.error(err);
        // fallback: small mock so page doesn't crash
        const mock = [
          {
            id: 1,
            kla_id: selectedKla,
            constituency: { entitle: "Mock (MCK)" },
            district: { name: "MockDistrict" },
            member: { langs: [{ name: "Mock Member" }], gender: 1, image: null },
          },
        ];
        setMembers(mock);
        setFilteredMembers(mock);
        setError("Failed to load members from API. Showing fallback data.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadMembers();
    return () => {
      cancelled = true;
    };
  }, [selectedKla]);

  // --------------------------- applyFilters (safe string access) ---------------------------
  const applyFilters = useCallback(() => {
    let filtered = Array.isArray(members) ? members.slice() : [];

    // Parliament type filter (current members tab)
    if (activeTab === "pills-profile2") {
      filtered = filtered.filter((m) => {
        const cname = (m.constituency?.entitle || "").toString();
        return parliamentType === "lok" ? cname.includes("(") : !cname.includes("(");
      });
    }

    // search filter
    if (searchQuery?.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((m) => {
        const name = (m.member?.langs?.[0]?.name || "").toLowerCase();
        const constituency = (m.constituency?.entitle || "").toLowerCase();
        return searchType === "name" ? name.includes(q) : constituency.includes(q);
      });
    }

    // alphabet filter
    if (activeLetter) {
      filtered = filtered.filter((m) => {
        const name = (m.member?.langs?.[0]?.name || "").toString();
        return name.startsWith(activeLetter);
      });
    }

    // left-side filters (district, constituency text, gender, party etc.)
    if (filters) {
      if (filters.district) {
        filtered = filtered.filter((m) => (m.district?.name || "").toLowerCase() === filters.district.toLowerCase());
      }

      if (filters.constituency) {
        filtered = filtered.filter((m) => (m.constituency?.entitle || "").toLowerCase().includes(filters.constituency.toLowerCase()));
      }

      if (filters.gender) {
        filtered = filtered.filter((m) => safeGender(m) === String(filters.gender));
      }

      if (filters.party) {
        filtered = filtered.filter((m) => {
          const p = (m.party?.entitle || m.party || "").toLowerCase();
          return p === filters.party.toLowerCase();
        });
      }

      // add more fields as needed
    }

    setFilteredMembers(filtered);
    setCurrentMembersPage(1);
  }, [members, activeTab, parliamentType, searchQuery, searchType, activeLetter, filters]);

  useEffect(() => {
    // Only apply when members changed or filters changed
    applyFilters();
  }, [applyFilters]);

  // --------------------------- pagination derived values ---------------------------
  const totalCurrentMembers = filteredMembers.length;
  const totalCurrentPages = Math.max(1, Math.ceil(totalCurrentMembers / itemsPerPage));
  const currentMembers = useMemo(() => {
    const start = (currentMembersPage - 1) * itemsPerPage;
    return filteredMembers.slice(start, start + itemsPerPage);
  }, [filteredMembers, currentMembersPage]);

  const totalFormerMembers = formerMembersStatic.length;
  const totalFormerPages = Math.max(1, Math.ceil(totalFormerMembers / itemsPerPage));
  const pagedFormerMembers = useMemo(() => {
    const start = (formerMembersPage - 1) * itemsPerPage;
    return formerMembersStatic.slice(start, start + itemsPerPage);
  }, [formerMembersPage]);

  // --------------------------- handlers ---------------------------
  const toggleFilter = () => setIsFilterOpen((s) => !s);

  const handleLetterClick = (letter) => {
    setActiveLetter(letter);
    setCurrentMembersPage(1);
  };

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    setCurrentMembersPage(1);
    setFormerMembersPage(1);
    setSearchQuery("");
    setActiveLetter("");
  };

  const handlePageChange = (page) => {
    if (activeTab === "pills-profile2") setCurrentMembersPage(page);
    else setFormerMembersPage(page);

    if (sectionTopRef.current) {
      sectionTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleFilterSubmit = (newFilters) => {
    setFilters(newFilters);
    setIsFilterOpen(false);
    // applyFilters will run via effect
  };

  const handleSearch = () => {
    applyFilters();
  };

  // --------------------------- UI ---------------------------
  return (
    <div className="body_content">
      <header className={`header-nav nav-homepage-style2 stricky main-menu`}>
        <HomeTest />
      </header>

      <CategoriesNav />
      <BreadcrumbNav
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Members", href: "/members" },
          { name: "Members of Niyamasabha", href: "/Members/Niyamasabha-Members" },
        ]}
      />

      <section className="pt30 pb-0 pb30-md represent" ref={sectionTopRef}>
        <div className="container">
          <SectionTitle title="Members of Niyamasabha" />

          {/* Tabs */}
          <Tabs
            tabs={[
              {
                key: "pills-profile2",
                label: "Current Members",
                content: (
                  <section className="mt-2 pt-2">
                    {/* TOP FILTER ROW: KLA dropdown + Assembly selection + Search */}
                    <div className="row mb-3 align-items-center memb-list-top-filter">
                      <div className="col-md-12">
                        <div className="bg-light p-3 rounded">
                          <div className="d-flex gap-2 align-items-center flex-wrap">
                            <label className="me-2 mb-0">KLA</label>
                            <select
                              className="form-select w-auto"
                              value={selectedKla}
                              onChange={(e) => setSelectedKla(Number(e.target.value))}
                            >
                              {klaList.length === 0 && <option value={14}>14th KLA</option>}
                              {klaList.map((kla) => (
                                <option key={kla.id} value={kla.id}>
                                  {kla.languages?.[0]?.name || `KLA ${kla.id}`}
                                </option>
                              ))}
                            </select>

                            <label className="ms-3 me-2 mb-0">LEGISLATIVE ASSEMBLY</label>
                            <select className="form-select w-auto" value={assemblySelection} onChange={(e) => setAssemblySelection(e.target.value)}>
                              <option value="sitting">Sitting Members</option>
                              <option value="former">Former Members</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="bg-white p-3 rounded">
                          <SearchForm
                            searchType={searchType}
                            setSearchType={setSearchType}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            onSearch={handleSearch}
                          />
                        </div>
                      </div>
                    </div>

                    {/* small gap then controls */}
                    <FilterControls onFilterClick={toggleFilter} />

                    {/* Parliament type radios */}
                    <ParliamentTypeSelector parliamentType={parliamentType} setParliamentType={setParliamentType} />

                    {/* Member grid */}
                    <div className="member-grid memberList">
                      {loading ? (
                        <p>Loading members...</p>
                      ) : error ? (
                        <p className="text-danger">{error}</p>
                      ) : currentMembers.length > 0 ? (
                        currentMembers.map((m) => <MemberCard key={m.id} member={m} navigate={navigate} />)
                      ) : (
                        <div className="text-center my-4">
                          <h4>No members found matching your criteria</h4>
                          <button
                            className="btn clr-fltr-btn mt-3"
                            onClick={() => {
                              setSearchQuery("");
                              setActiveLetter("");
                              setFilters({
                                district: "",
                                constituency: "",
                                gender: "",
                                party: "",
                                qualification: "",
                                terms: "",
                              });
                            }}
                          >
                            Clear Filters
                          </button>
                        </div>
                      )}
                    </div>

                    <Pagination
                      currentPage={currentMembersPage}
                      totalPages={totalCurrentPages}
                      onPageChange={handlePageChange}
                      totalItems={totalCurrentMembers}
                      itemsPerPage={itemsPerPage}
                    />
                  </section>
                ),
              },
              {
                key: "pills-contact3",
                label: "Former Members",
                content: (
                  <section className="pt30 pb30">
                    {/* For former - show similar top filter row if you want */}
                    <div className="row mb-3 align-items-center">
                      <div className="col-md-6">
                        <div className="bg-light p-3 rounded">
                          <div className="d-flex gap-2 align-items-center flex-wrap">
                            <label className="me-2 mb-0">KLA</label>
                            <select className="form-select w-auto" value={selectedKla} onChange={(e) => setSelectedKla(Number(e.target.value))}>
                              {klaList.length === 0 && <option value={14}>14th KLA</option>}
                              {klaList.map((kla) => (
                                <option key={kla.id} value={kla.id}>
                                  {kla.languages?.[0]?.name || `KLA ${kla.id}`}
                                </option>
                              ))}
                            </select>

                            <label className="ms-3 me-2 mb-0">LEGISLATIVE ASSEMBLY</label>
                            <select className="form-select w-auto" value={assemblySelection} onChange={(e) => setAssemblySelection(e.target.value)}>
                              <option value="former">Former Members</option>
                              <option value="sitting">Sitting Members</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="bg-white p-3 rounded">
                          <SearchForm
                            searchType={searchType}
                            setSearchType={setSearchType}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            onSearch={handleSearch}
                          />
                        </div>
                      </div>
                    </div>

                    <FilterControls onFilterClick={toggleFilter} />
                    <AlphabetFilter onLetterClick={handleLetterClick} activeLetter={activeLetter} />

                    <div className="pt30">
                      <h4 className="title mb20">Former Members of Parliament</h4>
                      <div className="member-grid memberList">
                        {pagedFormerMembers.map((m, idx) => (
                          <div
                            className="member-card job-list-style1 bdr1 text-center"
                            key={idx}
                            onClick={() =>
                              window.open(`pdfs/former-members/${m.name.toLowerCase().replace(/ /g, "-")}.pdf`, "_blank", "noopener,noreferrer")
                            }
                            style={{ cursor: "pointer" }}
                          >
                            <div className="icon d-flex align-items-center mb20">
                              <img className="mx-auto" src={m.img} alt={m.name} style={{ width: 130, height: 180, objectFit: "cover" }} />
                            </div>
                            <div className="details">
                              <h5 className="mb10 member-name">{m.name}</h5>
                              <h6 className="member-constituency">{m.tenure}</h6>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Pagination
                        currentPage={formerMembersPage}
                        totalPages={totalFormerPages}
                        onPageChange={handlePageChange}
                        totalItems={totalFormerMembers}
                        itemsPerPage={itemsPerPage}
                      />
                    </div>
                  </section>
                ),
              },
            ]}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>
      </section>

      {/* Left sliding filter component (your existing Filter component) */}
      {isFilterOpen && (
        <FilterComponent isOpen={isFilterOpen} filters={filters} onClose={() => setIsFilterOpen(false)} onSubmit={handleFilterSubmit} />
      )}
    </div>
  );
};

export default MemberList;

