"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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

      // Simple token validation without jwt-decode
      try {
        // Basic token format check
        if (!token.includes('.')) {
          logout();
          router.push("/login?error=invalid_token");
        }
      } catch {
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
