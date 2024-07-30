export interface User {
  name: { title: string; first: string; last: string };
  login: { username: string };
  picture: { thumbnail: string };
}

export interface UsersState {
  users: User[];
  allUsers: Record<number, User[]>;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentPage: number;
  totalPages: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
}
