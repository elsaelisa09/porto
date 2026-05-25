import { type MouseEvent } from "react";
import { PRIMARY_EMAIL_MAILTO, CV_PREVIEW_ROUTE } from "../constants/contact";

const FOOTER_SCROLL_OFFSET = 96;
const MOBILE_FOOTER_MEDIA_QUERY = "(max-width: 767px)";

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

    const behavior = window.matchMedia(MOBILE_FOOTER_MEDIA_QUERY).matches
      ? "auto"
      : "smooth";
    window.scrollTo({ top: targetTop, behavior });

    if (window.location.hash !== `#${id}`) {
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <footer className="bg-white px-4 pb-8 sm:px-6 sm:pb-10">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-[32px] bg-slate-950 px-8 py-12 sm:rounded-[40px] sm:px-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Left Side: Branding & CTA */}
          <div className="flex flex-col items-start gap-8">
            <a
              href="#home"
              onClick={(event) => handleSectionClick(event, "home")}
              className="font-marvel text-4xl font-bold uppercase tracking-[0.3em] text-white transition-opacity hover:opacity-80"
            >
              Elsa.
            </a>
            <p className="max-w-md font-poppins text-sm leading-relaxed tracking-wide text-slate-400 sm:text-base">
              Crafting digital experiences at the intersection of human-centered design and AI engineering. Available for global collaborations.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                onClick={(event) => handleSectionClick(event, "contact")}
                className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-slate-200"
              >
                <span className="font-poppins uppercase tracking-widest text-[10px]">Get in Touch</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Side: Links Grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div className="flex flex-col gap-4">
              <h4 className="font-marvel text-xs font-bold uppercase tracking-[0.3em] text-slate-500">Navigation</h4>
              <nav className="flex flex-col gap-3 font-poppins text-sm tracking-wide text-slate-300">
                <a href="#projects" onClick={(event) => handleSectionClick(event, "projects")} className="transition-colors hover:text-white">Projects</a>
                <a href="#highlights" onClick={(event) => handleSectionClick(event, "highlights")} className="transition-colors hover:text-white">Highlights</a>
                <a href="#contact" onClick={(event) => handleSectionClick(event, "contact")} className="transition-colors hover:text-white">Contact</a>
              </nav>
            </div>
            
            <div className="flex flex-col gap-4">
              <h4 className="font-marvel text-xs font-bold uppercase tracking-[0.3em] text-slate-500">Resources</h4>
              <nav className="flex flex-col gap-3 font-poppins text-sm tracking-wide text-slate-300">
                <a href={CV_PREVIEW_ROUTE} className="transition-colors hover:text-white">Curriculum Vitae</a>
                <a href="/calendar" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Schedule</a>
              </nav>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-marvel text-xs font-bold uppercase tracking-[0.3em] text-slate-500">Connect</h4>
              <nav className="flex flex-col gap-3 font-poppins text-sm tracking-wide text-slate-300">
                <a href="https://linkedin.com/in/elsaelisa" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">LinkedIn</a>
                <a href="https://github.com/elsaelisa" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">GitHub</a>
                <a href="https://instagram.com/elsaelisa" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Instagram</a>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-24">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <p className="font-poppins text-[10px] tracking-widest text-slate-500 uppercase">
              © {year} Elsa Elisa Yohana Sianturi. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6 font-poppins text-[10px] uppercase tracking-[0.2em] text-slate-500">
              <span className="cursor-default">Lampung, Indonesia</span>
              <div className="h-1 w-1 rounded-full bg-slate-700" />
              <span className="cursor-default">Informatics Engineering</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
