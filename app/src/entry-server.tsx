import { renderToString } from 'react-dom/server';
import App from './App';
import { getPageByPath } from './data/pages';
import { getHeadHtml } from './data/structured-data';
export { getSitemapXml } from './data/structured-data';
export { pageRoutes } from './data/pages';

export function render(path: string) {
  const page = getPageByPath(path);

  return {
    appHtml: renderToString(<App path={page.path} />),
    headHtml: getHeadHtml(page),
    path: page.path,
  };
}
