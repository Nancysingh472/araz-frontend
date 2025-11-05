import { useState } from 'react';

const usePagination = (initialLimit = 10) => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(initialLimit);

  const handlePageChange = (newPage, totalPages) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(0); // Reset page when limit changes
  };

  return {
    page,
    limit,
    handlePageChange,
    handleLimitChange,
  };
};

export default usePagination;
