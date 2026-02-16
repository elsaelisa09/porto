import { useEffect, useState } from "react";

const navItems = [
  { id: "home", label: "[ Home ]" },
  { id: "about", label: "[ About ]" },
  { id: "projects", label: "[ Projects ]" },
  { id: "highlights", label: "[ Highlights ]" },
  { id: "contact", label: "Contact Me" },
];

const Navbar = () => {
  const [activeId, setActiveId] = useState("home");
  const centerItems = navItems.filter((item) => item.id !== "contact");
  const contactItem = navItems.find((item) => item.id === "contact");

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0.1,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const isAboutSection = activeId === "about";

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b backdrop-blur transition-colors ${
        isAboutSection
          ? "border-gray-800 bg-transparent"
          : "border-slate-100 bg-white/80"
      }`}
    >
      <nav className="mx-auto flex min-h-16 max-w-6xl items-center px-6 py-3 font-marvel">
        <a
          href="#home"
          className={`text-xl font-bold uppercase tracking-[0.3em] transition-colors ${
            isAboutSection ? "text-white" : "text-slate-900"
          }`}
        >
          Portfolio
        </a>
        <div className="flex flex-1 items-center justify-center gap-4 text-lg font-medium sm:gap-6 sm:text-xl">
          {centerItems.map((item) => {
            const isActive = activeId === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "page" : undefined}
                className={`transition-colors ${
                  isAboutSection
                    ? isActive
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                    : isActive
                      ? "text-slate-900"
                      : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <span
                  className={`border-b-2 pb-1 transition-colors ${
                    isAboutSection
                      ? isActive
                        ? "border-white"
                        : "border-transparent"
                      : isActive
                        ? "border-slate-900"
                        : "border-transparent"
                  }`}
                >
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
        {contactItem ? (
          <div className="flex shrink-0 items-center text-lg font-bold sm:text-xl">
            <a
              href={`#${contactItem.id}`}
              aria-current={activeId === contactItem.id ? "page" : undefined}
              className={`transition-colors ${
                isAboutSection
                  ? activeId === contactItem.id
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                  : activeId === contactItem.id
                    ? "text-slate-900"
                    : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <span
                className={`border-b-2 pb-1 transition-colors ${
                  isAboutSection
                    ? activeId === contactItem.id
                      ? "border-white"
                      : "border-transparent"
                    : activeId === contactItem.id
                      ? "border-slate-900"
                      : "border-transparent"
                }`}
              >
                {contactItem.label}
              </span>
            </a>
          </div>
        ) : null}
      </nav>
    </header>
  );
};

export default Navbar;
