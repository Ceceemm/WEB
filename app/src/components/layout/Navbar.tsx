import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useScrollLock } from '@/hooks/use-scroll-lock';

const navLinks = [
  { label: '首页', href: '#hero' },
  { label: '关于我们', href: '#about' },
  { label: '产品系列', href: '#products' },
  { label: '设备实拍', href: '#gallery' },
  { label: '联系我们', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useScrollLock(mobileOpen);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-forge-black/85 backdrop-blur-xl border-b border-forge-light/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 md:h-20">
          <a href="#hero" className="font-display font-bold text-lg md:text-xl text-forge-cream tracking-wide hover:text-forge-orange transition-colors">
            安丘增涛机械
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-forge-gray hover:text-forge-cream transition-colors tracking-wider uppercase font-mono text-[11px]"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-forge-cream hover:text-forge-orange transition-colors"
            aria-label="打开菜单"
            aria-controls="mobile-menu"
            aria-expanded={mobileOpen}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay Menu */}
      <div
        id="mobile-menu"
        aria-hidden={!mobileOpen}
        className={`fixed inset-0 z-[60] bg-forge-orange transition-transform duration-500 md:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex justify-end p-6">
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="text-forge-white hover:text-forge-black transition-colors"
            aria-label="关闭菜单"
            tabIndex={mobileOpen ? 0 : -1}
          >
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center gap-8 mt-16">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-display font-bold text-forge-white hover:text-forge-black transition-colors"
              style={{ animationDelay: `${i * 80}ms` }}
              tabIndex={mobileOpen ? 0 : -1}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
