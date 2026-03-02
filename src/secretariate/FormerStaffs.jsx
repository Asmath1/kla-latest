import { useEffect, useMemo, useState } from "react";
import HomeTest from "../components/Header";
import { BreadcrumbNav, CategoriesNav } from "../components/common";
import { API_ENDPOINTS } from "../utils/config";
import "./FormerStaffs.css";

export default function FormerStaffs() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    fetch(API_ENDPOINTS.FORMER_STAFF)
      .then((res) => res.json())
      .then((json) => {
        if (json.status && json.data) {
          setData(json.data);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch former staff data:", err);
        setIsLoading(false);
      });
  }, []);

  // Pagination
  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, data]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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
            { name: "secretariate", href: "/secretariate" },
            {
              name: "Former Staffs",
              href: "/secretariate/former-staffs",
            },
          ]}
        />

        <section className="Bussiness-schedule quest pt20 pb-0 pb30-md represent">
          <div className="container former-staff-table-wrapper">
            <h2 className="title">Former Staffs</h2>

            {isLoading ? (
              <div className="text-center py-5">
                <p>Loading...</p>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <table className="table table myTable2">
                  <thead>
                    <tr>
                      <th scope="col">ക്രമ നമ്പർ</th>
                      <th scope="col">പേര്</th>
                      <th scope="col">വിരമിച്ച തസ്തിക</th>
                      <th scope="col">ഫോൺ</th>
                      <th scope="col">വിലാസം</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((item) => (
                      <tr key={item.id}>
                        <td>{item.serial_no}</td>
                        <td>{item.name}</td>
                        <td>{item.retired_position}</td>
                        <td>{item.phone}</td>
                        <td>{item.address}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Mobile Accordion */}
                <div className="former-staff-accordion">
                  {currentData.map((item) => (
                    <div className="fs-accordion-item" key={item.id}>
                      <button
                        className="fs-accordion-header"
                        onClick={() =>
                          setAccordionOpen(
                            accordionOpen === item.id ? null : item.id
                          )
                        }
                        aria-expanded={accordionOpen === item.id}
                      >
                        {item.name}
                        <span
                          className={`fs-accordion-arrow${
                            accordionOpen === item.id ? " open" : ""
                          }`}
                        >
                          ▶
                        </span>
                      </button>
                      {accordionOpen === item.id && (
                        <div className="fs-accordion-body">
                          <div className="fs-accordion-body-row">
                            <span className="fs-accordion-label">ക്രമ നമ്പർ:</span>{" "}
                            {item.serial_no}
                          </div>
                          <div className="fs-accordion-body-row">
                            <span className="fs-accordion-label">വിരമിച്ച തസ്തിക:</span>{" "}
                            {item.retired_position}
                          </div>
                          <div className="fs-accordion-body-row">
                            <span className="fs-accordion-label">ഫോൺ:</span> {item.phone}
                          </div>
                          <div className="fs-accordion-body-row">
                            <span className="fs-accordion-label">വിലാസം:</span>{" "}
                            {item.address}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="pagination-container text-center mt-4">
                    <ul className="paginationn justify-content-center">
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        <a href="#" className="page-link">
                          &laquo;
                        </a>
                      </li>

                      {[...Array(totalPages)].map((_, index) => (
                        <li
                          key={index}
                          className={`page-item ${
                            currentPage === index + 1 ? "active" : ""
                          }`}
                          onClick={() => handlePageChange(index + 1)}
                        >
                          <a href="#" className="page-link">
                            {index + 1}
                          </a>
                        </li>
                      ))}

                      <li
                        className={`page-item ${
                          currentPage === totalPages ? "disabled" : ""
                        }`}
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        <a href="#" className="page-link">
                          &raquo;
                        </a>
                      </li>
                    </ul>

                    <p className="pagination-info">
                      Showing {(currentPage - 1) * itemsPerPage + 1}–
                      {Math.min(currentPage * itemsPerPage, data.length)} of{" "}
                      {data.length}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
