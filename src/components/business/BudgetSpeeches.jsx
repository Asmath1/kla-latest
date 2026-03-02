import { useEffect, useMemo, useState } from "react";
import {
  BreadcrumbNav,
  CategoriesNav,
  SectionTitle,
} from "../common";
import HomeTest from "../Header";
import { fetchBudgetSpeeches } from "../../api/services/all.service";
import "./BudgetSpeeches.css";

const BudgetSpeeches = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [budgetSpeeches, setBudgetSpeeches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadBudgetSpeeches = async () => {
      setLoading(true);
      try {
        const data = await fetchBudgetSpeeches();
        console.log("Fetched budget speeches data:", data);
        console.log("Data length:", data?.length);
        
        if (Array.isArray(data)) {
          setBudgetSpeeches(data);
        } else {
          console.error("Data is not an array:", data);
          setBudgetSpeeches([]);
        }
      } catch (error) {
        console.error("Error loading budget speeches:", error);
        setBudgetSpeeches([]);
      } finally {
        setLoading(false);
      }
    };

    loadBudgetSpeeches();
  }, []);

  // Pagination setup
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(budgetSpeeches.length / itemsPerPage);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return budgetSpeeches.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, budgetSpeeches]);

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
              { name: "Business", href: "/business" },
              { name: "Budget Speeches", href: "/business/budget-speeches" },
            ]}
          />

          <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
            <div className="container">
              <SectionTitle title="Budget Speeches" />
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
            { name: "Business", href: "/business" },
            { name: "Budget Speeches", href: "/business/budget-speeches" },
          ]}
        />

        {/* Main Content */}
        <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
          <div className="container">
            <SectionTitle title="Budget Speeches" />

            <div className="resolutionz c-ptag">
              <div className="tabley">
                <div className="table-responsive">
                  <table className="table table myTable2">
                    <thead>
                      <tr>
                        <th scope="col">Sl. No.</th>
                        <th scope="col">Minister</th>
                        <th scope="col">Date Of Presentation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.length > 0 ? (
                        currentData.map((item, index) => (
                          <tr key={item.id}>
                            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                            <td>{item.finance_minister}</td>
                            <td>
                              {item.date} ( 
                              {item.english_pdf_file !== "FAILED" ? (
                                <a 
                                  href={item.local_english_pdf_url || item.english_pdf_url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="speech-link"
                                >
                                  English
                                </a>
                              ) : (
                                <span style={{ color: "#999" }}>English</span>
                              )} ) ( 
                              {item.malayalam_pdf_file !== "FAILED" ? (
                                <a 
                                  href={item.malayalam_pdf_url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="speech-link"
                                >
                                  Malayalam
                                </a>
                              ) : (
                                <span style={{ color: "#999" }}>Malayalam</span>
                              )} )
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-center py-4">
                            No budget speeches found
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
                    {Math.min(currentPage * itemsPerPage, budgetSpeeches.length)} of{" "}
                    {budgetSpeeches.length}
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

export default BudgetSpeeches;
