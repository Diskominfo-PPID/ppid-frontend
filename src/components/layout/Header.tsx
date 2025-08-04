// src/components/layout/Header.tsx
import Link from "next/link";
import Image from "next/image";
import { BarChart3, Home, Info, LogIn, Scale, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo & Title */}
        <Link href="/" className="flex items-center space-x-3">
          <Image src="/logo-garut.svg" alt="Logo PPID" width={40} height={40} />
          <div>
            <h1 className="text-lg font-bold text-blue-800">PPID Diskominfo</h1>
            <p className="text-xs text-gray-500">Kabupaten Garut</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="flex items-center text-gray-600 hover:text-blue-800 transition-colors"
          >
            <Home className="mr-2 h-4 w-4" /> Beranda
          </Link>
          <Link
            href="/profil"
            className="flex items-center text-gray-600 hover:text-blue-800 transition-colors"
          >
            <Info className="mr-2 h-4 w-4" /> Profil PPID
          </Link>
          <Link
            href="/permohonan"
            className="flex items-center text-gray-600 hover:text-blue-800 transition-colors"
          >
            <Scale className="mr-2 h-4 w-4" /> Permohonan
          </Link>
          <Link
            href="/dip"
            className="flex items-center text-gray-600 hover:text-blue-800 transition-colors"
          >
            <BarChart3 className="mr-2 h-4 w-4" /> DIP
          </Link>
        </nav>

        {/* Search & Login */}
        <div className="flex items-center space-x-4">
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Cari informasi..."
              className="border rounded-full py-1.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <Link href="/login">
            <button className="bg-blue-800 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full flex items-center transition-colors">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
