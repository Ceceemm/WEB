const FOUNDING_YEAR = 2012;
const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-forge-light/20 bg-forge-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-forge-gray text-sm font-mono">
          &copy; {FOUNDING_YEAR}-{currentYear} 安丘市增涛机械有限公司
        </p>
        <p className="text-forge-gray text-sm font-display tracking-wider">
          制造可靠品质
        </p>
      </div>
    </footer>
  );
}
