import React from "react";
import "./Pagination.css";
import { RiArrowDropLeftLine,RiArrowDropRightLine } from "@remixicon/react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination-container" role="navigation" aria-label="Pagination">
      <button
        className="pagination-button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
        data-testid="prev-btn"
      >
        <RiArrowDropLeftLine size={32}/>
        <span className="visually-hidden">Previous</span>
      </button>
      <div className="pagination-pages">
        {currentPage > 4 && (
          <button
            className="pagination-page-button"
            onClick={() => onPageChange(1)}
            aria-label="Go to page 1"
            aria-current={currentPage === 1 ? "page" : undefined}
          >
            1
          </button>
        )}
        {currentPage > 4 && <span className="pagination-ellipsis">...</span>}
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          let shouldShow = false;
          
          if (currentPage <= 4 && pageNumber <= 5) {
            shouldShow = true;
          } else if (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2) {
            shouldShow = true;
          } else if (currentPage > totalPages - 4 && pageNumber > totalPages - 5) {
            shouldShow = true;
          }

          if (!shouldShow) return null;
          return (
            <button
              key={pageNumber}
              className={`pagination-page-button ${currentPage === pageNumber ? 'pagination-page-button-active' : ''}`}
              onClick={() => onPageChange(pageNumber)}
              aria-label={`Go to page ${pageNumber}`}
              aria-current={currentPage === pageNumber ? "page" : undefined}
            >
              {pageNumber}
            </button>
          );
        })}
        {currentPage < totalPages - 3 && <span className="pagination-ellipsis">...</span>}
        {currentPage < totalPages - 3 && totalPages > 4 && (
          <button
            className="pagination-page-button"
            onClick={() => onPageChange(totalPages)}
            aria-label={`Go to page ${totalPages}`}
            aria-current={currentPage === totalPages ? "page" : undefined}
          >
            {totalPages}
          </button>
        )}
      </div>
      <button
        className="pagination-button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
        data-testid="next-btn"
      >
        <RiArrowDropRightLine size={32}/>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Pagination;
