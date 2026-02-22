import { useEffect, useRef, useState } from "react";

export const useScrollAnimation = (threshold: number = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isMobileViewport = window.matchMedia("(max-width: 767px)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible((prev) => {
          if (isMobileViewport) {
            // On mobile, keep elements visible after first reveal to prevent
            // content from disappearing too quickly while scrolling.
            return prev || entry.isIntersecting;
          }

          return entry.isIntersecting;
        });
      },
      {
        threshold: isMobileViewport ? Math.min(threshold, 0.05) : threshold,
        rootMargin: isMobileViewport
          ? "0px 0px -20px 0px"
          : "0px 0px -100px 0px",
      },
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
};
