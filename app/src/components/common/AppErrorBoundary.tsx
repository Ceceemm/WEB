import { Component, type ReactNode } from 'react';
import { siteInfo } from '@/data/site';

interface AppErrorBoundaryState {
  hasError: boolean;
}

/**
 * Top-level error boundary. Acts as the last line of defense against
 * uncaught rendering errors that would otherwise produce a white screen.
 * Section-level boundaries (SectionErrorBoundary) handle most cases,
 * but this catches errors in App routing, Navbar, Footer, or any
 * component not wrapped by a section boundary.
 */
export class AppErrorBoundary extends Component<
  { children: ReactNode },
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[AppErrorBoundary] Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-forge-black px-5 text-center">
          <div className="max-w-md">
            <p className="text-sm font-semibold text-forge-orange tracking-wider">
              页面出错
            </p>
            <h1 className="mt-4 font-display text-3xl font-black text-forge-paper md:text-4xl">
              抱歉，页面加载异常
            </h1>
            <p className="mt-4 text-base leading-8 text-forge-cream/70">
              请刷新页面重试，或直接致电联系我们。
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => this.setState({ hasError: false })}
                className="inline-flex h-12 items-center gap-2 bg-forge-orange px-6 text-sm font-semibold text-forge-paper transition-colors hover:bg-forge-orange/90"
              >
                点击重试
              </button>
              <a
                href={`tel:${siteInfo.phone}`}
                className="inline-flex h-12 items-center gap-2 border border-forge-warm-border px-6 text-sm font-semibold text-forge-paper transition-colors hover:border-forge-orange hover:text-forge-orange"
              >
                致电 {siteInfo.phone}
              </a>
            </div>
            <a
              href="/"
              className="mt-6 inline-block text-sm text-forge-gray hover:text-forge-orange transition-colors"
            >
              返回首页
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
