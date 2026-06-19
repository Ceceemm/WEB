import { useEffect, useRef, useState } from 'react';
import { Menu, MessageCircle, Phone, X } from 'lucide-react';
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
        <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-4 sm:h-16 sm:px-5 md:h-[76px] lg:px-10">
          <a
            href="/"
            className={`group flex shrink-0 items-center gap-2.5 transition-colors sm:gap-3 ${theme.brand}`}
          >
            <img
              src="/images/logo-zt.svg"
              alt="增涛机械"
              className="h-9 w-9 shrink-0 border border-forge-warm-border bg-forge-surface object-contain p-1 sm:h-11 sm:w-11"
            />
            <span className="flex shrink-0 flex-col leading-none">
              <span className="whitespace-nowrap font-display text-sm font-black tracking-normal group-hover:text-forge-orange sm:text-base md:text-lg">
                安丘增涛机械
              </span>
              <span className={`mt-1 text-[9px] tracking-[0.16em] transition-colors sm:text-[10px] ${theme.subBrand}`}>
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
            className={`inline-flex h-11 w-11 items-center justify-center border border-current/25 transition-colors lg:hidden ${theme.menu}`}
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
        className={`fixed inset-0 z-[60] overflow-y-auto bg-forge-orange transition-transform duration-500 lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex min-h-dvh flex-col px-5 py-5">
          <div className="flex items-center justify-between">
            <div className="text-forge-warm-text">
              <p className="font-display text-xl font-black">安丘增涛机械</p>
              <p className="mt-1 text-xs font-semibold tracking-[0.16em] text-forge-warm-text/70">
                设备咨询入口
              </p>
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center border border-forge-warm-text text-forge-warm-text transition-colors hover:border-forge-paper hover:text-forge-paper"
              aria-label="关闭菜单"
              tabIndex={mobileOpen ? 0 : -1}
            >
              <X size={26} />
            </button>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-4 py-10">
            {navPages.map((link, i) => (
              <a
                key={link.path}
                href={link.path}
                onClick={() => setMobileOpen(false)}
                className="border-b border-forge-warm-text/24 py-4 font-display text-xl font-bold text-forge-warm-text transition-colors hover:text-forge-paper sm:text-2xl"
                style={{ animationDelay: `${i * 80}ms` }}
                tabIndex={mobileOpen ? 0 : -1}
              >
                {link.navLabel}
              </a>
            ))}
          </div>

          <div className="grid gap-2 border-t border-forge-warm-text/30 pt-4 sm:gap-3 sm:pt-5">
            <a
              href={`tel:${siteInfo.phone}`}
              onClick={() => setMobileOpen(false)}
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-forge-warm-text bg-forge-warm-text px-4 text-sm font-semibold text-forge-paper"
              tabIndex={mobileOpen ? 0 : -1}
            >
              <Phone size={18} aria-hidden="true" />
              电话咨询 {siteInfo.phone}
            </a>
            <div className="inline-flex min-h-12 items-center justify-center gap-2 border border-forge-warm-text px-4 text-sm font-semibold text-forge-warm-text">
              <MessageCircle size={18} aria-hidden="true" />
              微信 {siteInfo.wechat}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
