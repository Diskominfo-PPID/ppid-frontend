"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Perlu install: npm install jwt-decode

export default function PemohonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!token) {
        router.push("/login");
        return;
      }

      // Cek role dari token
      try {
        const decoded: { role: string } = jwtDecode(token);
        if (decoded.role !== "Pemohon") {
          // Jika bukan pemohon, logout dan redirect
          logout();
          router.push("/login?error=unauthorized");
        }
      } catch (error) {
        logout();
        router.push("/login?error=invalid_token");
      }
    }
  }, [token, loading, router, logout]);

  if (loading || !token) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  // Jika token valid dan role adalah Pemohon, tampilkan halaman
  return <main className="p-8">{children}</main>;
}
