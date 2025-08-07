"use client";

export default function AdminLaporanPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Laporan</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Laporan Permohonan</h3>
          <p className="text-gray-600 mb-4">Total permohonan bulan ini: 25</p>
          <button className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
            Download PDF
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Laporan Kinerja</h3>
          <p className="text-gray-600 mb-4">Tingkat kepuasan: 95%</p>
          <button className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
            Download PDF
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Statistik Bulanan</h3>
          <p className="text-gray-600 mb-4">Permohonan selesai: 20/25</p>
          <button className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
            Lihat Detail
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Laporan Tahunan</h3>
          <p className="text-gray-600 mb-4">Total permohonan 2024: 300</p>
          <button className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}