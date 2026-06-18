const FOUNDING_YEAR = 2012;
const currentYear = new Date().getFullYear();
const ICP_FILING_URL = 'https://beian.miit.gov.cn/#/Integrated/index';
const MPS_FILING_URL = 'https://beian.mps.gov.cn/#/query/webSearch?code=37078402000544';

export function Footer() {
  return (
    <footer className="border-t border-forge-warm-border bg-forge-paper">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-forge-warm-muted text-sm">
          &copy; {FOUNDING_YEAR}-{currentYear} 安丘市增涛机械有限公司
        </p>
        <a
          className="text-forge-warm-muted text-sm hover:text-forge-orange transition-colors"
          href={ICP_FILING_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          鲁ICP备2026031639号
        </a>
        <a
          className="inline-flex items-center gap-1.5 text-forge-warm-muted text-sm hover:text-forge-orange transition-colors"
          href={MPS_FILING_URL}
          target="_blank"
          rel="noreferrer"
        >
          <img className="h-4 w-4" src="/images/beian-icon.png" alt="公安备案图标" />
          <span>鲁公网安备37078402000544号</span>
        </a>
        <p className="text-forge-warm-text text-sm font-semibold tracking-wider">
          山东潍坊制造 · 油脂加工与装袋设备
        </p>
      </div>
    </footer>
  );
}
