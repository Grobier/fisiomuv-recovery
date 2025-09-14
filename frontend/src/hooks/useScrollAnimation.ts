import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -100px 0px',
    triggerOnce = true
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // Fallback: mostrar después de 2 segundos si IntersectionObserver falla
    const fallbackTimer = setTimeout(() => {
      if (!isVisible) {
        setIsVisible(true);
      }
    }, 2000);

    // Verificar si IntersectionObserver está disponible
    if (!window.IntersectionObserver) {
      setIsVisible(true);
      clearTimeout(fallbackTimer);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          clearTimeout(fallbackTimer);
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      clearTimeout(fallbackTimer);
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, triggerOnce, isVisible]);

  return { ref, isVisible };
};
