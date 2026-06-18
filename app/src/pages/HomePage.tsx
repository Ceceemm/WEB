import { SectionErrorBoundary } from '@/components/common/SectionErrorBoundary';
import { AboutSection } from '@/components/sections/AboutSection';
import { AdvantagesSection } from '@/components/sections/AdvantagesSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { ProductsSection } from '@/components/sections/ProductsSection';

export function HomePage() {
  return (
    <>
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
    </>
  );
}
