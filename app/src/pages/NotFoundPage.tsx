import { ArrowLeft, PackageSearch } from 'lucide-react';

export function NotFoundPage() {
  return (
    <section className="bg-forge-paper px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <PackageSearch aria-hidden="true" className="mx-auto mb-6 h-12 w-12 text-forge-orange" />
        <p className="font-mono text-sm tracking-[0.2em] text-forge-orange">404</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-forge-black sm:text-5xl">页面未找到</h1>
        <p className="mx-auto mt-5 max-w-xl leading-8 text-forge-muted">
          您访问的页面不存在或地址已变更。可返回首页，或从产品分类继续查看设备信息。
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <a className="inline-flex items-center gap-2 rounded-sm bg-forge-orange px-5 py-3 font-medium text-forge-paper transition-colors hover:bg-forge-orange-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forge-black focus-visible:ring-offset-2" href="/">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            返回首页
          </a>
          <a className="inline-flex items-center rounded-sm border border-forge-black px-5 py-3 font-medium text-forge-black transition-colors hover:bg-forge-black hover:text-forge-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forge-black focus-visible:ring-offset-2" href="/chanpin/index.html">
            查看产品分类
          </a>
        </div>
      </div>
    </section>
  );
}
