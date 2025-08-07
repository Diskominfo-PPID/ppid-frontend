// src/app/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nama: "",
    nik: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const data = await registerUser(formData);
      setSuccess(
        data.message ||
          "Registrasi berhasil! Anda akan dialihkan ke halaman login."
      );
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.error || "Terjadi kesalahan saat registrasi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-light-bg">
      <div className="p-8 space-y-6 w-full max-w-lg bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-dark-text">
          Daftar Akun Pemohon
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-sm text-center text-red-500">{error}</p>}
          {success && (
            <p className="text-sm text-center text-green-500">{success}</p>
          )}

          {/* Input untuk nama, nik, email, password */}
          <div>
            <label
              htmlFor="nama"
              className="block text-sm font-medium text-gray-700"
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              name="nama"
              onChange={handleChange}
              required
              disabled={isLoading}
              className="px-3 py-2 mt-1 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label
              htmlFor="nik"
              className="block text-sm font-medium text-gray-700"
            >
              NIK
            </label>
            <input
              type="text"
              name="nik"
              onChange={handleChange}
              required
              disabled={isLoading}
              className="px-3 py-2 mt-1 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
              disabled={isLoading}
              className="px-3 py-2 mt-1 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
              disabled={isLoading}
              className="px-3 py-2 mt-1 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-secondary text-white font-semibold py-2.5 px-4 rounded-lg transition-colors disabled:bg-blue-300"
          >
            {isLoading ? "Mendaftar..." : "Daftar"}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
