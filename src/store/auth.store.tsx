import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  userId: string;
  email: string;
  fullname: string;
  role: "admin" | "worker" | "rider" | "user";
};

type AuthPayload = {
  user: User;
  accessToken: string;
};

type AuthState = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  setAuth: (payload: AuthPayload) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,

      setAuth: ({ user, accessToken }) => {
        set({
          user,
          accessToken,
          isAuthenticated: true,
        });
        console.log("user:", user);
      },

      logout: () =>
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
