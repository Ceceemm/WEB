import { useState, useEffect } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { useScrollLock } from '@/hooks/use-scroll-lock';

const navLinks = [
  { label: '首页', href: '#hero' },
  { label: '关于我们', href: '#about' },
  { label: '产品系列', href: '#products' },
  { label: '制造流程', href: '#process' },
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
            ? 'bg-forge-surface/92 backdrop-blur-xl border-b border-forge-warm-border/70 shadow-sm'
            : 'bg-forge-paper/80 backdrop-blur-sm border-b border-forge-warm-border/40'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-5 lg:px-10 flex items-center justify-between h-16 md:h-[76px]">
          <a href="#hero" className="group flex items-center gap-3 text-forge-warm-text transition-colors">
            <img
              src="/images/logo-zt.svg"
              alt="增涛机械"
              className="h-11 w-11 border border-forge-warm-border bg-forge-surface object-contain p-1"
            />
            <span className="flex flex-col leading-none">
              <span className="font-display font-black text-base md:text-lg tracking-wide group-hover:text-forge-orange">
                安丘增涛机械
              </span>
              <span className="mt-1 text-[10px] text-forge-warm-muted tracking-[0.18em]">
                MACHINE WORKS
              </span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] text-forge-warm-muted hover:text-forge-orange transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:13606464864"
              className="inline-flex h-10 items-center gap-2 border border-forge-warm-text bg-forge-warm-text px-4 text-sm font-semibold text-forge-paper transition-colors hover:bg-forge-orange hover:border-forge-orange"
            >
              <Phone size={16} aria-hidden="true" />
              13606464864
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-forge-warm-text hover:text-forge-orange transition-colors"
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
        className={`fixed inset-0 z-[60] bg-forge-orange transition-transform duration-500 lg:hidden ${
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

        <div className="flex flex-col items-center justify-center gap-7 mt-10">
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
