import { AppErrorBoundary } from '@/components/common/AppErrorBoundary';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getPageByPath } from '@/data/pages';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { CategoryPage } from '@/pages/CategoryPage';
import { ContactPage } from '@/pages/ContactPage';
import { FaqPage } from '@/pages/FaqPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { ProductsOverviewPage } from '@/pages/ProductsOverviewPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

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
    if (page.kind === 'product') return <ProductDetailPage path={page.path} />;
    return <NotFoundPage />;
  })();

  return (
    <AppErrorBoundary>
      <div className="min-h-screen bg-forge-paper text-forge-warm-text font-body">
        <Navbar initialTheme={page.kind === 'home' ? 'light' : 'dark'} />
        <a className="skip-link" href="#main-content">跳到主要内容</a>
        <main id="main-content" tabIndex={-1}>{pageContent}</main>
        <Footer />
      </div>
    </AppErrorBoundary>
  );
}

export default App;
