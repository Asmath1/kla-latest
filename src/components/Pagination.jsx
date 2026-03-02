import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
//   totalItems, 
//   itemsPerPage = 12 
}) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // If total pages is less than max to show, display all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate start and end of middle pages
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're near the beginning
      if (currentPage <= 3) {
        end = 4;
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }

      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push("...");
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  // Calculate the range of items being displayed
//   const getItemRange = () => {
//     const startItem = Math.min(1 + (currentPage - 1) * itemsPerPage, totalItems);
//     const endItem = Math.min(currentPage * itemsPerPage, totalItems);
//     return { startItem, endItem };
//   };

//   const { startItem, endItem } = getItemRange();

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
            <FontAwesomeIcon icon={faAngleLeft} color="#222222" />
          </a>
        </li>

        {getPageNumbers().map((page, index) => (
          <li
            key={index}
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
                {page}{" "}
                {page === currentPage && (
                  <span className="sr-only">(current)</span>
                )}
              </a>
            )}
          </li>
        ))}

        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
          >
            <FontAwesomeIcon icon={faAngleRight} color="#222222" />
          </a>
        </li>
      </ul>
      {/* <p className="mt10 mb-0 pagination_page_count text-center">
        {startItem} – {endItem} of {totalItems}
      </p> */}
    </div>
  );
};

export default Pagination;
