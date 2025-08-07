"use client";

import { useState } from "react";

interface Informasi {
  id: number;
  judul: string;
  kategori: string;
  status: string;
  tanggal: string;
}

export default function AdminInformasiPage() {
  const [informasi] = useState<Informasi[]>([
    {
      id: 1,
      judul: "Laporan Keuangan 2023",
      kategori: "Berkala",
      status: "Aktif",
      tanggal: "2024-01-15"
    },
    {
      id: 2,
      judul: "Struktur Organisasi",
      kategori: "Setiap Saat",
      status: "Aktif",
      tanggal: "2024-01-10"
    }
  ]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Kelola Informasi</h1>
        <button className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
          Tambah Informasi
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Judul</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kategori</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {informasi.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{item.judul}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.kategori}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.tanggal}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}