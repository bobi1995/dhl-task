import React from "react";
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../redux/actions/pageActions";

function Paginator({ totalItems, itemsPerPage }) {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.page.currentPage);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (_, newPage) => {
    dispatch(setPage(newPage));
  };

  return (
    <div>
      <Pagination
        count={totalPages}
        page={parseInt(currentPage)}
        onChange={handlePageChange}
      />
    </div>
  );
}

export default Paginator;
