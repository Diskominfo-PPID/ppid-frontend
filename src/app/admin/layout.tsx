// src/app/admin/layout.tsx
"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Jika loading selesai dan tidak ada token, redirect ke halaman login
    if (!loading && !token) {
      router.push("/login");
    }
  }, [token, loading, router]);

  // Tampilkan loading screen atau null selagi memeriksa token
  if (loading || !token) {
    return <div>Loading...</div>; // atau komponen skeleton/spinner
  }

  // Jika token ada, tampilkan layout admin
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
