import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import SectionWrapper from "../components/SectionWrapper";
import posterDebImage from "../assets/Poster-DEB.png";
import highlightsInteractionDesignImage from "../assets/highlights-Interaction-design.png";
import headOfScholarshipsDivisionsImage from "../assets/head-of-scholarships-divisions.png";
import internshipPhrImage from "../assets/internship-PHR.png";
import sobatBumiRecipientsImage from "../assets/sobatbumi-recipients.png";
import secondPlaceUiUxCompetitionImage from "../assets/2nd-place-UIUX-competition.png";
import speakersIfgtpbImage from "../assets/speakers-ifgtpb.png";

const highlightsData = [
  {
    id: 1,
    title: 'Winner| "Desa Energi Berdikari" Project (Team)',
    organization: "Pertamina Foundation",
    period: "2024 - 2026",
    image: posterDebImage,
  },
  {
    id: 2,
    title: "Teaching Assistant | Interaction Design",
    organization: "ITERA",
    period: "2025",
    image: highlightsInteractionDesignImage,
  },
  {
    id: 3,
    title: "Head of Academic & Scholarship Division",
    organization: "Himpunan Mahasiswa Informatika ITERA",
    period: "2025",
    image: headOfScholarshipsDivisionsImage,
  },
  {
    id: 4,
    title: "Internship | AI Engineering (RAG System)",
    organization: "PT Pertamina Hulu Rokan",
    period: "2025",
    image: internshipPhrImage,
  },
  {
    id: 5,
    title: "Sobat Bumi Scholarship Recipient",
    organization: "Pertamina Foundation",
    period: "2024 - 2025",
    image: sobatBumiRecipientsImage,
  },
  {
    id: 6,
    title: "2nd Place| UI/UX Competition (Team)",
    organization: "Himpunan Mahasiswa Informatika ITERA",
    period: "2024",
    image: secondPlaceUiUxCompetitionImage,
  },
  {
    id: 7,
    title: "Speaker | IFGTPB 2024 Scholarship Session",
    organization: "Himpunan Mahasiswa Informatika ITERA",
    period: "2024",
    image: speakersIfgtpbImage,
  },
  {
    id: 8,
    title: "Secretary | Information Technology Division",
    organization: "KM ITERA",
    period: "2024",
    image:
      "https://images.unsplash.com/photo-1485217988980-11786ced9454?w=1200&h=1600&fit=crop",
  },
  {
    id: 9,
    title: "Teaching Assistant | Introduction to Computers and Software",
    organization: "ITERA",
    period: "2023",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=1600&fit=crop",
  },
];

