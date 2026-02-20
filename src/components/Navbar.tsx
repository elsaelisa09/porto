import { useEffect, useState, type MouseEvent } from "react";

const NAV_SCROLL_OFFSET = 96;

const navItems = [
  { id: "home", label: "[ Home ]" },
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

    let ticking = false;

    const syncActiveSection = () => {
      const marker = window.scrollY + 180;
      const current =
        sections
          .filter((section) => marker >= section.offsetTop)
          .at(-1)?.id ?? sections[0].id;

      setActiveId((prev) => (prev === current ? prev : current));
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(syncActiveSection);
    };

    syncActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", syncActiveSection);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", syncActiveSection);
    };
  }, []);

  const handleMenuClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
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
      target.getBoundingClientRect().top + window.scrollY - NAV_SCROLL_OFFSET,
    );

    setActiveId(id);
    window.scrollTo({ top: targetTop, behavior: "smooth" });

    if (window.location.hash !== `#${id}`) {
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur transition-colors">
      <nav className="mx-auto flex min-h-16 max-w-6xl items-center px-6 py-3 font-marvel">
        <a
          href="#home"
          onClick={(event) => handleMenuClick(event, "home")}
          className="text-xl font-bold uppercase tracking-[0.3em] text-slate-900 transition-colors"
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
                onClick={(event) => handleMenuClick(event, item.id)}
                aria-current={isActive ? "page" : undefined}
                className={`transition-colors ${
                  isActive
                    ? "text-slate-900"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <span
                  className={`border-b-2 pb-1 transition-colors ${
                    isActive ? "border-slate-900" : "border-transparent"
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
              onClick={(event) => handleMenuClick(event, contactItem.id)}
              aria-current={activeId === contactItem.id ? "page" : undefined}
              className={`group inline-flex items-center gap-2 transition-colors ${
                activeId === contactItem.id
                  ? "text-slate-900"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <span
                className={`border-b-2 pb-1 transition-colors ${
                  activeId === contactItem.id
                    ? "border-slate-900"
                    : "border-transparent"
                }`}
              >
                {contactItem.label}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.6"
                stroke="currentColor"
                className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-45"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25"
                />
              </svg>
            </a>
          </div>
        ) : null}
      </nav>
    </header>
  );
};

export default Navbar;
