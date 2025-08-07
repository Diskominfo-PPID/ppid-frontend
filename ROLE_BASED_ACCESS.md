# Role-Based Access Control (RBAC) - PPID Frontend

## Overview
Sistem PPID Frontend telah diperbaiki untuk mendukung role-based access control yang memastikan setiap pengguna hanya dapat mengakses fitur sesuai dengan role mereka.

## Roles yang Didukung

### 1. Admin
- **Akses penuh** ke semua fitur admin
- Menu yang tersedia:
  - Dashboard
  - Permohonan
  - Informasi
  - Laporan
  - Pengaturan

### 2. PPID
- **Akses terbatas** untuk mengelola informasi dan permohonan
- Menu yang tersedia:
  - Dashboard
  - Permohonan
  - Informasi

### 3. Atasan PPID
- **Akses untuk monitoring** dan laporan
- Menu yang tersedia:
  - Dashboard
  - Permohonan
  - Laporan

### 4. Pemohon
- **Akses untuk mengajukan** dan melihat status permohonan
- Fitur yang tersedia:
  - Dashboard pemohon
  - Ajukan permohonan
  - Riwayat permohonan

## Struktur File yang Diperbaiki

### 1. Context & Authentication
- `src/context/AuthContext.tsx` - Enhanced dengan user data dan role management
- `src/lib/roleUtils.ts` - Utility functions untuk role-based logic
- `src/lib/useRoleAccess.ts` - Custom hook untuk role access control

### 2. Layout Components
- `src/app/admin/layout.tsx` - Validasi role admin
- `src/app/pemohon/layout.tsx` - Validasi role pemohon
- `src/components/layout/Sidebar.tsx` - Menu dinamis berdasarkan role
- `src/components/layout/PemohonHeader.tsx` - Header untuk pemohon

### 3. Dashboard Pages
- `src/app/dashboard/page.tsx` - Router berdasarkan role
- `src/app/admin/dashboard/page.tsx` - Dashboard admin dengan role info
- `src/app/pemohon/dashboard/page.tsx` - Dashboard pemohon

### 4. Security Components
- `src/components/auth/RoleGuard.tsx` - Komponen untuk melindungi konten
- `src/components/ui/AccessDenied.tsx` - Halaman akses ditolak

## Cara Penggunaan

### 1. Menggunakan RoleGuard
```tsx
import RoleGuard from "@/components/auth/RoleGuard";
import { ROLES } from "@/lib/roleUtils";

// Hanya admin yang bisa melihat
<RoleGuard requiredRoles={[ROLES.ADMIN]}>
  <AdminOnlyComponent />
</RoleGuard>

// Admin dan PPID yang bisa melihat
<RoleGuard requiredRoles={[ROLES.ADMIN, ROLES.PPID]}>
  <AdminPPIDComponent />
</RoleGuard>
```

### 2. Menggunakan useRoleAccess Hook
```tsx
import { useRoleAccess } from "@/lib/useRoleAccess";
import { ROLES } from "@/lib/roleUtils";

const MyComponent = () => {
  const { userRole, hasAccess, isAdmin } = useRoleAccess();

  if (isAdmin()) {
    return <AdminView />;
  }

  if (hasAccess([ROLES.PPID])) {
    return <PPIDView />;
  }

  return <DefaultView />;
};
```

### 3. Menggunakan Role Utils
```tsx
import { isAdminRole, isPemohon, getRoleDisplayName } from "@/lib/roleUtils";

const userRole = getUserRole();

if (isAdminRole(userRole)) {
  // Logic untuk admin roles
}

if (isPemohon(userRole)) {
  // Logic untuk pemohon
}

const displayName = getRoleDisplayName(userRole);
```

## Flow Autentikasi

1. **Login** - User login dengan email/password
2. **Role Detection** - Sistem mendeteksi role dari response API
3. **Redirect** - User diarahkan ke dashboard sesuai role:
   - Admin/PPID/Atasan_PPID → `/admin/dashboard`
   - Pemohon → `/pemohon/dashboard`
4. **Layout Protection** - Setiap layout memvalidasi role
5. **Menu Filtering** - Menu sidebar difilter berdasarkan role

## Security Features

### 1. Layout Level Protection
- Setiap layout memvalidasi role sebelum render
- Redirect otomatis jika role tidak sesuai

### 2. Route Protection
- Dashboard utama sebagai router berdasarkan role
- Validasi role di setiap protected route

### 3. Component Level Protection
- RoleGuard untuk melindungi komponen spesifik
- AccessDenied component untuk user experience yang baik

### 4. Menu Access Control
- Sidebar menu difilter berdasarkan role
- Hanya menu yang relevan yang ditampilkan

## Testing Role-Based Access

### 1. Login sebagai Admin
- Akses: Semua menu admin tersedia
- Dashboard: "Dashboard Administrator"
- Sidebar: Semua menu (Dashboard, Permohonan, Informasi, Laporan, Pengaturan)

### 2. Login sebagai PPID
- Akses: Menu terbatas
- Dashboard: "Dashboard PPID"
- Sidebar: Dashboard, Permohonan, Informasi

### 3. Login sebagai Atasan PPID
- Akses: Menu monitoring
- Dashboard: "Dashboard Atasan PPID"
- Sidebar: Dashboard, Permohonan, Laporan

### 4. Login sebagai Pemohon
- Akses: Dashboard pemohon
- Layout: Header dengan info user dan role badge
- Fitur: Ajukan permohonan, lihat riwayat

## Error Handling

### 1. Invalid Role
- User dengan role tidak valid akan di-logout otomatis
- Redirect ke halaman login

### 2. Unauthorized Access
- Tampilkan AccessDenied component
- Informasi role yang diperlukan
- Link untuk kembali ke dashboard yang sesuai

### 3. Missing Token
- Redirect otomatis ke halaman login
- Clear localStorage

## Best Practices

1. **Selalu validasi role** di level layout dan component
2. **Gunakan role utilities** untuk konsistensi
3. **Implement RoleGuard** untuk komponen sensitif
4. **Provide fallback** untuk unauthorized access
5. **Clear error messages** untuk user experience yang baik