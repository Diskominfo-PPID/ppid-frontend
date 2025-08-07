"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";

export default function KeberatanPage() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    permohonan_asal: '',
    alasan_keberatan: '',
    bukti_pendukung: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nama.trim()) newErrors.nama = 'Nama wajib diisi';
    if (!formData.email.trim()) newErrors.email = 'Email wajib diisi';
    if (!formData.permohonan_asal.trim()) newErrors.permohonan_asal = 'Nomor permohonan asal wajib diisi';
    if (!formData.alasan_keberatan.trim()) newErrors.alasan_keberatan = 'Alasan keberatan wajib diisi';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Keberatan berhasil diajukan!');
      setFormData({ nama: '', email: '', permohonan_asal: '', alasan_keberatan: '', bukti_pendukung: '' });
    } catch (error) {
      alert('Gagal mengajukan keberatan');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Pengajuan Keberatan</h1>
      
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Ajukan Keberatan Informasi</h2>
          <p className="text-gray-600">
            Jika Anda tidak puas dengan tanggapan atas permohonan informasi, Anda dapat mengajukan keberatan.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap *</label>
            <input 
              type="text" 
              value={formData.nama}
              onChange={(e) => handleChange('nama', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.nama ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-800'
              }`}
            />
            {errors.nama && (
              <div className="flex items-center mt-1 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.nama}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-800'
              }`}
            />
            {errors.email && (
              <div className="flex items-center mt-1 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.email}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Permohonan Asal *</label>
            <input 
              type="text" 
              value={formData.permohonan_asal}
              onChange={(e) => handleChange('permohonan_asal', e.target.value)}
              placeholder="REQ001"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.permohonan_asal ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-800'
              }`}
            />
            {errors.permohonan_asal && (
              <div className="flex items-center mt-1 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.permohonan_asal}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Alasan Keberatan *</label>
            <textarea 
              rows={4} 
              value={formData.alasan_keberatan}
              onChange={(e) => handleChange('alasan_keberatan', e.target.value)}
              placeholder="Jelaskan alasan keberatan Anda..."
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.alasan_keberatan ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-800'
              }`}
            />
            {errors.alasan_keberatan && (
              <div className="flex items-center mt-1 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.alasan_keberatan}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bukti Pendukung</label>
            <textarea 
              rows={3} 
              value={formData.bukti_pendukung}
              onChange={(e) => handleChange('bukti_pendukung', e.target.value)}
              placeholder="Lampirkan bukti atau dokumen pendukung jika ada..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-2 px-6 rounded-lg"
          >
            {isSubmitting ? 'Mengajukan...' : 'Ajukan Keberatan'}
          </button>
        </form>
      </div>
    </div>
  );
}