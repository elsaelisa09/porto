import { type MouseEvent } from "react";
import { PRIMARY_EMAIL_MAILTO } from "../constants/contact";

const FOOTER_SCROLL_OFFSET = 96;

const Footer = () => {
  const year = new Date().getFullYear();

  const handleSectionClick = (
    event: MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    const targetTop = Math.max(
      0,
      target.getBoundingClientRect().top +
        window.scrollY -
        FOOTER_SCROLL_OFFSET,
    );

    window.scrollTo({ top: targetTop, behavior: "smooth" });

    if (window.location.hash !== `#${id}`) {
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <footer className="bg-white px-4 sm:px-6 pb-0 mb-0">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-[24px] border border-white/10 bg-black px-7 py-9 sm:rounded-[28px] sm:px-8 sm:py-10 lg:rounded-[34px] lg:py-11">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <a
              href="#home"
              onClick={(event) => handleSectionClick(event, "home")}
              className="font-marvel text-2xl font-bold uppercase tracking-[0.28em] text-slate-100"
            >
              Portfolio
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-poppins text-[11px] sm:text-sm uppercase tracking-[0.12em] text-slate-400">
            <a
              href="#projects"
              onClick={(event) => handleSectionClick(event, "projects")}
              className="transition-colors hover:text-white"
            >
              Projects
            </a>
            <a
              href="#highlights"
              onClick={(event) => handleSectionClick(event, "highlights")}
              className="transition-colors hover:text-white"
            >
              Highlights
            </a>
            <a
              href="#contact"
              onClick={(event) => handleSectionClick(event, "contact")}
              className="transition-colors hover:text-white"
            >
              Contact
            </a>
            <a
              href={PRIMARY_EMAIL_MAILTO}
              className="underline decoration-1 underline-offset-4 transition-colors hover:text-white"
            >
              Email Me
            </a>
          </div>
        </div>

        <div className="mt-6 border-t border-white/15 pt-5 font-poppins text-xs  tracking-[0.14em] text-slate-500 sm:flex sm:items-center sm:justify-between">
          <p>{year} Elsa Elisa Yohana Sianturi</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
