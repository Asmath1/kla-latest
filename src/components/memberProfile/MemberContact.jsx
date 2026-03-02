import { useState, useEffect } from "react";
import HomeTest from "../Header";
import { CategoriesNav, BreadcrumbNav, SectionTitle, Pagination } from "../common";
import { fetchMemberContact } from "../../api/services/all.service";

const MemberContact = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [memberContactData, setMemberContactData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    memberName: "",
    constituency: "All",
    partyWise: "All",
    orderBy: "Members",
    alphabetFilter: "",
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadMemberContact = async () => {
      setLoading(true);
      try {
        const data = await fetchMemberContact(currentPage);
        console.log("Fetched member contact data:", data);
        
        if (data && Array.isArray(data.data)) {
          setMemberContactData(data.data);
          setTotalPages(data.last_page || 1);
          setTotalRecords(data.total || 0);
        } else {
          console.error("Data is not in expected format:", data);
          setMemberContactData([]);
          setTotalPages(1);
          setTotalRecords(0);
        }
      } catch (error) {
        console.error("Error loading member contact:", error);
        setMemberContactData([]);
        setTotalPages(1);
        setTotalRecords(0);
      } finally {
        setLoading(false);
      }
    };

    loadMemberContact();
  }, [currentPage]);

  // Get member name from langs array (English version)
  const getMemberName = (member) => {
    const englishLang = member.member?.langs?.find(lang => lang.language_id === 2);
    return englishLang?.name || member.member?.langs?.[0]?.name || "";
  };

  // Get permanent address from langs array (English version)
  const getPermanentAddress = (contact) => {
    const englishLang = contact.langs?.find(lang => lang.language_id === 2);
    return englishLang?.permanent_address || contact.langs?.[0]?.permanent_address || "";
  };

  // Filter data based on filters (client-side filtering on current page data)
  const filteredData = memberContactData.filter((contact) => {
    const memberName = getMemberName(contact);
    const matchesName = memberName.toLowerCase().includes(filters.memberName.toLowerCase());
    const matchesAlphabet = !filters.alphabetFilter || memberName.toUpperCase().startsWith(filters.alphabetFilter);
    
    return matchesName && matchesAlphabet;
  });

  // Sort data based on orderBy
  const sortedData = [...filteredData].sort((a, b) => {
    if (filters.orderBy === "Members") {
      return getMemberName(a).localeCompare(getMemberName(b));
    }
    return 0; // Constituency sorting would need additional data
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleAlphabetClick = (letter) => {
    setFilters({ ...filters, alphabetFilter: letter });
  };

  const handleExport = () => {
    console.log("Export data:", sortedData);
    alert("Export functionality to be implemented");
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
            { name: "Members", href: "/memberlist" },
            { name: "Member Contact", href: "/member-contact" },
          ]}
        />

        <section className="Bussiness-schedule quest pt20 pb30 pb30-md represent">
          <div className="container">
            <SectionTitle title="Member Contact" />

            <div className="bill-content col-md-12 mt30 committeeDt">
              {/* Filter Section */}
              <div className="filter-section mb-4 p-4" style={{ backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
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
                  {/* <div className="col-md-6">
                    <label className="form-label fw-bold">Constituency</label>
                    <select
                      className="form-select"
                      value={filters.constituency}
                      onChange={(e) => handleFilterChange("constituency", e.target.value)}
                    >
                      <option value="All">All</option>
                      <option value="Vallikunnu">Vallikunnu</option>
                      <option value="Kunnamkulam">Kunnamkulam</option>
                      <option value="KozhikodeSouth">Kozhikode South</option>
                      <option value="Manjeshwar">Manjeshwar</option>
                      <option value="Elathur">Elathur</option>
                    </select>
                  </div> */}
                  {/* <div className="col-md-6">
                    <label className="form-label fw-bold">Party Wise</label>
                    <select
                      className="form-select"
                      value={filters.partyWise}
                      onChange={(e) => handleFilterChange("partyWise", e.target.value)}
                    >
                      <option value="All">All</option>
                      <option value="CPM">CPM</option>
                      <option value="INC">INC</option>
                      <option value="BJP">BJP</option>
                      <option value="IUML">IUML</option>
                      <option value="KC(M)">KC(M)</option>
                      <option value="NCP">NCP</option>
                    </select>
                  </div> */}
                  {/* <div className="col-md-6">
                    <label className="form-label fw-bold">Order By</label>
                    <div className="d-flex gap-3 mt-2">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="orderBy"
                          id="orderMembers"
                          checked={filters.orderBy === "Members"}
                          onChange={() => handleFilterChange("orderBy", "Members")}
                        />
                        <label className="form-check-label" htmlFor="orderMembers">
                          Members
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="orderBy"
                          id="orderConstituency"
                          checked={filters.orderBy === "Constituency"}
                          onChange={() => handleFilterChange("orderBy", "Constituency")}
                        />
                        <label className="form-check-label" htmlFor="orderConstituency">
                          Constituency
                        </label>
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="col-12 text-end">
                    <button className="btn btn-secondary me-2" onClick={handleReset}>
                      Reset
                    </button>
                    <button className="btn btn-primary">Submit</button>
                  </div> */}
                </div>
              </div>

              {/* Alphabet Filter */}
              <div className="mb-4">
                <AlphabetFilter
                  onLetterClick={handleAlphabetClick}
                  activeLetter={filters.alphabetFilter}
                />
              </div>

              {/* Total Records and Export */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <strong>Total Records: {totalRecords}</strong>
                </div>
                <div>
                  <select className="form-select" onChange={handleExport}>
                    <option value="">Export</option>
                    <option value="csv">Export to CSV</option>
                    <option value="excel">Export to Excel</option>
                    <option value="pdf">Export to PDF</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <>
                  {/* Table */}
                  <div className="table-responsive">
                    <table className="table myTable2">
                      <thead>
                        <tr>
                          <th scope="col">Sl. No</th>
                          <th scope="col">Name of member (Constituency)</th>
                          <th scope="col">Permanent Address</th>
                          <th scope="col">Telephone Mobile</th>
                          <th scope="col">E-mail</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedData.length > 0 ? (
                          sortedData.map((contact, index) => {
                            const memberName = getMemberName(contact);
                            const permanentAddress = getPermanentAddress(contact);
                            
                            return (
                              <tr key={contact.id}>
                                <td className="text-th">{contact.order || index + 1}</td>
                                <td className="text-th">
                                  <strong>{memberName}</strong>
                                </td>
                                <td className="text-th">{permanentAddress || "-"}</td>
                                <td className="text-th">
                                  {contact.office_telephone && (
                                    <>
                                      {contact.office_telephone}
                                      <br />
                                    </>
                                  )}
                                  {contact.mobile_nos || "-"}
                                </td>
                                <td className="text-th">
                                  {contact.email_ids ? (
                                    <a href={`mailto:${contact.email_ids}`}>{contact.email_ids}</a>
                                  ) : (
                                    "-"
                                  )}
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="5" className="text-center">
                              No records found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-4">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        totalItems={totalRecords}
                        itemsPerPage={15}
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
