export default function ProfilPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Profil PPID</h1>
      
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Tentang PPID Diskominfo</h2>
        <p className="text-gray-600 mb-4">
          Pejabat Pengelola Informasi dan Dokumentasi (PPID) Dinas Komunikasi dan Informatika 
          Kabupaten Garut bertugas melayani permintaan informasi publik sesuai UU No. 14 Tahun 2008.
        </p>
        
        <h3 className="text-xl font-semibold mb-3">Visi</h3>
        <p className="text-gray-600 mb-4">
          Mewujudkan keterbukaan informasi publik yang transparan dan akuntabel.
        </p>
        
        <h3 className="text-xl font-semibold mb-3">Misi</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Memberikan pelayanan informasi publik yang berkualitas</li>
          <li>Meningkatkan transparansi dan akuntabilitas pemerintahan</li>
          <li>Memfasilitasi akses informasi bagi masyarakat</li>
        </ul>
      </div>
    </div>
  );
}