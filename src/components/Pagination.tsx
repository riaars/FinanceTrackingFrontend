import React from "react";
import { MdChevronLeft } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";

interface PaginationProps {
  currentPage: number;
  totalItemsPerPage: number;
  totalItems: number;
  handleChange: (pageNumber: number) => void;
}
const Pagination = ({
  currentPage,
  totalItemsPerPage,
  totalItems,
  handleChange,
}: PaginationProps) => {
  const totalPage = Math.floor(totalItems / totalItemsPerPage + 1);

  let pageList = [];
  for (let i = 1; i <= totalPage; i++) {
    pageList.push(i);
  }

  const renderPageNumber = () => {
    return pageList.map((item, index) => (
      <div
        className={`pagination__item ${
          currentPage === item ? "active" : "inactive"
        }`}
        key={index}
        onClick={() => handleChange(item)}
      >
        {item}
      </div>
    ));
  };

  return (
    <div className="pagination">
      <MdChevronLeft
        className="pagination__arrow"
        onClick={() => {
          if (currentPage > 1) handleChange(currentPage - 1);
        }}
      />
      <div className="pagination__wrapper">{renderPageNumber()}</div>
      <MdChevronRight
        className="pagination__arrow"
        onClick={() => {
          if (currentPage < totalPage) handleChange(currentPage + 1);
        }}
      />
    </div>
  );
};

export default Pagination;
