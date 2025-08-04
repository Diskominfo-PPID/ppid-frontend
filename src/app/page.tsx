import HeroSection from "@/components/HeroSection";
import InformationGrid from "@/components/InformationGrid";
import ServiceSection from "@/components/ServiceSection";
import StatsSection from "@/components/StatsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      
      <ServiceSection />
      
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Kategori Informasi Publik
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Informasi publik dikategorikan berdasarkan sifat dan waktu penyampaiannya sesuai UU No. 14 Tahun 2008
            </p>
          </div>
          <InformationGrid />
        </div>
      </section>
      
      <StatsSection />
    </main>
  );
}
