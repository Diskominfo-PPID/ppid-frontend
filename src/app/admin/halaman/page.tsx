"use client";

import { useState } from "react";
import { useRoleAccess } from "@/lib/useRoleAccess";
import { ROLES } from "@/lib/roleUtils";
import RoleGuard from "@/components/auth/RoleGuard";
import RichTextEditor from "@/components/ui/RichTextEditor";
import FileUpload from "@/components/ui/FileUpload";
import PagePreview from "@/components/ui/PagePreview";

interface PageContent {
  id: string;
  title: string;
  slug: string;
  content: string;
  files: FileItem[];
  lastUpdated: string;
}

interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
}

export default function AdminHalamanPage() {
  const [pages, setPages] = useState<PageContent[]>([
    {
      id: "profil-ppid",
      title: "Profil PPID",
      slug: "profil",
      content: "<h2>Profil PPID Diskominfo Garut</h2><p>PPID Diskominfo Kabupaten Garut bertugas mengelola informasi publik...</p>",
      files: [],
      lastUpdated: "2024-01-15"
    },
    {
      id: "dip",
      title: "Daftar Informasi Publik (DIP)",
      slug: "dip", 
      content: "<h2>Daftar Informasi Publik</h2><p>Berikut adalah daftar informasi publik yang tersedia...</p>",
      files: [],
      lastUpdated: "2024-01-10"
    }
  ]);
  
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    files: [] as FileItem[]
  });
  const [isSaving, setIsSaving] = useState(false);

  const handlePageSelect = (pageId: string) => {
    const page = pages.find(p => p.id === pageId);
    if (page) {
      setFormData({
        title: page.title,
        content: page.content,
        files: page.files
      });
      setSelectedPage(pageId);
    }
  };

  const handleSave = async () => {
    if (!selectedPage) return;
    
    setIsSaving(true);
    setTimeout(() => {
      setPages(prev => prev.map(page => 
        page.id === selectedPage 
          ? { ...page, ...formData, lastUpdated: new Date().toISOString().split('T')[0] }
          : page
      ));
      setIsSaving(false);
      alert('Halaman berhasil disimpan!');
    }, 1000);
  };

  const handleFileUpload = (files: FileList) => {
    const newFiles: FileItem[] = Array.from(files).map(file => ({
      id: Date.now() + Math.random().toString(),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file)
    }));
    
    setFormData(prev => ({ ...prev, files: [...prev.files, ...newFiles] }));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Kelola Halaman</h1>
      
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Pilih Halaman</h3>
            <div className="space-y-2">
              {pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => handlePageSelect(page.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedPage === page.id 
                      ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="font-medium">{page.title}</div>
                  <div className="text-sm text-gray-500">/{page.slug}</div>
                  <div className="text-xs text-gray-400">Update: {page.lastUpdated}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {selectedPage ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Edit: {formData.title}</h2>
                <div className="flex gap-3">
                  <PagePreview
                    title={formData.title}
                    content={formData.content}
                    files={formData.files}
                  />
                  <RoleGuard requiredRoles={[ROLES.ADMIN, ROLES.PPID]} showAccessDenied={false}>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg"
                    >
                      {isSaving ? 'Menyimpan...' : 'Simpan Halaman'}
                    </button>
                  </RoleGuard>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Judul Halaman</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Masukkan judul halaman"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Konten Halaman</label>
                  <RichTextEditor
                    value={formData.content}
                    onChange={(value) => setFormData({...formData, content: value})}
                    onFileUpload={handleFileUpload}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">File Lampiran</label>
                  <FileUpload
                    files={formData.files}
                    onFilesChange={(files) => setFormData({...formData, files})}
                  />
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Preview URL:</h4>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                    /{pages.find(p => p.id === selectedPage)?.slug}
                  </code>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Pilih Halaman untuk Diedit</h3>
              <p className="text-gray-500">Pilih halaman dari sidebar untuk mulai mengedit konten.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}