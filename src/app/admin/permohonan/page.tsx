"use client";

import { useState, useEffect } from "react";
import { useRoleAccess } from "@/lib/useRoleAccess";
import { ROLES } from "@/lib/roleUtils";
import RoleGuard from "@/components/auth/RoleGuard";
import { useRealtimeData } from "@/hooks/useRealtimeData";

interface Permohonan {
  id: number;
  nama: string;
  email: string;
  informasi: string;
  status: string;
  tanggal: string;
}

export default function AdminPermohonanPage() {
  const { userRole } = useRoleAccess();
  const { requests: allRequests } = useRealtimeData();
  const [permohonan, setPermohonan] = useState<Permohonan[]>([]);

  useEffect(() => {
    // Convert realtime data to permohonan format
    const convertedData = allRequests.map(req => ({
      id: parseInt(req.id.replace('REQ', '')),
      nama: req.nama,
      email: req.email,
      informasi: req.jenis_informasi,
      status: req.status === 'pending' ? 'Pending' : 
              req.status === 'processing' ? 'Diproses' :
              req.status === 'approved' ? 'Selesai' : 'Ditolak',
      tanggal: req.tanggal
    }));
    setPermohonan(convertedData);
  }, [allRequests]);

  const updateStatus = (id: number, newStatus: string) => {
    updateStatusInRealtime(id, newStatus);
  };

  const deletePermohonan = (id: number) => {
    if (confirm('Yakin ingin menghapus permohonan ini?')) {
      setPermohonan(prev => prev.filter(item => item.id !== id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Diproses': return 'bg-blue-100 text-blue-800';
      case 'Selesai': return 'bg-green-100 text-green-800';
      case 'Ditolak': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const updateStatusInRealtime = (id: number, newStatus: string) => {
    setPermohonan(prev => prev.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Kelola Permohonan</h1>
        <div className="text-sm text-gray-500">
          Total: {permohonan.length} permohonan
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Informasi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {permohonan.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.nama}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.email}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{item.informasi}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.tanggal}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                  <select 
                    value={item.status}
                    onChange={(e) => updateStatus(item.id, e.target.value)}
                    className="text-xs border rounded px-2 py-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Diproses">Diproses</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Ditolak">Ditolak</option>
                  </select>
                  <RoleGuard requiredRoles={[ROLES.ADMIN]} showAccessDenied={false}>
                    <button 
                      onClick={() => deletePermohonan(item.id)}
                      className="text-red-600 hover:text-red-900 text-xs"
                    >
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