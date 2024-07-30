import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsersFromApi } from "../../services/userService";
import { UsersState } from "../../types/user";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (page: number, { getState }) => {
    const state = getState() as { users: UsersState };
    const sortBy = state.users.sortBy;
    const sortOrder = state.users.sortOrder;

    if (state.users.allUsers[page]) {
      return {
        users: state.users.allUsers[page],
        totalPages: state.users.totalPages,
        page,
      };
    }

    const { users, totalPages } = await fetchUsersFromApi(
      page,
      sortBy,
      sortOrder,
    );
    return {
      users,
      totalPages,
      page,
    };
  },
);
