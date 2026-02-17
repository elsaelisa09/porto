import type { ReactNode } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

type SectionWrapperProps = {
  id: string;
  title: string | ReactNode;
  children: ReactNode;
  containerClassName?: string;
  contentClassName?: string;
  sectionClassName?: string;
  titleClassName?: string;
};

const SectionWrapper = ({
  id,
  title,
  children,
  containerClassName = "",
  contentClassName = "",
  sectionClassName = "",
  titleClassName = "",
}: SectionWrapperProps) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id={id}
      className={`min-h-screen w-full scroll-mt-24 ${sectionClassName}`}
    >
      <div
        ref={ref}
        className={`mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-6 py-24 transition-all duration-700 md:py-32 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        } ${containerClassName}`}
      >
        <h2
          className={`text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl ${titleClassName}`}
        >
          {title}
        </h2>

        <div
          className={`w-full text-base leading-relaxed text-slate-600 ${contentClassName}`}
        >
          {children}
        </div>
      </div>
    </section>
  );
};

export default SectionWrapper;
