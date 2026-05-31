import { Suspense, useState, useEffect, useRef, type ComponentType, type LazyExoticComponent } from 'react';

interface LazyVisibleSectionProps {
  /** 模块顶层通过 React.lazy() 预创建的组件 */
  component: LazyExoticComponent<ComponentType<Record<string, never>>>;
  fallback?: React.ReactNode;
  rootMargin?: string;
}

/**
 * 滚动到可见区域时才渲染 lazy 组件，减少首屏 JS 体积。
 * lazy() 调用位于模块顶层（符合 React 规则），本组件仅控制渲染时机。
 */
export function LazyVisibleSection({
  component: LazyComponent,
  fallback,
  rootMargin = '300px',
}: LazyVisibleSectionProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  if (!shouldLoad) {
    return <div ref={ref}>{fallback ?? <div className="h-96 bg-forge-black" />}</div>;
  }

  return (
    <Suspense fallback={fallback ?? <div className="h-96 bg-forge-black" />}>
      <LazyComponent />
    </Suspense>
  );
}
