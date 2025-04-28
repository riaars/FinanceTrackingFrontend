import React from "react";
import { MdChevronLeft } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";

interface PaginationProps {
  currentPage: number;
  totalItemsPerPage: number;
  totalItems: number;
  handleChange: (pageNumber: number | string) => void;
}
const Pagination = ({
  currentPage,
  totalItemsPerPage,
  totalItems,
  handleChange,
}: PaginationProps) => {
  const totalPage = Math.ceil(totalItems / totalItemsPerPage);

  let pageList = [];

  if (totalPage <= 5) {
    for (let i = 1; i <= totalPage; i++) {
      pageList.push(i);
    }
  } else {
    pageList.push(1);

    if (currentPage > 3) {
      pageList.push("...");
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPage - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pageList.push(i);
    }

    if (currentPage < totalPage - 2) {
      pageList.push("...");
    }

    pageList.push(totalPage);
  }

  const renderPageNumber = () => {
    return pageList.map((item, index) =>
      item === "..." ? (
        <div className="pagination__item">{item}</div>
      ) : (
        <div
          className={`pagination__item ${
            currentPage === item ? "active" : "inactive"
          }`}
          key={index}
          onClick={() => handleChange(item)}
        >
          {item}
        </div>
      )
    );
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
