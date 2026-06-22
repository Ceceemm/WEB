import { categoryDetails, getCategoryProducts, getProductPageDetailByPath, pageRoutes, type PageMeta } from './pages';
import { productCategories, products } from './products';
import { faqItems, siteInfo } from './site';

const businessId = `${siteInfo.url}/#business`;
const websiteId = `${siteInfo.url}/#website`;
type JsonLdNode = Record<string, unknown>;

function absoluteUrl(path: string) {
  return `${siteInfo.url}${path === '/' ? '/' : path}`;
}

function absoluteImage(path: string) {
  return `${siteInfo.url}${path}`;
}

function baseGraph(): JsonLdNode[] {
  return [
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: siteInfo.shortName,
      url: `${siteInfo.url}/`,
      publisher: { '@id': businessId },
      inLanguage: 'zh-CN',
    },
    {
      '@type': 'LocalBusiness',
      '@id': businessId,
      name: siteInfo.name,
      alternateName: siteInfo.shortName,
      url: `${siteInfo.url}/`,
      telephone: siteInfo.phoneInternational,
      foundingDate: String(siteInfo.foundingYear),
      description: siteInfo.businessSummary,
      taxID: siteInfo.registrationNumber,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteInfo.address.text,
        addressLocality: siteInfo.address.locality,
        addressRegion: siteInfo.address.region,
        addressCountry: siteInfo.address.country,
      },
      areaServed: siteInfo.serviceAreas.map((area) => ({
        '@type': 'AdministrativeArea',
        name: area,
      })),
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: siteInfo.phoneInternational,
        contactType: 'customer service',
        areaServed: 'CN',
        availableLanguage: 'zh-CN',
      },
    },
  ];
}

function breadcrumbGraph(page: PageMeta): JsonLdNode {
  const isProduct = page.kind === 'product' && page.productId;
  const productRoot = page.path.startsWith('/chanpin/') && page.path !== '/chanpin/index.html';

  const items: JsonLdNode[] = [
    {
      '@type': 'ListItem',
      position: 1,
      name: '首页',
      item: `${siteInfo.url}/`,
    },
  ];

  if (productRoot) {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: '产品分类',
      item: absoluteUrl('/chanpin/index.html'),
    });
  }

  if (isProduct) {
    const detail = getProductPageDetailByPath(page.path);
    if (detail) {
      const catDetail = categoryDetails[detail.categoryKey];
      const cat = productCategories.find((c) => c.key === detail.categoryKey);
      items.push({
        '@type': 'ListItem',
        position: 3,
        name: cat?.label ?? catDetail.h1,
        item: absoluteUrl(catDetail.path),
      });
      items.push({
        '@type': 'ListItem',
        position: 4,
        name: detail.h1,
        item: absoluteUrl(detail.path),
      });
    }
  } else if (productRoot) {
    items.push({
      '@type': 'ListItem',
      position: 3,
      name: page.h1,
      item: absoluteUrl(page.path),
    });
  } else if (page.path !== '/') {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: page.h1,
      item: absoluteUrl(page.path),
    });
  }

  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(page.path)}#breadcrumb`,
    itemListElement: items,
  };
}

function productsGraph(page: PageMeta): JsonLdNode[] {
  const categoryProducts = page.categoryKey ? getCategoryProducts(page.categoryKey) : [];

  return [
    {
      '@type': 'CollectionPage',
      '@id': `${absoluteUrl(page.path)}#webpage`,
      url: absoluteUrl(page.path),
      name: page.h1,
      description: page.description,
      isPartOf: { '@id': websiteId },
      about: { '@id': businessId },
      inLanguage: 'zh-CN',
    },
    {
      '@type': 'ItemList',
      '@id': `${absoluteUrl(page.path)}#products`,
      itemListElement: categoryProducts.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          '@id': `${absoluteUrl(page.path)}#${product.id}`,
          name: product.name,
          description: product.description,
          image: absoluteImage(product.image),
          category: productCategories.find((category) => category.key === product.category)?.label,
          brand: { '@id': businessId },
          manufacturer: { '@id': businessId },
        },
      })),
    },
  ];
}

export function getStructuredData(page: PageMeta) {
  const graph: JsonLdNode[] = [...baseGraph(), breadcrumbGraph(page)];

  if (page.kind === 'products') {
    graph.push({
      '@type': 'CollectionPage',
      '@id': `${absoluteUrl(page.path)}#webpage`,
      url: absoluteUrl(page.path),
      name: page.h1,
      description: page.description,
      isPartOf: { '@id': websiteId },
      about: { '@id': businessId },
      inLanguage: 'zh-CN',
    });
    graph.push({
      '@type': 'OfferCatalog',
      '@id': `${absoluteUrl(page.path)}#catalog`,
      name: '安丘增涛机械产品分类',
      itemListElement: productCategories.map((category) => ({
        '@type': 'OfferCatalog',
        name: category.label,
        description: category.description,
      })),
    });
  }

  if (page.kind === 'category') {
    graph.push(...productsGraph(page));
  }

  if (page.kind === 'contact') {
    graph.push({
      '@type': 'ContactPage',
      '@id': `${absoluteUrl(page.path)}#webpage`,
      url: absoluteUrl(page.path),
      name: page.h1,
      description: page.description,
      about: { '@id': businessId },
      inLanguage: 'zh-CN',
    });
  }

  if (page.kind === 'faq') {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${absoluteUrl(page.path)}#faq`,
      url: absoluteUrl(page.path),
      name: page.h1,
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  if (page.kind === 'product') {
    const detail = getProductPageDetailByPath(page.path);
    if (detail) {
      const prod = products.find((p) => p.id === detail.productId);
      const cat = productCategories.find((c) => c.key === detail.categoryKey);

      graph.push({
        '@type': 'WebPage',
        '@id': `${absoluteUrl(page.path)}#webpage`,
        url: absoluteUrl(page.path),
        name: page.h1,
        description: page.description,
        isPartOf: { '@id': websiteId },
        about: { '@id': businessId },
        inLanguage: 'zh-CN',
      });

      graph.push({
        '@type': 'Product',
        '@id': `${absoluteUrl(page.path)}#product`,
        name: detail.h1,
        description: detail.intro,
        image: prod ? absoluteImage(prod.image) : undefined,
        category: cat?.label,
        brand: { '@id': businessId },
        manufacturer: { '@id': businessId },
      });

      if (detail.faqItems.length > 0) {
        graph.push({
          '@type': 'FAQPage',
          '@id': `${absoluteUrl(page.path)}#faq`,
          url: absoluteUrl(page.path),
          name: `${detail.h1}常见问题`,
          mainEntity: detail.faqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        });
      }
    }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export function getSitemapXml(lastmod = '2026-06-22') {
  const urls = pageRoutes
    .map(
      (page) => `  <url>
    <loc>${absoluteUrl(page.path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export function getHeadHtml(page: PageMeta) {
  const url = absoluteUrl(page.path);
  const json = JSON.stringify(getStructuredData(page), null, 2);

  return [
    `<title>${page.title}</title>`,
    `<meta name="description" content="${page.description}" />`,
    `<link rel="canonical" href="${url}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:title" content="${page.title}" />`,
    `<meta property="og:description" content="${page.description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:site_name" content="${siteInfo.shortName}" />`,
    '<meta property="og:locale" content="zh_CN" />',
    `<script type="application/ld+json">${json}</script>`,
  ].join('\n    ');
}
