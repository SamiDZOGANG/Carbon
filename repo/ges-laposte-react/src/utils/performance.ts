// Performance utility functions

/**
 * Debounce function to limit the rate of function calls
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
};

/**
 * Throttle function to limit function calls to once per specified time
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Lazy loading utility for components
 */
export const loadComponent = (componentName: 'Home' | 'Tool' | 'Results' | 'Environment' | 'About' | 'FAQ') => {
  switch (componentName) {
    case 'Home':
      return import('../pages/Home/Home');
    case 'Tool':
      return import('../pages/Tool/StepBasedTool');
    case 'Results':
      return import('../pages/Results/Results');
    case 'Environment':
      return import('../pages/Environment/Environment');
    case 'About':
      return import('../pages/About/About');
    case 'FAQ':
      return import('../pages/FAQ/FAQ');
    default:
      throw new Error(`Unknown component: ${componentName}`);
  }
};

/**
 * Format number for better performance in displays
 */
export const formatNumber = (num: number, decimals: number = 2): string => {
  if (num === 0) return '0.00';
  if (num < 0.01 && num > 0) return '< 0.01';
  return num.toFixed(decimals);
};

/**
 * Memoized calculation cache
 */
const calculationCache = new Map<string, any>();

export const memoize = <T extends (...args: any[]) => any>(
  fn: T,
  keyGenerator?: (...args: Parameters<T>) => string
): T => {
  return ((...args: Parameters<T>) => {
    const key = keyGenerator ? keyGenerator(...args) : JSON.stringify(args);
    
    if (calculationCache.has(key)) {
      return calculationCache.get(key);
    }
    
    const result = fn(...args);
    calculationCache.set(key, result);
    
    // Clear cache if it gets too large
    if (calculationCache.size > 100) {
      const firstKey = calculationCache.keys().next().value;
      calculationCache.delete(firstKey);
    }
    
    return result;
  }) as T;
};

/**
 * Virtual scrolling utility for large lists
 */
export const useVirtualScrolling = (
  itemCount: number,
  itemHeight: number,
  containerHeight: number,
  scrollTop: number
) => {
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    itemCount
  );
  
  return {
    startIndex: Math.max(0, startIndex),
    endIndex,
    visibleItems: endIndex - startIndex,
    offsetY: startIndex * itemHeight,
  };
};

/**
 * Intersection Observer utility for lazy loading
 */
export const createIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
) => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    ...options,
  };
  
  return new IntersectionObserver(callback, defaultOptions);
};