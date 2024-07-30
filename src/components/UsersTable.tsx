import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSort } from "../features/users/usersSlice";
import { RootState, AppDispatch } from "../redux/store";
import Pagination from "./Pagination";
import { fetchUsers } from "../features/users/userThunks";

const UsersTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);
  const currentPage = useSelector(
    (state: RootState) => state.users.currentPage,
  );
  const status = useSelector((state: RootState) => state.users.status);
  const allUsers = useSelector((state: RootState) => state.users.allUsers);
  const sortBy = useSelector((state: RootState) => state.users.sortBy);
  const sortOrder = useSelector((state: RootState) => state.users.sortOrder);

  useEffect(() => {
    if (status === "idle" || !allUsers[currentPage]) {
      dispatch(fetchUsers(currentPage));
    }
  }, [status, dispatch, currentPage, allUsers, sortBy, sortOrder]);

  const handleSort = (field: string) => {
    const order = sortBy === field && sortOrder === "asc" ? "desc" : "asc";
    dispatch(setSort({ sortBy: field, sortOrder: order }));
    dispatch(fetchUsers(currentPage));
  };

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              <button onClick={() => handleSort("name.first")}>
                Full Name{" "}
                {sortBy === "name.first"
                  ? sortOrder === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </button>
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              <button onClick={() => handleSort("login.username")}>
                Username{" "}
                {sortBy === "login.username"
                  ? sortOrder === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </button>
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Thumbnail
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {users.map((user, index) => (
            <tr
              key={index}
              className="bg-gray-300 border border-grey-500 md:border-none block md:table-row"
            >
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                {`${user.name.title} ${user.name.first} ${user.name.last}`}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                {user.login.username}
              </td>
              <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                <img src={user.picture.thumbnail} alt="Thumbnail" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default UsersTable;
