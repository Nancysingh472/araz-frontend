import React from 'react';

const PaginationControls = ({
  page,
  totalPages,
  limit,
  handlePageChange,
  handleLimitChange,
}) => {
  return (
    <div className="pagination-controls">
      <div className="table-pagination">
        <div className="filter-select">
          <label>Show </label>
          <select
            value={limit}
            onChange={(e) => handleLimitChange(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <button
          className="btn btn-primary"
          onClick={() => handlePageChange(page - 1, totalPages)}
          disabled={page <= 0}
        >
          {/*TODO Add icons*/}
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handlePageChange(page + 1, totalPages)}
          disabled={page >= totalPages - 1}
        >
          {/*TODO Add icons*/}
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;
