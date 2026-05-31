const FOUNDING_YEAR = 2012;
const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-forge-warm-border bg-forge-paper">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-forge-warm-muted text-sm">
          &copy; {FOUNDING_YEAR}-{currentYear} 安丘市增涛机械有限公司
        </p>
        <p className="text-forge-warm-text text-sm font-semibold tracking-wider">
          山东潍坊制造 · 油脂加工与装袋设备
        </p>
      </div>
    </footer>
  );
}
