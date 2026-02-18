import { useState } from "react";
import SectionWrapper from "../components/SectionWrapper";

const highlightsData = [
  {
    id: 1,
    text: 'Winner 1 "Desa Energi Berdikari" Project (Team) - Pertamina Foundation 2024 - 2026',
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=1600&fit=crop",
  },
  {
    id: 2,
    text: "Teaching Assistant | Interaction Design - ITERA 2025",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=1600&fit=crop",
  },
  {
    id: 3,
    text: "Head of Academic & Scholarship Division - Himpunan Mahasiswa Informatika ITERA 2025",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=1600&fit=crop",
  },
  {
    id: 4,
    text: "Internship | AI Engineering (RAG System) - PT Pertamina Hulu Rokan 2025",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&h=1600&fit=crop",
  },
  {
    id: 5,
    text: "Sobat Bumi Scholarship Recipient - Pertamina Foundation 2024 - 2025",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=1600&fit=crop",
  },
  {
    id: 6,
    text: "2nd Place UI/UX Competition (Team) - Himpunan Mahasiswa Informatika ITERA 2024",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=1600&fit=crop",
  },
  {
    id: 7,
    text: "Speaker | IFGTPB 2024 Scholarship Session - Himpunan Mahasiswa Informatika ITERA 2024",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&h=1600&fit=crop",
  },
  {
    id: 8,
    text: "Secretary | Information Technology Division - KM ITERA 2024",
    image:
      "https://images.unsplash.com/photo-1485217988980-11786ced9454?w=1200&h=1600&fit=crop",
  },
  {
    id: 9,
    text: "Teaching Assistant | Introduction to Computers and Software - ITERA 2023",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=1600&fit=crop",
  },
];

const Highlights = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isListHovered, setIsListHovered] = useState(false);

  return (
    <SectionWrapper
      id="highlights"
      title={
        <span className="flex w-full items-center justify-start gap-12 xl:mb-16">
          <span className="font-light tracking-[0.2em]">Highlights</span>
        </span>
      }
      sectionClassName="-mt-24"
      containerClassName="max-w-6xl"
      contentClassName="max-w-none"
      titleClassName="font-chathura font-light uppercase text-slate-900 text-[20px] sm:text-[22px] lg:text-[90px]"
        >
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_390px]">
        <div
          onMouseEnter={() => setIsListHovered(true)}
          onMouseLeave={() => setIsListHovered(false)}
        >
          {highlightsData.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={item.id}
                type="button"
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className={`w-full py-2 text-left font-chathura text-[28px] leading-[1.05] transition-[color,opacity] duration-300 ease-out sm:text-[28px] lg:text-[32px] ${
                  isActive ? "text-slate-900" : "text-slate-600"
                } ${isListHovered && !isActive ? "opacity-60" : "opacity-100"}`}
              >
                <span
                  className={`inline-block origin-left border-b border-slate-300 pb-1 transition-transform duration-300 ease-out ${
                    isActive ? "scale-[1.03]" : "scale-100"
                  }`}
                >
                  {item.text}
                </span>
              </button>
            );
          })}
        </div>

        <div className="lg:sticky lg:top-28">
          <div className="relative mx-auto aspect-[5/6] w-full max-w-[390px] overflow-hidden rounded-[34px] border border-slate-200 bg-slate-100">
            {highlightsData.map((item, index) => (
              <img
                key={item.id}
                src={item.image}
                alt={item.text}
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  index === activeIndex
                    ? "scale-100 opacity-100"
                    : "scale-105 opacity-0"
                }`}
              />
            ))}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/10" />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Highlights;
