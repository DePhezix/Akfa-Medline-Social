import { Children, useState, ReactNode } from "react";
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
    <div className="flex flex-col items-center gap-[24px] w-fiull">
      <div className={`w-full ${className}`}>{currentItems}</div>

      <div
        className="flex items-center justify-center gap-[16px] text-[1rem]  select-none"
      >
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-[35px] h-[35px] flex items-center justify-center bg-red border-0 rounded-[8px] cursor-pointer hover:not-disabled:bg-[#c30629] active:not-disabled:translate-y-[0] disabled:opacity-40 disabled:cursor-default disabled:transform-none"
        >
          <img src={DownArrow} alt="back arrow" className="w-[18px] h-[18px] invert transition-transform duration-200 ease-linear rotate-90" />
        </button>
        <span className="font-[500] text-[#333] m-w-[60px] text-center">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-[35px] h-[35px] flex items-center justify-center bg-red border-0 rounded-[8px] cursor-pointer hover:not-disabled:bg-[#c30629] active:not-disabled:translate-y-[0] disabled:opacity-40 disabled:cursor-default disabled:transform-none"
        >
          <img src={DownArrow} alt="next arrow" className="w-[18px] h-[18px] invert transition-transform duration-200 ease-linear -rotate-90" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
