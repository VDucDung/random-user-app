import axios from "axios";
import { User } from "../types/user";

export const fetchUsersFromApi = async (
  page: number,
  sortBy: string,
  sortOrder: "asc" | "desc",
) => {
  const response = await axios.get(
    `https://randomuser.me/api/?page=${page}&results=10`,
  );
  const users = response.data.results;

  users.sort((a: User, b: User) => {
    const aValue = sortBy.split(".").reduce((o: any, i: string) => o[i], a);
    const bValue = sortBy.split(".").reduce((o: any, i: string) => o[i], b);

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      return 0;
    }
  });

  const totalResults = 100;
  const totalPages = Math.ceil(totalResults / 10);

  return {
    users,
    totalPages,
  };
};
