# PPID Diskominfo Kabupaten Garut

Website resmi Pejabat Pengelola Informasi dan Dokumentasi (PPID) Dinas Komunikasi dan Informatika Kabupaten Garut. Platform ini menyediakan layanan informasi publik yang transparan dan akuntabel sesuai UU No. 14 Tahun 2008.

## Fitur Utama

### 🏠 Halaman Publik
- **Hero Section** - Informasi utama PPID Diskominfo dengan customizable content
- **Layanan PPID** - Permohonan informasi, layanan cepat, pengajuan keberatan, konsultasi
- **Kategori Informasi** - Informasi berkala, serta merta, setiap saat, dan dikecualikan
- **Statistik Kinerja** - Data permohonan dan tingkat kepuasan layanan real-time
- **Footer Informatif** - Kontak, jam layanan, dan social media links
- **Accessibility Helper** - Text-to-speech untuk pengguna disabilitas

### 🔐 Panel Admin Multi-Role
- **Dashboard Real-time** - Statistik permohonan dengan charts dan analytics
- **Role-Based Access** - Admin, PPID Utama, PPID Pelaksana, Atasan PPID
- **Bulk Actions** - Aksi massal untuk permohonan dan keberatan
- **Profile Management** - Kustomisasi profile per role dengan foto
- **Account Management** - Kelola akun semua role (Admin only)

### 🎨 Website Customization
- **Branding Control** - Upload logo, favicon, color scheme, fonts
- **Homepage Editor** - Edit hero section, CTA, dan konten dinamis
- **Navigation Builder** - Kustomisasi menu dengan dropdown support
- **Footer Editor** - Edit kontak info dan social media links
- **Report Generator** - Multiple templates dengan export PDF/Word/Excel

### ♿ Accessibility Features
- **Text-to-Speech** - Hover untuk membacakan teks (Bahasa Indonesia)
- **Floating Controls** - Kontrol aksesibilitas yang dapat dinonaktifkan
- **ARIA Support** - Proper accessibility labels dan keyboard navigation
- **Visual Indicators** - Clear feedback untuk semua interaksi

### 📱 Fitur Teknis
- **Responsive Design** - Tampilan optimal di semua perangkat
- **Real-time Data** - Live updates dengan hooks dan context
- **Loading States** - Indikator loading untuk UX yang baik
- **TypeScript** - Type safety dan development experience
- **LocalStorage** - Persistent settings dan customizations

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

### Untuk Admin & Staff
1. Akses `/login` untuk masuk ke panel admin
2. Login dengan kredensial sesuai role (lihat detail akun di bawah)
3. Kelola permohonan, keberatan, dan informasi sesuai wewenang
4. Gunakan bulk actions untuk efisiensi kerja
5. Kustomisasi tampilan website (Admin only)
6. Generate laporan dengan berbagai template
7. Logout melalui sidebar

## Detail Akun Default

### 👑 Administrator
- **Email**: admin@ppid-garut.go.id
- **Password**: ppid321
- **Wewenang**: Full access ke semua fitur
- **Fitur Khusus**: Kelola akun, kelola tampilan, pengaturan sistem

### 🏢 PPID Utama
- **Email**: ppid.utama@ppid-garut.go.id
- **Password**: ppid321
- **Wewenang**: Menerima dan meneruskan permohonan/keberatan
- **Fitur Khusus**: Bulk actions, kelola informasi, kelola halaman

### ⚡ PPID Pelaksana
- **Email**: ppid.pelaksana@ppid-garut.go.id
- **Password**: ppid321
- **Wewenang**: Memproses dan menyelesaikan permohonan/keberatan
- **Fitur Khusus**: Eksekusi final permohonan dan keberatan

### 👁️ Atasan PPID (Monitoring)
- **Email**: atasan.ppid@ppid-garut.go.id
- **Password**: ppid321
- **Wewenang**: Monitoring dan supervisi (read-only)
- **Fitur Khusus**: Dashboard analytics, laporan, view detail

### 👤 Pemohon
- **Email**: pemohon@email.com
- **Password**: ppid321
- **Wewenang**: Ajukan permohonan, keberatan, lihat riwayat
- **Fitur Khusus**: Dashboard personal, tarik kembali permohonan

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

- **Framework**: Next.js 15 dengan App Router
- **Styling**: Tailwind CSS dengan CSS Variables
- **Icons**: Lucide React
- **HTTP Client**: Axios dengan error handling
- **Language**: TypeScript dengan strict mode
- **Authentication**: JWT Token dengan role-based access
- **State Management**: React Context + Hooks
- **Accessibility**: Web Speech API untuk text-to-speech
- **Storage**: LocalStorage untuk preferences
- **Charts**: Custom chart components untuk analytics
