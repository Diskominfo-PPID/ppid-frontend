"use client";

import { useState } from "react";
import { useRoleAccess } from "@/lib/useRoleAccess";
import { ROLES } from "@/lib/roleUtils";
import RoleGuard from "@/components/auth/RoleGuard";

interface Keberatan {
  id: number;
  nama: string;
  email: string;
  permohonan_asal: string;
  alasan_keberatan: string;
  status: string;
  tahap: string;
  tanggal: string;
}

export default function AdminKeberatanPage() {
  const { userRole } = useRoleAccess();
  const [keberatan, setKeberatan] = useState<Keberatan[]>([
    {
      id: 1,
      nama: "Ahmad Rizki",
      email: "ahmad@email.com",
      permohonan_asal: "REQ001",
      alasan_keberatan: "Informasi yang diberikan tidak lengkap",
      status: "Diproses",
      tahap: "PPID Utama",
      tanggal: "2024-01-15"
    },
    {
      id: 2,
      nama: "Siti Nurhaliza",
      email: "siti@email.com",
      permohonan_asal: "REQ002",
      alasan_keberatan: "Permintaan informasi ditolak tanpa alasan jelas",
      status: "Diteruskan",
      tahap: "PPID Pelaksana",
      tanggal: "2024-01-14"
    }
  ]);

  const updateStatus = (id: number, newStatus: string, newTahap: string) => {
    const currentKeberatan = keberatan.find(k => k.id === id);
    if (!currentKeberatan) return;
    
    // Workflow: PPID Utama -> PPID Pelaksana -> Selesai
    if (currentKeberatan.tahap === 'PPID Utama' && newStatus === 'Diteruskan') {
      alert(`Keberatan ${id} diterima PPID Utama dan diteruskan ke PPID Pelaksana`);
    } else if (currentKeberatan.tahap === 'PPID Pelaksana') {
      if (newStatus === 'Selesai') {
        alert(`Keberatan ${id} diselesaikan oleh PPID Pelaksana`);
      } else if (newStatus === 'Ditolak') {
        alert(`Keberatan ${id} ditolak oleh PPID Pelaksana`);
      }
    }
    
    setKeberatan(prev => prev.map(item => 
      item.id === id ? { ...item, status: newStatus, tahap: newTahap } : item
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Diproses': return 'bg-blue-100 text-blue-800';
      case 'Diteruskan': return 'bg-yellow-100 text-yellow-800';
      case 'Selesai': return 'bg-green-100 text-green-800';
      case 'Ditolak': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTahapColor = (tahap: string) => {
    switch (tahap) {
      case 'PPID Utama': return 'bg-purple-100 text-purple-800';
      case 'PPID Pelaksana': return 'bg-orange-100 text-orange-800';
      case 'Selesai': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Kelola Keberatan</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Permohonan Asal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alasan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tahap</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {keberatan.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.nama}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.permohonan_asal}</td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{item.alasan_keberatan}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTahapColor(item.tahap)}`}>
                    {item.tahap}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.tanggal}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                  {item.status === 'Diproses' && item.tahap === 'PPID Utama' && (
                    <button 
                      onClick={() => updateStatus(item.id, 'Diteruskan', 'PPID Pelaksana')}
                      className="text-blue-600 hover:text-blue-900 text-xs"
                    >
                      Teruskan
                    </button>
                  )}
                  {item.status === 'Diteruskan' && item.tahap === 'PPID Pelaksana' && (
                    <>
                      <button 
                        onClick={() => updateStatus(item.id, 'Selesai', 'Selesai')}
                        className="text-green-600 hover:text-green-900 text-xs"
                      >
                        Selesai
                      </button>
                      <button 
                        onClick={() => updateStatus(item.id, 'Ditolak', 'Selesai')}
                        className="text-red-600 hover:text-red-900 text-xs"
                      >
                        Tolak
                      </button>
                    </>
                  )}
                  <RoleGuard requiredRoles={[ROLES.ADMIN]} showAccessDenied={false}>
                    <button className="text-red-600 hover:text-red-900 text-xs">
                      Hapus
                    </button>
                  </RoleGuard>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}