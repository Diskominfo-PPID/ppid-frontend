"use client";

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    const userRole = localStorage.getItem("user_role");
    
    if (userRole === "Admin" || userRole === "PPID" || userRole === "Atasan_PPID") {
      router.push("/admin/dashboard");
    } else if (userRole === "Pemohon") {
      router.push("/pemohon/dashboard");
    }
  }, [token, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-lg">Redirecting...</div>
    </div>
  );
}
