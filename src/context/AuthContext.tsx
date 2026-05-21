"use client";
import { useUser } from "@/hook/useUser";
import { postApi } from "@/lib/apiHandler";
import { TUser } from "@/types/auth";
import { useQueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { createContext, useCallback, useState } from "react";


interface AuthContextType {
  user: TUser | null | undefined;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface ContextChildren {
  children: ReactNode;
}

export const AuthProvider = ({ children }: ContextChildren) => {
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useUser();
  const [loading, setLoading] = useState(true);
  const logout = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await postApi("/logout");
      }
      localStorage.removeItem("token");
      document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
    } catch (error) {
    } finally {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  }, []);

  const info: AuthContextType = {
    user,
    loading,
    setLoading,
    logout,
  };

  return <AuthContext.Provider value={info}>{
    isLoading ? null : children
  }</AuthContext.Provider>;
};



export default AuthProvider;
