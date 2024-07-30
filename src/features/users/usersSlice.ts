import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers } from "./userThunks";
import { User, UsersState } from "../../types/user";

const initialState: UsersState = {
  users: [],
  allUsers: {},
  status: "idle",
  error: null,
  currentPage: 1,
  totalPages: 10,
  sortBy: "login.username",
  sortOrder: "asc",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSort(
      state,
      action: PayloadAction<{ sortBy: string; sortOrder: "asc" | "desc" }>,
    ) {
      const { sortBy, sortOrder } = action.payload;
      state.sortBy = sortBy;
      state.sortOrder = sortOrder;

      state.users = [...state.users].sort((a: User, b: User) => {
        let aValue, bValue;

        if (sortBy === "name.first") {
          aValue = a.name.last;
          bValue = b.name.last;
        } else {
          aValue = sortBy.split(".").reduce((o: any, i: string) => o[i], a);
          bValue = sortBy.split(".").reduce((o: any, i: string) => o[i], b);
        }

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortOrder === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else {
          return 0;
        }
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { users, totalPages, page } = action.payload;

        state.users = [...users];
        state.totalPages = totalPages;
        state.currentPage = page;
        state.allUsers[page] = [...users];

        state.users.sort((a: User, b: User) => {
          let aValue, bValue;

          if (state.sortBy === "name.first") {
            aValue = a.name.last;
            bValue = b.name.last;
          } else {
            aValue = state.sortBy
              .split(".")
              .reduce((o: any, i: string) => o[i], a);
            bValue = state.sortBy
              .split(".")
              .reduce((o: any, i: string) => o[i], b);
          }

          if (typeof aValue === "string" && typeof bValue === "string") {
            return state.sortOrder === "asc"
              ? aValue.localeCompare(bValue)
              : bValue.localeCompare(aValue);
          } else {
            return 0;
          }
        });
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const { setPage, setSort } = usersSlice.actions;

export default usersSlice.reducer;
