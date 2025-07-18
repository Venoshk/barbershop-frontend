import type { UserPayload } from "./UserPayload";

export interface AuthContextData {
  user: UserPayload | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
}