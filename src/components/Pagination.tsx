import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { setPage } from "../features/users/usersSlice";
import { fetchUsers } from "../features/users/userThunks";

const Pagination: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentPage = useSelector(
    (state: RootState) => state.users.currentPage,
  );
  const totalPages = useSelector((state: RootState) => state.users.totalPages);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(setPage(newPage));
      dispatch(fetchUsers(newPage));
    }
  };

  const createPageList = () => {
    const pageList = [];
    const range = 2;

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageList.push(i);
      }
    } else {
      if (currentPage <= range + 1) {
        for (let i = 1; i <= range + 3; i++) {
          pageList.push(i);
        }
        pageList.push("...");
        pageList.push(totalPages);
      } else if (currentPage >= totalPages - range) {
        pageList.push(1);
        pageList.push("...");
        for (let i = totalPages - range - 2; i <= totalPages; i++) {
          pageList.push(i);
        }
      } else {
        pageList.push(1);
        pageList.push("...");
        for (let i = currentPage - range; i <= currentPage + range; i++) {
          pageList.push(i);
        }
        pageList.push("...");
        pageList.push(totalPages);
      }
    }

    return pageList;
  };

  const pageList = createPageList();

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="mx-1 px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
      >
        &lt; Previous
      </button>

      {pageList.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && handlePageChange(page)}
          className={`mx-1 px-3 py-1 rounded ${
            typeof page === "number" && currentPage === page
              ? "bg-blue-500 text-white"
              : "bg-gray-300"
          }`}
          disabled={typeof page === "string"}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="mx-1 px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
      >
        Next &gt;
      </button>
    </div>
  );
};

export default Pagination;
