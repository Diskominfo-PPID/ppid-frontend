"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getRoleDisplayName } from "@/lib/roleUtils";
import { FileText, Clock, CheckCircle, AlertCircle } from "lucide-react";
import Chart from "@/components/ui/Chart";

interface Request {
  id: string;
  nama: string;
  email: string;
  jenis_informasi: string;
  status: string;
  tanggal: string;
}

export default function DashboardPage() {
  const { getUserRole } = useAuth();
  const userRole = getUserRole();
  const [requests, setRequests] = useState<Request[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });

  useEffect(() => {
    // Simulate API call with dummy data
    const dummyRequests: Request[] = [
      {
        id: "1",
        nama: "John Doe",
        email: "john@example.com",
        jenis_informasi: "Informasi Berkala",
        status: "pending",
        tanggal: "2024-01-15"
      },
      {
        id: "2",
        nama: "Jane Smith",
        email: "jane@example.com",
        jenis_informasi: "Informasi Setiap Saat",
        status: "approved",
        tanggal: "2024-01-14"
      }
    ];

    setRequests(dummyRequests);
    setStats({
      total: dummyRequests.length,
      pending: dummyRequests.filter(r => r.status === "pending").length,
      approved: dummyRequests.filter(r => r.status === "approved").length,
      rejected: dummyRequests.filter(r => r.status === "rejected").length
    });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "text-yellow-600 bg-yellow-100";
      case "approved": return "text-green-600 bg-green-100";
      case "rejected": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard {getRoleDisplayName(userRole)}</h1>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {getRoleDisplayName(userRole)}
          </div>
        </div>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Permohonan</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Menunggu</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Disetujui</p>
                <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ditolak</p>
                <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Chart
            type="bar"
            title="Permohonan per Bulan"
            data={[
              { label: "Jan", value: 45, color: "#3B82F6" },
              { label: "Feb", value: 52, color: "#3B82F6" },
              { label: "Mar", value: 38, color: "#3B82F6" },
              { label: "Apr", value: 61, color: "#3B82F6" },
              { label: "Mei", value: 55, color: "#3B82F6" },
              { label: "Jun", value: 67, color: "#3B82F6" }
            ]}
          />
          
          <Chart
            type="pie"
            title="Status Permohonan"
            data={[
              { label: "Disetujui", value: stats.approved || 15, color: "#10B981" },
              { label: "Menunggu", value: stats.pending || 8, color: "#F59E0B" },
              { label: "Ditolak", value: stats.rejected || 3, color: "#EF4444" }
            ]}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Chart
            type="line"
            title="Tren Permohonan Harian"
            data={[
              { label: "Sen", value: 12, color: "#8B5CF6" },
              { label: "Sel", value: 19, color: "#8B5CF6" },
              { label: "Rab", value: 15, color: "#8B5CF6" },
              { label: "Kam", value: 22, color: "#8B5CF6" },
              { label: "Jum", value: 18, color: "#8B5CF6" },
              { label: "Sab", value: 8, color: "#8B5CF6" },
              { label: "Min", value: 5, color: "#8B5CF6" }
            ]}
          />
          
          <Chart
            type="bar"
            title="Kategori Informasi"
            data={[
              { label: "Berkala", value: 25, color: "#06B6D4" },
              { label: "Setiap Saat", value: 18, color: "#06B6D4" },
              { label: "Serta Merta", value: 12, color: "#06B6D4" },
              { label: "Dikecualikan", value: 5, color: "#06B6D4" }
            ]}
          />
        </div>

        {/* Requests Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Permohonan Terbaru</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jenis Informasi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr key={request.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {request.nama}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.jenis_informasi}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.tanggal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
