"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { isAdminRole, isPemohon } from "@/lib/roleUtils";

export default function DashboardPage() {
  const { token, loading, getUserRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!token) {
        router.replace("/login");
        return;
      }

      const userRole = getUserRole();
      
      // Redirect berdasarkan role
      if (isAdminRole(userRole)) {
        router.replace("/admin/dashboard");
      } else if (isPemohon(userRole)) {
        router.replace("/pemohon/dashboard");
      } else {
        // Role tidak dikenali, logout
        localStorage.clear();
        router.replace("/login");
      }
    }
  }, [token, loading, router, getUserRole]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-lg">Loading...</div>
    </div>
  );
}
