"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api";

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem("auth_token");
    if (savedToken) {
      setToken(savedToken);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    const newToken = data.token;
    const userRole = data.role || data.user?.role;
    
    setToken(newToken);
    localStorage.setItem("auth_token", newToken);
    localStorage.setItem("user_role", userRole);
    
    // Redirect based on role
    if (userRole === "Admin" || userRole === "PPID" || userRole === "Atasan_PPID") {
      router.push("/admin/dashboard");
    } else if (userRole === "Pemohon") {
      router.push("/pemohon/dashboard");
    } else {
      router.push("/dashboard");
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_role");
    router.push("/login");
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};