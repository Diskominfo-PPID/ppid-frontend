"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { LogIn, UserPlus } from "lucide-react";

export default function PermohonanPage() {
  const { token } = useAuth();

  if (!token) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Permohonan Informasi</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Login Diperlukan</h2>
          <p className="text-gray-600 mb-8">
            Untuk mengajukan permohonan informasi publik, Anda harus login terlebih dahulu sebagai pemohon.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Link href="/login">
              <button className="flex items-center px-6 py-3 bg-blue-800 hover:bg-blue-700 text-white font-semibold rounded-lg">
                <LogIn className="mr-2 w-5 h-5" />
                Login
              </button>
            </Link>
            
            <Link href="/register">
              <button className="flex items-center px-6 py-3 border border-blue-800 text-blue-800 hover:bg-blue-50 font-semibold rounded-lg">
                <UserPlus className="mr-2 w-5 h-5" />
                Daftar Akun
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Permohonan Informasi</h1>
      
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-6">Ajukan Permohonan Informasi Publik</h2>
        
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Informasi yang Diminta</label>
            <textarea rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"></textarea>
          </div>
          
          <button type="submit" className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg">
            Kirim Permohonan
          </button>
        </form>
      </div>
    </div>
  );
}