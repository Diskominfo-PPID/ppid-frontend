# PPID Diskominfo Kabupaten Garut

Website resmi Pejabat Pengelola Informasi dan Dokumentasi (PPID) Dinas Komunikasi dan Informatika Kabupaten Garut. Platform ini menyediakan layanan informasi publik yang transparan dan akuntabel sesuai UU No. 14 Tahun 2008.

## Fitur Utama

### 🏠 Halaman Publik
- **Hero Section** - Informasi utama PPID Diskominfo
- **Layanan PPID** - Permohonan informasi, layanan cepat, pengajuan keberatan, konsultasi
- **Kategori Informasi** - Informasi berkala, serta merta, setiap saat, dan dikecualikan
- **Statistik Kinerja** - Data permohonan dan tingkat kepuasan layanan
- **Footer Informatif** - Kontak, jam layanan, dan link penting

### 🔐 Panel Admin
- **Dashboard** - Statistik permohonan dan tabel data terbaru
- **Manajemen Permohonan** - Kelola permohonan informasi publik
- **Sistem Login** - Autentikasi admin dengan JWT token
- **Sidebar Navigation** - Navigasi admin yang responsif

### 📱 Fitur Teknis
- **Responsive Design** - Tampilan optimal di semua perangkat
- **API Integration** - Koneksi ke backend dengan error handling
- **Loading States** - Indikator loading untuk UX yang baik
- **TypeScript** - Type safety dan development experience

## Syarat Sistem

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 atau **yarn** >= 1.22.0
- **Backend API** berjalan di port 8000 (opsional untuk development)

## Instalasi

1. **Clone repository**
```bash
git clone <repository-url>
cd ppid-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment**
```bash
cp .env.local.example .env.local
```
Edit `.env.local` dan sesuaikan:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

4. **Jalankan development server**
```bash
npm run dev
```

5. **Buka browser**
Akses [http://localhost:3000](http://localhost:3000)

## Penggunaan

### Untuk Pengunjung
1. Buka website di browser
2. Lihat informasi layanan PPID
3. Pelajari kategori informasi publik
4. Hubungi kontak yang tersedia untuk permohonan

### Untuk Admin
1. Akses `/login` untuk masuk ke panel admin
2. Login dengan kredensial yang valid
3. Kelola permohonan di dashboard admin
4. Logout melalui sidebar

## Build Production

```bash
# Build aplikasi
npm run build

# Jalankan production server
npm start
```

## Struktur Proyek

```
src/
├── app/                 # App Router pages
├── components/          # React components
│   ├── layout/         # Header, Footer, Sidebar
│   └── ui/             # UI components
├── context/            # React Context (Auth)
├── lib/                # Utilities (API calls)
└── styles/             # Global styles
```

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Language**: TypeScript
- **Authentication**: JWT Token
