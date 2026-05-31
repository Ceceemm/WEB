import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionErrorBoundary } from '@/components/common/SectionErrorBoundary';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { AdvantagesSection } from '@/components/sections/AdvantagesSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { ContactSection } from '@/components/sections/ContactSection';

function App() {
  return (
    <div className="min-h-screen bg-forge-paper text-forge-warm-text font-body">
      <Navbar />
      <main>
        <SectionErrorBoundary name="HeroSection">
          <HeroSection />
        </SectionErrorBoundary>
        <SectionErrorBoundary name="AboutSection">
          <AboutSection />
        </SectionErrorBoundary>
        <SectionErrorBoundary name="ProductsSection">
          <ProductsSection />
        </SectionErrorBoundary>
        <SectionErrorBoundary name="ProcessSection">
          <ProcessSection />
        </SectionErrorBoundary>
        <SectionErrorBoundary name="GallerySection">
          <GallerySection />
        </SectionErrorBoundary>
        <SectionErrorBoundary name="AdvantagesSection">
          <AdvantagesSection />
        </SectionErrorBoundary>
        <SectionErrorBoundary name="ContactSection">
          <ContactSection />
        </SectionErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}

export default App;
