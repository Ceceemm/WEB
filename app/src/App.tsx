import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getPageByPath } from '@/data/pages';
import { HomePage } from '@/pages/HomePage';
import {
  AboutPage,
  CategoryPage,
  ContactPage,
  FaqPage,
  ProductsOverviewPage,
} from '@/pages/StaticPages';

function App({ path }: { path?: string }) {
  const currentPath =
    path ?? (typeof window === 'undefined' ? '/' : window.location.pathname);
  const page = getPageByPath(currentPath);

  const pageContent = (() => {
    if (page.kind === 'home') return <HomePage />;
    if (page.kind === 'about') return <AboutPage />;
    if (page.kind === 'products') return <ProductsOverviewPage />;
    if (page.kind === 'category' && page.categoryKey) {
      return <CategoryPage categoryKey={page.categoryKey} />;
    }
    if (page.kind === 'contact') return <ContactPage />;
    if (page.kind === 'faq') return <FaqPage />;
    return <HomePage />;
  })();

  return (
    <div className="min-h-screen bg-forge-paper text-forge-warm-text font-body">
      <Navbar initialTheme={page.kind === 'home' ? 'light' : 'dark'} />
      <main>{pageContent}</main>
      <Footer />
    </div>
  );
}

export default App;
