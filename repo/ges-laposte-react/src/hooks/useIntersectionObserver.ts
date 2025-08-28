import { useEffect, RefObject } from 'react';

export const useIntersectionObserver = (
  ref: RefObject<Element | null>,
  callback: (isIntersecting: boolean) => void,
  options?: IntersectionObserverInit
) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        callback(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '0px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, callback, options]);
};