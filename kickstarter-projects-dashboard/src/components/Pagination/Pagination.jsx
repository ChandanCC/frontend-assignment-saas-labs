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
      <span className="pagination-info" role="contentinfo" aria-live="polite">
        {`Page ${currentPage} of ${totalPages}`}
      </span>
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
