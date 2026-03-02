import { useEffect, useMemo, useState } from "react";
import {
  BreadcrumbNav,
  CategoriesNav,
  SectionTitle,
} from "./common";
import HomeTest from "./Header";
import { fetchTenders } from "../api/services/all.service";
import "./Tender.css";

const Tender = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadTenders = async () => {
      setLoading(true);
      try {
        const data = await fetchTenders();
        console.log("Fetched tenders data:", data);
        console.log("Data length:", data?.length);
        
        if (Array.isArray(data)) {
          setTenders(data);
        } else {
          console.error("Data is not an array:", data);
          setTenders([]);
        }
      } catch (error) {
        console.error("Error loading tenders:", error);
        setTenders([]);
      } finally {
        setLoading(false);
      }
    };

    loadTenders();
  }, []);

  // Pagination setup
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(tenders.length / itemsPerPage);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return tenders.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, tenders]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 3;
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      for (let i = 1; i <= showPages; i++) {
        pages.push(i);
      }
      
      if (currentPage > showPages + 1) {
        pages.push('...');
      }
      
      if (currentPage > showPages && currentPage < totalPages - showPages + 1) {
        if (currentPage - 1 > showPages) {
          pages.push(currentPage - 1);
        }
        pages.push(currentPage);
        if (currentPage + 1 < totalPages - showPages + 1) {
          pages.push(currentPage + 1);
        }
      }
      
      if (currentPage < totalPages - showPages) {
        pages.push('...');
      }
      
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
      <div className="wrapper">
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
              { name: "Tender", href: "/tender" },
            ]}
          />

          <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
            <div className="container">
              <SectionTitle title="Tender" />
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

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
            { name: "Tender", href: "/tender" },
          ]}
        />

        {/* Main Content */}
        <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
          <div className="container">
            <SectionTitle title="Tender" />

            <div className="resolutionz c-ptag">
              <div className="tabley">
                <div className="table-responsive">
                  <table className="table table myTable2">
                    <thead>
                      <tr>
                        <th scope="col">Sl. No.</th>
                        <th scope="col">Tender/Quotation/Auction</th>
                        <th scope="col">Last Date of Receipt of Tender/Quotation/Auction</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.length > 0 ? (
                        currentData.map((item, index) => (
                          <tr key={item.id}>
                            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                            <td>
                              <a 
                                href={item.local_pdf_url || item.pdf_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="tender-link"
                                style={{ color: "var(--clr--primary)", textDecoration: "none" }}
                              >
                                {item.title}
                              </a>
                            </td>
                            <td>{item.last_date}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-center py-4">
                            No tenders found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
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
                    {Math.min(currentPage * itemsPerPage, tenders.length)} of{" "}
                    {tenders.length}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Tender;
