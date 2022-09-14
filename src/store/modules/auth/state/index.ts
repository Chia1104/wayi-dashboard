import type { User } from "@wanin/shared/types";

export type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  isError: boolean;
  error: string;
  user: User | null;
};

export const authInitState = {
  isAuthenticated: false,
  isLoading: false,
  isError: false,
  error: "",
  user: null,
} as AuthState;
