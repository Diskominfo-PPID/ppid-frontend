"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getAdminData } from "@/lib/api"; // Kita bisa gunakan kembali fungsi ini
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export default function PemohonDashboardPage() {
  const [requests, setRequests] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    // Di masa depan, endpoint ini bisa dibuat khusus untuk pemohon
    // Untuk saat ini, kita asumsikan admin bisa melihat semua
    if (token) {
      const fetchMyRequests = async () => {
        try {
          // Anda perlu membuat endpoint baru di backend: GET /api/permintaan/saya
          // const data = await getAdminData('/permintaan/saya', token);
          // setRequests(data);
        } catch (error) {
          console.error("Gagal mengambil data permohonan:", error);
        }
      };
      // fetchMyRequests();
    }
  }, [token]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dasbor Pemohon</h1>
        <Link
          href="/pemohon/ajukan"
          className="flex items-center px-4 py-2 font-semibold text-white rounded-lg transition-colors bg-primary hover:bg-secondary"
        >
          <PlusCircle className="mr-2 w-5 h-5" />
          Ajukan Permohonan Baru
        </Link>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-xl font-semibold">
          Riwayat Permohonan Informasi Anda
        </h2>
        {requests.length > 0 ? (
          <table className="w-full text-left">
            {/* Header Tabel */}
            <thead>
              <tr className="bg-light-bg">
                <th className="p-3">No. Pendaftaran</th>
                <th className="p-3">Informasi Diminta</th>
                <th className="p-3">Tanggal</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            {/* Body Tabel */}
            <tbody>
              {requests.map((req: any) => (
                <tr key={req.no_pendaftaran} className="border-b">
                  <td className="p-3 font-mono text-sm">
                    {req.no_pendaftaran}
                  </td>
                  <td className="p-3">{req.rincian_informasi_diminta}</td>
                  <td className="p-3">
                    {new Date(req.tanggal).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded-full">
                      {req.status_permohonan}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="py-8 text-center text-gray-500">
            Anda belum memiliki riwayat permohonan.
          </p>
        )}
      </div>
    </div>
  );
}
