"use client";

export default function AdminPengaturanPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Pengaturan</h1>
      
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-6">Pengaturan Sistem</h2>
        
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nama Instansi</label>
            <input 
              type="text" 
              defaultValue="PPID Diskominfo Kabupaten Garut"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Kontak</label>
            <input 
              type="email" 
              defaultValue="ppid@garutkab.go.id"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
            <input 
              type="tel" 
              defaultValue="(0262) 123456"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
            <textarea 
              rows={3}
              defaultValue="Jl. Pembangunan No. 1, Garut, Jawa Barat"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
            ></textarea>
          </div>
          
          <button type="submit" className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg">
            Simpan Pengaturan
          </button>
        </form>
      </div>
    </div>
  );
}