const Highlights = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isListHovered, setIsListHovered] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const mediaColumnRef = useRef<HTMLDivElement | null>(null);
  const [listHeight, setListHeight] = useState(0);
  const [mediaMode, setMediaMode] = useState<"inline" | "fixed" | "bottom">(
    "inline",
  );
  const [fixedLayout, setFixedLayout] = useState({ left: 0, width: 360 });
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const activePreviewIndex = hoveredIndex ?? selectedIndex;

  useEffect(() => {
    if (typeof window === "undefined") return;

    setPortalTarget(
      document.getElementById("smooth-scroll-wrapper") ?? document.body,
    );

    const topOffset = 112;
    let rafId = 0;

    const updateLayout = () => {
      const listEl = listRef.current;
      const mediaEl = mediaColumnRef.current;
      if (!listEl || !mediaEl) return;

      const nextListHeight = Math.ceil(listEl.getBoundingClientRect().height);
      setListHeight((prev) => (prev === nextListHeight ? prev : nextListHeight));

      if (window.innerWidth < 1024) {
        setMediaMode((prev) => (prev === "inline" ? prev : "inline"));
        return;
      }

      const listRect = listEl.getBoundingClientRect();
      const mediaRect = mediaEl.getBoundingClientRect();
      const cardHeight = mediaRect.width * 1.25; // aspect-[4/5]

      const isBeforeStart = listRect.top > topOffset;
      const isAfterEnd = listRect.bottom <= topOffset + cardHeight;
      const nextMode = isBeforeStart
        ? "inline"
        : isAfterEnd
          ? "bottom"
          : "fixed";

      setMediaMode((prev) => (prev === nextMode ? prev : nextMode));

      const nextLeft = Math.round(mediaRect.left);
      const nextWidth = Math.round(mediaRect.width);
      setFixedLayout((prev) =>
        prev.left === nextLeft && prev.width === nextWidth
          ? prev
          : { left: nextLeft, width: nextWidth },
      );
    };

    const loop = () => {
      updateLayout();
      rafId = window.requestAnimationFrame(loop);
    };

    loop();
    window.addEventListener("resize", updateLayout);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updateLayout);
    };
  }, []);

  const previewPanel = (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[360px] overflow-hidden rounded-[30px] border border-slate-200 bg-slate-100 lg:max-w-[360px]">
      {highlightsData.map((item, index) => (
        <img
          key={item.id}
          src={item.image}
          alt={item.title}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            index === activePreviewIndex
              ? "scale-100 opacity-100"
              : "scale-105 opacity-0"
          }`}
        />
      ))}
    </div>
  );

  return (
    <SectionWrapper
      id="highlights"
      title={
        <span className="inline-flex items-center font-light tracking-[0.18em]">
          Highlights
        </span>
      }
      sectionClassName=""
      containerClassName="max-w-6xl"
      contentClassName="max-w-none"
      titleClassName="font-chathura uppercase text-slate-900 text-[24px] sm:text-[28px] lg:text-[58px] leading-[0.9]"
    >
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
        <div
          ref={listRef}
          onMouseEnter={() => setIsListHovered(true)}
          onMouseLeave={() => {
            setIsListHovered(false);
            setHoveredIndex(null);
          }}
          className="divide-y divide-slate-200"
        >
          {highlightsData.map((item, index) => {
            const isSelected = index === selectedIndex;
            const isHovered = index === hoveredIndex;
            const isEmphasized = isSelected || isHovered;

            return (
              <button
                key={item.id}
                type="button"
                onMouseEnter={() => setHoveredIndex(index)}
                onFocus={() => setHoveredIndex(index)}
                onBlur={() => setHoveredIndex(null)}
                onClick={() => setSelectedIndex(index)}
                className="w-full py-1 text-left"
                aria-label={`${item.title} - ${item.organization} ${item.period}`}
              >
                <div
                  className={`grid grid-cols-[42px_1fr] items-start gap-4 rounded-xl px-2 py-3 transition-[background-color,opacity] duration-300 sm:grid-cols-[52px_1fr] ${
                    isSelected ? "bg-slate-50" : "bg-transparent"
                  } ${
                    isListHovered && !isSelected && !isHovered
                      ? "opacity-60"
                      : "opacity-100"
                  }`}
                >
                  <span
                    className={`pt-[2px] font-chathura text-[30px] leading-none tracking-[0.16em] transition-colors duration-300 sm:text-[34px] ${
                      isEmphasized ? "text-slate-900" : "text-slate-400"
                    }`}
                  >
                    {String(item.id).padStart(2, "0")}
                  </span>

                  <div className="min-w-0 py-1">
                    <p
                      className={`font-poppins text-[13px] leading-[1.45] tracking-[0.06em] transition-colors duration-300 sm:text-[14px] lg:text-[15px] ${
                        isEmphasized ? "text-slate-900" : "text-slate-700"
                      }`}
                    >
                      {item.title}
                    </p>
                    <p
                      className={`mt-1 font-poppins text-[11px] uppercase tracking-[0.05em] transition-colors duration-300 sm:text-[12px] ${
                        isEmphasized ? "text-slate-600" : "text-slate-500"
                      }`}
                    >
                      {item.organization}
                      <span className="mx-2 text-slate-400">/</span>
                      {item.period}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="lg:hidden">{previewPanel}</div>

        <div
          ref={mediaColumnRef}
          className="relative hidden lg:block"
          style={listHeight > 0 ? { height: `${listHeight}px` } : undefined}
        >
          {mediaMode === "inline" && (
            <div className="absolute left-0 top-0 w-full">{previewPanel}</div>
          )}
          {mediaMode === "bottom" && (
            <div className="absolute bottom-0 left-0 w-full">{previewPanel}</div>
          )}
          <div aria-hidden className="aspect-[4/5] w-full" />
        </div>
      </div>

      {mediaMode === "fixed" &&
        portalTarget &&
        createPortal(
          <div
            className="fixed z-20"
            style={{
              top: 112,
              left: fixedLayout.left,
              width: fixedLayout.width,
            }}
          >
            {previewPanel}
          </div>,
          portalTarget,
        )}
    </SectionWrapper>
  );
};

export default Highlights;
