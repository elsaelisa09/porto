import type { ReactNode } from "react";

type SectionWrapperProps = {
  id: string;
  title: string;
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
  return (
  <section
    id={id}
    className={`min-h-screen w-full scroll-mt-24 ${sectionClassName}`}
  >
    <div
      className={`mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-6 py-24 md:py-32 ${containerClassName}`}
    >
      <h2
        className={`text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl ${titleClassName}`}
      >
        {title}
      </h2>

      <div className={`w-full text-base leading-relaxed text-slate-600 ${contentClassName}` }>
        {children}
      </div>
    </div>
  </section>

  );
};

export default SectionWrapper;
