import React, { useState } from "react";

const usePagination = (props) => {
  const [limit, setLimit] = useState(props.limit);
  const [page, setPage] = useState(props.page);

  const handleChangePage = (page) => {
    setPage(page);
  };
  const handleChangeLimit = (limit) => {
    setLimit(limit);
  };

  return {
    limit,
    page,
    handleChangePage,
    handleChangeLimit,
  };
};

export default usePagination;
