import { useEffect } from "react";

const EASING = 0.1;
const STOP_THRESHOLD = 0.1;
const MOBILE_SCROLL_MEDIA_QUERY = "(max-width: 1023px)";

const useSmoothScroll = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobileViewport = window.matchMedia(
      MOBILE_SCROLL_MEDIA_QUERY
    ).matches;

    if (prefersReducedMotion || isMobileViewport) return;

    const wrapper = document.getElementById("smooth-scroll-wrapper");
    const content = document.getElementById("smooth-scroll-content");
    if (!wrapper || !content) return;

    let currentY = window.scrollY;
    let targetY = window.scrollY;
    let rafId = 0;
    let resizeObserver: ResizeObserver | null = null;

    const html = document.documentElement;
    const body = document.body;
    const previousScrollBehavior = html.style.scrollBehavior;
    const previousBodyHeight = body.style.height;
    const previousWrapperPosition = wrapper.style.position;
    const previousWrapperInset = wrapper.style.inset;
    const previousWrapperOverflow = wrapper.style.overflow;
    const previousWrapperWidth = wrapper.style.width;
    const previousContentWillChange = content.style.willChange;
    const previousContentTransform = content.style.transform;

    const getContentHeight = () =>
      Math.ceil(content.getBoundingClientRect().height);

    const syncBodyHeight = () => {
      body.style.height = `${getContentHeight()}px`;
    };

    const onScroll = () => {
      targetY = window.scrollY;
    };

    const onResize = () => {
      syncBodyHeight();
      const maxScroll = Math.max(0, getContentHeight() - window.innerHeight);
      targetY = Math.min(targetY, maxScroll);
      currentY = Math.min(currentY, maxScroll);
    };

    const animate = () => {
      const delta = targetY - currentY;
      currentY += delta * EASING;

      if (Math.abs(delta) < STOP_THRESHOLD) {
        currentY = targetY;
      }

      content.style.transform = `translate3d(0, ${-currentY}px, 0)`;
      rafId = window.requestAnimationFrame(animate);
    };

    html.style.scrollBehavior = "auto";

    wrapper.style.position = "fixed";
    wrapper.style.inset = "0";
    wrapper.style.overflow = "hidden";
    wrapper.style.width = "100%";

    content.style.willChange = "transform";
    content.style.transform = `translate3d(0, ${-currentY}px, 0)`;

    syncBodyHeight();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(content);
    }

    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      resizeObserver?.disconnect();

      html.style.scrollBehavior = previousScrollBehavior;
      body.style.height = previousBodyHeight;

      wrapper.style.position = previousWrapperPosition;
      wrapper.style.inset = previousWrapperInset;
      wrapper.style.overflow = previousWrapperOverflow;
      wrapper.style.width = previousWrapperWidth;

      content.style.willChange = previousContentWillChange;
      content.style.transform = previousContentTransform;
    };
  }, []);
};

export default useSmoothScroll;
