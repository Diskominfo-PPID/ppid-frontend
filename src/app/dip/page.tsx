export default function DipPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Daftar Informasi Publik (DIP)</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">Informasi Berkala</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Laporan Keuangan Tahunan</li>
            <li>• Laporan Kinerja</li>
            <li>• Rencana Kerja Tahunan</li>
            <li>• Struktur Organisasi</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">Informasi Serta Merta</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Pengumuman Lelang</li>
            <li>• Keputusan Penting</li>
            <li>• Informasi Darurat</li>
            <li>• Kebijakan Baru</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">Informasi Setiap Saat</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Profil Dinas</li>
            <li>• Visi Misi</li>
            <li>• Tugas dan Fungsi</li>
            <li>• Kontak Layanan</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">Informasi Dikecualikan</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Data Pribadi</li>
            <li>• Rahasia Negara</li>
            <li>• Proses Hukum</li>
            <li>• Keamanan Publik</li>
          </ul>
        </div>
      </div>
    </div>
  );
}