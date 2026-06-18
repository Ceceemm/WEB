import { useEffect, useRef, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { useScrollLock } from '@/hooks/use-scroll-lock';
import { navPages } from '@/data/pages';
import { siteInfo } from '@/data/site';

type NavTheme = 'light' | 'dark' | 'warm';

const themeStyles: Record<
  NavTheme,
  {
    nav: string;
    brand: string;
    subBrand: string;
    link: string;
    phone: string;
    menu: string;
  }
> = {
  light: {
    nav: 'border-forge-warm-border/45 bg-forge-paper/58 shadow-[0_10px_34px_hsl(36_15%_11%_/_0.10)] backdrop-blur-2xl',
    brand: 'text-forge-warm-text',
    subBrand: 'text-forge-warm-muted',
    link: 'text-forge-warm-muted hover:text-forge-orange',
    phone: 'border-forge-warm-text bg-forge-warm-text text-forge-paper hover:border-forge-orange hover:bg-forge-orange',
    menu: 'text-forge-warm-text hover:text-forge-orange',
  },
  dark: {
    nav: 'border-forge-cream/15 bg-forge-warm-text/42 shadow-[0_10px_34px_hsl(36_15%_11%_/_0.22)] backdrop-blur-xl',
    brand: 'text-forge-paper drop-shadow-[0_1px_1px_hsl(36_15%_11%_/_0.55)]',
    subBrand: 'text-forge-cream/70',
    link: 'text-forge-paper drop-shadow-[0_1px_1px_hsl(36_15%_11%_/_0.55)] hover:text-forge-orange',
    phone: 'border-forge-paper bg-forge-paper text-forge-warm-text hover:border-forge-orange hover:bg-forge-orange hover:text-forge-paper',
    menu: 'text-forge-paper hover:text-forge-orange',
  },
  warm: {
    nav: 'border-forge-warm-text/25 bg-forge-orange/40 shadow-[0_10px_34px_hsl(18_76%_30%_/_0.16)] backdrop-blur-xl',
    brand: 'text-forge-warm-text',
    subBrand: 'text-forge-warm-text/65',
    link: 'text-forge-warm-text/75 hover:text-forge-warm-text',
    phone: 'border-forge-warm-text bg-forge-warm-text text-forge-paper hover:border-forge-paper hover:bg-forge-paper hover:text-forge-warm-text',
    menu: 'text-forge-warm-text hover:text-forge-paper',
  },
};

export function Navbar({ initialTheme = 'light' }: { initialTheme?: NavTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navTheme, setNavTheme] = useState<NavTheme>(initialTheme);
  const navRef = useRef<HTMLElement>(null);

  useScrollLock(mobileOpen);

  useEffect(() => {
    let frame = 0;

    const updateTheme = () => {
      frame = 0;
      const probeY = (navRef.current?.offsetHeight ?? 76) + 1;
      const themedSections = Array.from(
        document.querySelectorAll<HTMLElement>('[data-nav-theme]')
      );
      const active = themedSections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= probeY && rect.bottom > probeY;
      });
      const nextTheme = active?.dataset.navTheme as NavTheme | undefined;

      setNavTheme(nextTheme ?? 'light');
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateTheme);
    };

    updateTheme();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  const theme = themeStyles[navTheme];

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${theme.nav}`}
      >
        <div className="max-w-[1440px] mx-auto px-5 lg:px-10 flex items-center justify-between h-16 md:h-[76px]">
          <a href="/" className={`group flex items-center gap-3 transition-colors ${theme.brand}`}>
            <img
              src="/images/logo-zt.svg"
              alt="增涛机械"
              className="h-11 w-11 border border-forge-warm-border bg-forge-surface object-contain p-1"
            />
            <span className="flex flex-col leading-none">
              <span className="font-display font-black text-base md:text-lg tracking-wide group-hover:text-forge-orange">
                安丘增涛机械
              </span>
              <span className={`mt-1 text-[10px] tracking-[0.18em] transition-colors ${theme.subBrand}`}>
                MACHINE WORKS
              </span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navPages.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className={`text-[13px] transition-colors font-medium ${theme.link}`}
              >
                {link.navLabel}
              </a>
            ))}
            <a
              href={`tel:${siteInfo.phone}`}
              className={`inline-flex h-10 items-center gap-2 border px-4 text-sm font-semibold transition-colors ${theme.phone}`}
            >
              <Phone size={16} aria-hidden="true" />
              {siteInfo.phone}
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className={`lg:hidden transition-colors ${theme.menu}`}
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
          {navPages.map((link, i) => (
            <a
              key={link.path}
              href={link.path}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-display font-bold text-forge-white hover:text-forge-black transition-colors"
              style={{ animationDelay: `${i * 80}ms` }}
              tabIndex={mobileOpen ? 0 : -1}
            >
              {link.navLabel}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
