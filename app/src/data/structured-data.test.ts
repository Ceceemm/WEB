import { describe, expect, it } from 'vitest';
import { notFoundPage, pageRoutes, productPageDetails } from './pages';
import { getHeadHtml, getSitemapXml, getStructuredData } from './structured-data';
import { faqItems } from './site';

type JsonLdNode = Record<string, unknown>;
type FaqQuestionNode = { name: string };
type ProductListEntry = { item: { name: string } };

function graphTypes(path: string) {
  const page = pageRoutes.find((route) => route.path === path);
  if (!page) throw new Error(`Missing page route: ${path}`);

  const data = getStructuredData(page);
  return (data['@graph'] as JsonLdNode[]).map((item) => item['@type']);
}

describe('page routes and structured data', () => {
  it('keeps route paths unique and metadata complete', () => {
    const paths = new Set(pageRoutes.map((page) => page.path));

    expect(paths.size).toBe(pageRoutes.length);
    for (const page of pageRoutes) {
      expect(page.path).toMatch(/^\/$|^\/.*\/index\.html$/);
      expect(page.title).toBeTruthy();
      expect(page.description).toBeTruthy();
      expect(page.h1).toBeTruthy();
    }
  });

  it('adds the expected schema types for key page kinds', () => {
    expect(graphTypes('/')).toContain('LocalBusiness');
    expect(graphTypes('/chanpin/index.html')).toContain('OfferCatalog');
    expect(graphTypes('/chanpin/zhayou-shebei/index.html')).toContain('ItemList');
    expect(graphTypes('/lianxi/index.html')).toContain('ContactPage');
    expect(graphTypes('/wenti/index.html')).toContain('FAQPage');
  });

  it('keeps FAQPage answers sourced from visible FAQ data', () => {
    const faqPage = pageRoutes.find((page) => page.path === '/wenti/index.html');
    if (!faqPage) throw new Error('Missing FAQ page');

    const faqSchema = (getStructuredData(faqPage)['@graph'] as JsonLdNode[]).find(
      (item) => item['@type'] === 'FAQPage',
    );

    const questions = faqSchema?.mainEntity as FaqQuestionNode[] | undefined;

    expect(questions).toHaveLength(faqItems.length);
    expect(questions?.map((item) => item.name)).toEqual(
      faqItems.map((item) => item.question),
    );
  });

  it('only outputs category products on category pages', () => {
    const oilPage = pageRoutes.find((page) => page.path === '/chanpin/zhayou-shebei/index.html');
    if (!oilPage) throw new Error('Missing oil press page');

    const itemList = (getStructuredData(oilPage)['@graph'] as JsonLdNode[]).find(
      (item) => item['@type'] === 'ItemList',
    );
    const entries = itemList?.itemListElement as ProductListEntry[] | undefined;
    const names = entries?.map((entry) => entry.item.name);

    expect(names).toContain('螺旋榨油机');
    expect(names).toContain('液压榨油机');
    expect(names).not.toContain('煤炭装袋机');
    expect(names).not.toContain('设备组装');
  });

  it('includes every route in the sitemap', () => {
    const sitemap = getSitemapXml();

    for (const page of pageRoutes) {
      expect(sitemap).toContain(`https://aqztjx.top${page.path}`);
    }
  });

  it('keeps not-found metadata non-indexable and out of sitemap', () => {
    const head = getHeadHtml(notFoundPage);
    const sitemap = getSitemapXml();

    expect(head).toContain('noindex,follow');
    expect(head).not.toContain('rel="canonical"');
    expect(head).not.toContain('og:url');
    expect(sitemap).not.toContain('/404.html');
    expect(sitemap).not.toContain('<lastmod>');
    for (const page of pageRoutes) {
      expect(sitemap).toContain(`https://aqztjx.top${page.path}`);
    }
  });

  it('includes all product detail pages in sitemap', () => {
    const sitemap = getSitemapXml();
    const productPaths = Object.values(productPageDetails).map((d) => d.path);

    for (const path of productPaths) {
      expect(sitemap).toContain(`https://aqztjx.top${path}`);
    }
  });

  it('adds Product schema to product detail pages', () => {
    const productPage = pageRoutes.find(
      (page) => page.path === '/chanpin/luoxuan-zhayouji/index.html',
    );
    if (!productPage) throw new Error('Missing product detail page');

    const types = (getStructuredData(productPage)['@graph'] as JsonLdNode[]).map(
      (item) => item['@type'],
    );

    expect(types).toContain('Product');
    expect(types).toContain('WebPage');
  });

  it('product detail pages include FAQPage only when faqItems exist', () => {
    // 螺旋榨油机 has faqItems
    const withFaq = pageRoutes.find(
      (page) => page.path === '/chanpin/luoxuan-zhayouji/index.html',
    );
    if (!withFaq) throw new Error('Missing product page');

    const typesWithFaq = (getStructuredData(withFaq)['@graph'] as JsonLdNode[]).map(
      (item) => item['@type'],
    );
    expect(typesWithFaq).toContain('FAQPage');

    // Verify FAQPage content matches visible faqItems
    const detail = productPageDetails['luoxuan-zhayouji'];
    const faqNode = (getStructuredData(withFaq)['@graph'] as JsonLdNode[]).find(
      (item) => item['@type'] === 'FAQPage',
    ) as { mainEntity: { name: string }[] } | undefined;

    expect(faqNode?.mainEntity).toHaveLength(detail.faqItems.length);
    expect(faqNode?.mainEntity.map((q) => q.name)).toEqual(
      detail.faqItems.map((item) => item.question),
    );
  });

  it('product detail page breadcrumb has 4 levels with correct URLs', () => {
    const productPage = pageRoutes.find(
      (page) => page.path === '/chanpin/luoxuan-zhayouji/index.html',
    );
    if (!productPage) throw new Error('Missing product page');

    const breadcrumb = (getStructuredData(productPage)['@graph'] as JsonLdNode[]).find(
      (item) => item['@type'] === 'BreadcrumbList',
    );
    const items = breadcrumb?.itemListElement as JsonLdNode[] | undefined;

    expect(items).toHaveLength(4);
    expect(items?.[0].name).toBe('首页');
    expect(items?.[0].item).toBe('https://aqztjx.top/');
    expect(items?.[1].name).toBe('产品分类');
    expect(items?.[1].item).toBe('https://aqztjx.top/chanpin/index.html');
    expect(items?.[2].name).toBe('榨油设备');
    expect(items?.[2].item).toBe('https://aqztjx.top/chanpin/zhayou-shebei/index.html');
    expect(items?.[3].name).toBe('螺旋榨油机');
    expect(items?.[3].item).toBe('https://aqztjx.top/chanpin/luoxuan-zhayouji/index.html');
  });

  it('products overview breadcrumb has exactly 2 levels', () => {
    const overviewPage = pageRoutes.find(
      (page) => page.path === '/chanpin/index.html',
    );
    if (!overviewPage) throw new Error('Missing products overview page');

    const breadcrumb = (getStructuredData(overviewPage)['@graph'] as JsonLdNode[]).find(
      (item) => item['@type'] === 'BreadcrumbList',
    );
    const items = breadcrumb?.itemListElement as JsonLdNode[] | undefined;

    expect(items).toHaveLength(2);
    expect(items?.[0].name).toBe('首页');
    expect(items?.[0].item).toBe('https://aqztjx.top/');
    expect(items?.[1].name).toBe('产品分类');
    expect(items?.[1].item).toBe('https://aqztjx.top/chanpin/index.html');
  });
});
