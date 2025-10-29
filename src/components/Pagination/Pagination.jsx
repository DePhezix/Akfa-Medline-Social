import { useState, useEffect } from "react";
import "./Pagination.scss";
import DownArrow from "/Akfa-Medline-Social/svgs/downArrow.svg";

function Pagination({ children, itemsPerPage = 5, className = "" }) {
  const [currentPage, setCurrentPage] = useState(1);

  const childArray = Array.isArray(children) ? children : [children];
  const totalPages = Math.max(1, Math.ceil(childArray.length / itemsPerPage));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = childArray.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [children]);

  return (
    <div className="PaginationContainer">
      <div className={`paginated-content ${className}`}>{currentItems}</div>

      <div className="pagination-controls">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="arrowContainer"
        >
          <img src={DownArrow} alt="back arrow" className="arrow arrow--back" />
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="arrowContainer"
        >
          <img src={DownArrow} alt="next arrow" className="arrow arrow--next" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
