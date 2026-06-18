import { describe, expect, it } from 'vitest';
import { pageRoutes } from './pages';
import { getSitemapXml, getStructuredData } from './structured-data';
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
      expect(sitemap).toContain(`http://aqztjx.top${page.path}`);
    }
  });
});
