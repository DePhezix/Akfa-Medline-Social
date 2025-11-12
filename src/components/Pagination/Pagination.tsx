import { Children, useState, ReactNode } from "react";
import "./Pagination.scss";
import DownArrow from "/svgs/downArrow.svg";

type Props = {
  children: ReactNode,
  itemsPerPage: number,
  className: string,
  paginationFor: string,
}

type PaginationType = Record<string, number>

function Pagination({ children, itemsPerPage = 5, className = "", paginationFor = 'none' }: Props) {
  const [paginationRecords, setPaginationRecords] = useState<PaginationType>({})

  const currentPage = paginationRecords[paginationFor]  || 1
  
const childArray = Children.toArray(children);
  const totalPages: number = Math.max(1, Math.ceil(childArray.length / itemsPerPage));

  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const currentItems: ReactNode[] = childArray.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    setPaginationRecords((prev) => ({
      ...prev,
      [paginationFor]: page,
    }));
  };

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
