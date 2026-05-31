import { Component, type ReactNode } from 'react';

interface SectionErrorBoundaryProps {
  children: ReactNode;
  name: string;
}

interface SectionErrorBoundaryState {
  hasError: boolean;
}

/**
 * Section-level error boundary. Catches rendering errors in any child
 * component and displays a graceful fallback instead of a white screen.
 */
export class SectionErrorBoundary extends Component<
  SectionErrorBoundaryProps,
  SectionErrorBoundaryState
> {
  state: SectionErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): SectionErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`[SectionErrorBoundary] ${this.props.name}:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="py-32 md:py-48 text-center bg-forge-black">
          <p className="text-forge-gray font-body text-sm tracking-wider">
            该区域加载失败，请
            <button
              type="button"
              onClick={() => this.setState({ hasError: false })}
              className="text-forge-orange hover:text-forge-orange/80 underline underline-offset-4 mx-1 transition-colors"
            >
              点击重试
            </button>
          </p>
        </section>
      );
    }

    return this.props.children;
  }
}
