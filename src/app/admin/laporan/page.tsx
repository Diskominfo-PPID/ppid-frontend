"use client";

import { useState } from "react";
import { useRoleAccess } from "@/lib/useRoleAccess";
import { ROLES } from "@/lib/roleUtils";
import RoleGuard from "@/components/auth/RoleGuard";

export default function AdminLaporanPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('bulan-ini');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateReport = async (type: string) => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      alert(`Laporan ${type} berhasil diunduh!`);
      setIsGenerating(false);
    }, 2000);
  };
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Laporan</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Filter Periode</h3>
        <select 
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="bulan-ini">Bulan Ini</option>
          <option value="3-bulan">3 Bulan Terakhir</option>
          <option value="tahun-ini">Tahun Ini</option>
          <option value="custom">Custom</option>
        </select>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Laporan Permohonan</h3>
          <p className="text-gray-600 mb-4">Total permohonan bulan ini: 25</p>
          <button 
            onClick={() => generateReport('permohonan')}
            disabled={isGenerating}
            className="bg-blue-800 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-2 px-4 rounded-lg"
          >
            {isGenerating ? 'Generating...' : 'Download PDF'}
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Laporan Kinerja</h3>
          <p className="text-gray-600 mb-4">Tingkat kepuasan: 95%</p>
          <button 
            onClick={() => generateReport('kinerja')}
            disabled={isGenerating}
            className="bg-blue-800 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-2 px-4 rounded-lg"
          >
            {isGenerating ? 'Generating...' : 'Download PDF'}
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Statistik Bulanan</h3>
          <p className="text-gray-600 mb-4">Permohonan selesai: 20/25</p>
          <button 
            onClick={() => generateReport('statistik')}
            disabled={isGenerating}
            className="bg-blue-800 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-2 px-4 rounded-lg"
          >
            {isGenerating ? 'Generating...' : 'Lihat Detail'}
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Laporan Tahunan</h3>
          <p className="text-gray-600 mb-4">Total permohonan 2024: 300</p>
          <button 
            onClick={() => generateReport('tahunan')}
            disabled={isGenerating}
            className="bg-blue-800 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-2 px-4 rounded-lg"
          >
            {isGenerating ? 'Generating...' : 'Download PDF'}
          </button>
        </div>
      </div>
    </div>
  );
}