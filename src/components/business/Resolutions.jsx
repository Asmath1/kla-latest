import { useEffect, useMemo, useState } from "react";
import {
  BreadcrumbNav,
  CategoriesNav,
  ExportButton,
  Filter,
  SectionTitle,
  Tabs,
} from "../common";
import HomeTest from "../Header";
import InlinePdfViewer from "../common/InlinePdfViwer";
import { fetchPvtMemberResolutions } from "../../api/services/all.service";
import "./Resolutions.css";

export const PrivateMemberResolutions = () => {
  const [, setResolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredResolutions, setFilteredResolutions] = useState([]);

  useEffect(() => {
    const loadResolutions = async () => {
      setLoading(true);
      try {
        const data = await fetchPvtMemberResolutions();
        console.log("Fetched resolutions data:", data);
        console.log("Data length:", data?.length);
        
        if (Array.isArray(data)) {
          setResolutions(data);
          setFilteredResolutions(data);
        } else {
          console.error("Data is not an array:", data);
          setResolutions([]);
          setFilteredResolutions([]);
        }
      } catch (error) {
        console.error("Error loading resolutions:", error);
        setResolutions([]);
        setFilteredResolutions([]);
      } finally {
        setLoading(false);
      }
    };

    loadResolutions();
  }, []);

  // Format date from ISO to DD.MM.YYYY
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  // ✅ Pagination setup
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredResolutions.length / itemsPerPage);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredResolutions.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredResolutions]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 3; // Number of pages to show at start and end
    
    if (totalPages <= 7) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first 3 pages
      for (let i = 1; i <= showPages; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed
      if (currentPage > showPages + 1) {
        pages.push('...');
      }
      
      // Add current page and neighbors if in middle
      if (currentPage > showPages && currentPage < totalPages - showPages + 1) {
        if (currentPage - 1 > showPages) {
          pages.push(currentPage - 1);
        }
        pages.push(currentPage);
        if (currentPage + 1 < totalPages - showPages + 1) {
          pages.push(currentPage + 1);
        }
      }
      
      // Add ellipsis if needed
      if (currentPage < totalPages - showPages) {
        pages.push('...');
      }
      
      // Always show last 3 pages
      for (let i = totalPages - showPages + 1; i <= totalPages; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
    }
    
    return pages;
  };

  if (loading) {
    return (
      <section className="container resolution-section">
        <h3 className="resolution-title mb-4 text-upperca">
          Private Member Resolutions
        </h3>
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container resolution-section">
      <h3 className="resolution-title mb-4 text-upperca">
        Private Member Resolutions
      </h3>

      <div className="resolutionz c-ptag">
        <div className="tabley">
          <div className="mydrop dropdown">
            {/* Export button placeholder for future use */}
          </div>
          <div className="table-responsive">
            <table className="table table myTable2">
              <thead>
                <tr>
                  <th scope="col">Sl. No.</th>
                  <th scope="col">Date</th>
                  <th scope="col">Name of Mover</th>
                  <th scope="col">Title / Subject Matter</th>
                </tr>
              </thead>
              <tbody>
                {currentData.length > 0 ? (
                  currentData.map((item, index) => (
                    <tr key={item.id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{formatDate(item.scheduled_date)}</td>
                      <td>{item.mover_member_id || "-"}</td>
                      <td>
                        <strong
                          className="resolution-subtitle d-block mb-2"
                          style={{ fontSize: "15px" }}
                        >
                          {item.title}
                        </strong>
                        {item.summary && (
                          <p className="mb-0" style={{ fontSize: "14px", color: "#555" }}>
                            {item.summary}
                          </p>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      No resolutions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ✅ Pagination */}
      {totalPages > 1 && (
        <div className="pagination-container text-center mt-3">
          <ul className="paginationn justify-content-center">
            <li
              className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) handlePageChange(currentPage - 1);
              }}
              style={{ cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
            >
              <a href="#" className="page-link" onClick={(e) => e.preventDefault()}>
                &laquo;
              </a>
            </li>

            {getPageNumbers().map((page, index) => (
              page === '...' ? (
                <li key={`ellipsis-${index}`} className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              ) : (
                <li
                  key={page}
                  className={`page-item ${currentPage === page ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <a href="#" className="page-link" onClick={(e) => e.preventDefault()}>
                    {page}
                  </a>
                </li>
              )
            ))}

            <li
              className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) handlePageChange(currentPage + 1);
              }}
              style={{ cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}
            >
              <a href="#" className="page-link" onClick={(e) => e.preventDefault()}>
                &raquo;
              </a>
            </li>
          </ul>
          <p className="pagination-info">
            Showing {(currentPage - 1) * itemsPerPage + 1}–
            {Math.min(currentPage * itemsPerPage, filteredResolutions.length)} of{" "}
            {filteredResolutions.length}
          </p>
        </div>
      )}
    </section>
  );
};

// ✅ Full page wrapper with tabs
const Resolutions = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const [pdfModalTitle, setPdfModalTitle] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="wrapper">
      {/* Header */}
      <header
        className={`header-nav nav-homepage-style2 stricky main-menu ${
          isScrolled ? "scrolled-nav slideInDown animated" : "slideIn animated"
        }`}
      >
        <HomeTest />
      </header>

      <div className="body_content">
        {/* Navigation */}
        <CategoriesNav />
        <BreadcrumbNav
          breadcrumbs={[
            { name: "Home", href: "/" },
            { name: "Business", href: "/business" },
            { name: "Resolutions", href: "/business/Resolutions" },
          ]}
        />

        {/* Main Content */}
        <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
          <div className="container">
            <SectionTitle title="Resolutions" />

            <Tabs
              tabs={[
                {
                  key: "Statutory Resolutions",
                  label: "Statutory Resolutions",
                  content: (
                    <div className="bill-content col-md-12 mt30 committeeDt"></div>
                  ),
                },
                {
                  key: "Government Resolutions",
                  label: "Government Resolutions",
                  content: (
                    <div className="bill-content col-md-12 mt20 committeeDt">
                      <div className="mt30 library-member-forms">
                        <a
                          href="#"
                          className="rul d-flex align-items-center mb20"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedPdfUrl("/images/state-name-kerala.pdf");
                            setPdfModalTitle("സംസ്ഥാനത്തിന്റെ നാമധേയം കേരളം എന്നാക്കുന്നത് സംബന്ധിച്ച പ്രമേയം");
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="imgx">
                            <img src="/images/file2.svg" width={16} alt="" />
                          </div>
                          <span>
                            {" "}
                            സംസ്ഥാനത്തിന്റെ നാമധേയം കേരളം എന്നാക്കുന്നത്
                            സംബന്ധിച്ച് 2024 ജൂൺ 24-ന് നിയമസഭ ഐകകണ്ഠ്യേന
                            പാസ്സാക്കിയ പ്രമേയം
                          </span>
                        </a>
                      </div>
                      <div className="mt20 library-member-forms">
                        <a
                          href="#"
                          className="rul d-flex align-items-center mb20"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedPdfUrl("/images/state-name-kerala.pdf");
                            setPdfModalTitle("സംസ്ഥാനത്തിന്റെ നാമധേയം കേരളം എന്നാക്കുന്നത് സംബന്ധിച്ച പ്രമേയം");
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="imgx">
                            <img
                              src="images/file2.svg"
                              width={16}
                              alt="PDF Icon"
                            />
                          </div>
                          <span>
                            സംസ്ഥാനത്തിന്റെ നാമധേയം കേരളം എന്നാക്കുന്നത്
                            സംബന്ധിച്ച് 2024 ജൂൺ 24-ന് നിയമസഭ ഐകകണ്ഠ്യേന
                            പാസ്സാക്കിയ പ്രമേയം
                          </span>
                        </a>
                      </div>
                    </div>
                  ),
                },
                {
                  key: "Private Resolutions",
                  label: "Private Resolutions",
                  content: (
                    <div className="bill-content col-md-12 mt30 committeeDt">
                      <Filter filterKeys={["KLA"]} />
                      <ExportButton />
                      <PrivateMemberResolutions />
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </section>

        {/* PDF Modal */}
        {selectedPdfUrl && (
          <>
            <div className="modal fade show" style={{ display: "block" }}>
              <div className="modal-dialog modal-xl">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {pdfModalTitle || "PDF Preview"}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setSelectedPdfUrl(null)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <InlinePdfViewer
                      fileUrl={selectedPdfUrl}
                      height="85vh"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal-backdrop fade show"
              onClick={() => setSelectedPdfUrl(null)}
            ></div>
          </>
        )}
      </div>
    </div>
  );
};

export default Resolutions;
