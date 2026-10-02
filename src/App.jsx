import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

// Focus areas data for About Me page
const FOCUS_AREAS = [
  {
    id: "analytics",
    title: "Data Analytics & Insights",
    description:
      "I transform raw and complex datasets into interactive dashboards and actionable insights to drive informed business decisions",
    tags: ["Business Intelligence", "Data Visualization", "KPI Analysis"],
  },
  {
    id: "engineering",
    title: "Data Engineering & Pipelines",
    description:
      "design and build reliable data pipelines and staging workflows to ensure data quality, consistency, and accessibility across organizations",
    tags: [
      "Data Architecture",
      "ETL Pipelines",
      "Data Quality",
      "Database Management",
    ],
  },
  {
    id: "aiml",
    title: "AI & Machine Learning",
    description:
      "develop predictive models and intelligent systems, leveraging techniques like Deep Learning and RAG to solve complex analytical problems",
    tags: ["Machine Learning", "Predictive Modeling", "Deep Learning"],
  },
];

const TOOLKIT_ITEMS = [
  { name: "Microsoft Power BI", image: "/powerbi-logo.png" },
  { name: "Python", image: "/python-logo.png" },
  { name: "PyTorch", image: "/pytorch-logo.png" },
  { name: "Microsoft Excel", image: "/excel-logo.png" },
  { name: "SQL", image: "/sql-logo.png" },
  { name: "Git", image: "/git-logo.png" },
];

const PROJECT_ITEMS = Array.from({ length: 8 }, (_, index) => ({
  id: `project-${index + 1}`,
  title: "Ini adalah contoh Judul Project Dummy",
  tech: "Python, SQL, Ms. Excel",
  role: "Data Analyst",
}));

const EXPERIENCE_ITEMS = [
  {
    id: "ai-engineering-intern",
    title: "AI Engineering Intern",
    organization: "PT Pertamina Hulu Rokan",
    period: "Jun 2025 – Jul 2025",
    description:
      "Developed a document retrieval system using Retrieval-Augmented Generation (RAG) and evaluated AI-generated answers, achieving 76% accuracy",
  },
  {
    id: "teaching-assistant",
    title: "Teaching Assistant",
    organization: "UPA TIK ITERA",
    period: "Aug 2023 – Jun 2026",
    description:
      "Supported students through practical sessions, technical guidance, and structured learning materials for applied computing coursework.",
  },
  {
    id: "academic-scholarships",
    title: "Head of Academic & Scholarships",
    organization: "HMIF ITERA",
    period: "Jan 2025 – Dec 2025",
    description:
      "Coordinated academic programs and scholarship information while helping students access relevant development opportunities.",
  },
  {
    id: "desa-energi-berdikari",
    title: "Secretary of Desa Energi Berdikari",
    organization: "Sobat Bumi Lampung",
    period: "Nov 2024 – May 2026",
    description:
      "Managed administrative records, schedules, and team communications for community energy and sustainability initiatives.",
  },
];

const AWARD_ITEMS = [
  {
    label: "Pertamina Sobat Bumi Scholarship – 2024",
    quote:
      "Selected as one of 14 scholarship recipients at the Sumatera Institute of Technology, outperforming over 500 applicants based on academic excellence and environmental contributions",
    image: "/add1.jpg",
    alt: "Graduation cap and academic documents",
  },
  {
    label: "2nd Place Winner, UI/UX Competition – 2024",
    quote:
      "Won 2nd Place in the Point Project 2.0 UI/UX competition, showcasing strong capabilities in user-centered interface design and problem-solving",
    image: "/add2.png",
    alt: "Mobile app interface design on a smartphone",
  },
];

const AWARD_SLIDES = [
  AWARD_ITEMS[AWARD_ITEMS.length - 1],
  ...AWARD_ITEMS,
  AWARD_ITEMS[0],
];

// Reusable Mosaic Bar component
function MosaicBar({ label, onClick, id, dark, footer }) {
  const COLS = 3;
  const ROWS = 36;
  const tiles = Array.from({ length: COLS * ROWS }).map((_, i) => {
    const row = Math.floor(i / COLS);
    const col = i % COLS;
    const rowFromBottom = ROWS - 1 - row;
    const jitter = ((col * 13 + row * 7) % 4) * 12;
    return {
      key: i,
      delayUp: rowFromBottom * 11 + jitter,
      delayDown: row * 6 + col * 8,
    };
  });

  return (
    <aside
      className={`left-fixed-bar${dark ? " left-fixed-bar--dark" : ""}${footer ? " left-fixed-bar--footer" : ""}`}
      aria-label="Quick Actions"
      onClick={onClick}
    >
      <div className="mosaic-container" aria-hidden="true">
        {tiles.map(({ key, delayUp, delayDown }) => (
          <span
            key={key}
            className="mosaic-tile"
            style={{
              "--delay-up": `${delayUp}ms`,
              "--delay-down": `${delayDown}ms`,
            }}
          />
        ))}
      </div>
      <button className="reach-out-btn" onClick={onClick} id={id} title={label}>
        {label}
      </button>
    </aside>
  );
}

function App() {
  const [isReachOutOpen, setIsReachOutOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeSection, setActiveSection] = useState("hero"); // 'hero' | 'about'
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [expandedFocus, setExpandedFocus] = useState(null);
  const [expandedExperience, setExpandedExperience] = useState(null);
  const [activeAward, setActiveAward] = useState(1);
  const [isAwardTransitionEnabled, setIsAwardTransitionEnabled] =
    useState(true);
  const [isAwardAnimating, setIsAwardAnimating] = useState(false);
  const [heroScrollProgress, setHeroScrollProgress] = useState(0);
  const [toolkitScrollProgress, setToolkitScrollProgress] = useState(0);
  const [experienceScrollProgress, setExperienceScrollProgress] = useState(0);
  const [awardsScrollProgress, setAwardsScrollProgress] = useState(0);
  const [footerScrollProgress, setFooterScrollProgress] = useState(0);

  // Track which sections have been animated
  const [animatedSections, setAnimatedSections] = useState({
    hero: true, // Hero langsung terlihat
    about: false,
    toolkit: false,
    experience: false,
    awards: false,
    footer: false,
  });

  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const toolkitRef = useRef(null);
  const experienceRef = useRef(null);
  const awardsRef = useRef(null);
  const footerRef = useRef(null);

  // Intersection observer: detect which section is in view
  useEffect(() => {
    const options = { root: null, threshold: 0.1 };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("data-section");
        if (!id) return;

        setAnimatedSections((current) =>
          current[id] === entry.isIntersecting
            ? current
            : { ...current, [id]: entry.isIntersecting },
        );

        if (id === "footer") {
          setActiveSection((current) =>
            entry.isIntersecting
              ? "footer"
              : current === "footer"
                ? "about"
                : current,
          );
          return;
        }

        if (entry.isIntersecting) setActiveSection(id);
      });
    }, options);

    if (heroRef.current) observer.observe(heroRef.current);
    if (aboutRef.current) observer.observe(aboutRef.current);
    if (toolkitRef.current) observer.observe(toolkitRef.current);
    if (experienceRef.current) observer.observe(experienceRef.current);
    if (awardsRef.current) observer.observe(awardsRef.current);
    if (footerRef.current) observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isNavOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsNavOpen(false);
    };
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isNavOpen]);

  // Scroll animation for hero section
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate scroll progress (0 to 1)
        const progress = Math.max(
          0,
          Math.min(1, (windowHeight - rect.top) / windowHeight),
        );
        setHeroScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let scrollTimeout;

    const handleScrollState = () => {
      setIsScrolling(true);
      window.clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => setIsScrolling(false), 50);
    };

    window.addEventListener("scroll", handleScrollState, { passive: true });

    return () => {
      window.clearTimeout(scrollTimeout);
      window.removeEventListener("scroll", handleScrollState);
    };
  }, []);

  const handleReachOutClick = useCallback(() => setIsReachOutOpen(true), []);
  const handleCloseClick = useCallback(() => setIsReachOutOpen(false), []);

  // Handle email click
  const handleEmailClick = useCallback((e) => {
    e.preventDefault();
    window.location.href = "mailto:elsaelisayohana05@gmail.com";
  }, []);

  const isDark = activeSection !== "hero" && activeSection !== "footer";
  const isFooter = activeSection === "footer";

  return (
    <div className={`portfolio-container${isScrolling ? " is-scrolling" : ""}`}>
      {/* ===== FIXED LEFT BAR ===== */}
      <MosaicBar
        label="Reach Out"
        onClick={handleReachOutClick}
        id="reach-out-button"
        dark={isDark}
        footer={isFooter}
      />

      {/* ===== FIXED RIGHT NAME ===== */}
      <aside
        className={`right-fixed-name${isDark ? " right-fixed-name--dark" : ""}${isFooter ? " right-fixed-name--footer" : ""}`}
        aria-label="Author Name"
      >
        <span>Elsa Elisa Yohana Sianturi</span>
      </aside>

      <button
        type="button"
        className={`nav-toggle${isNavOpen ? " is-hidden" : ""}`}
        aria-label="Open navigation menu"
        aria-expanded={isNavOpen}
        onClick={() => setIsNavOpen(true)}
      >
        <img src="/iconpluss.png" alt="" aria-hidden="true" />
      </button>

      <div
        className={`nav-backdrop${isNavOpen ? " is-visible" : ""}`}
        aria-hidden="true"
        onClick={() => setIsNavOpen(false)}
      />

      <aside
        className={`nav-panel${isNavOpen ? " is-open" : ""}`}
        aria-label="Main navigation"
        aria-hidden={!isNavOpen}
      >
        <button
          type="button"
          className="nav-close"
          aria-label="Close navigation menu"
          onClick={() => setIsNavOpen(false)}
        >
          <img src="/iconpluss2.png" alt="" aria-hidden="true" />
        </button>
        <a
          href="mailto:elsaelisayohana05@gmail.com"
          className="nav-email"
          onClick={handleEmailClick}
        >
          @elsaelisayohana05@gmail.com
        </a>
        <nav className="nav-panel-links">
          <a href="#hero" onClick={() => setIsNavOpen(false)}>
            Home
          </a>
          <a href="#about" onClick={() => setIsNavOpen(false)}>
            About Me
          </a>
          <a href="#projects" onClick={() => setIsNavOpen(false)}>
            Projects
          </a>
          <a href="#experience" onClick={() => setIsNavOpen(false)}>
            Resume
          </a>
          <button
            type="button"
            onClick={() => {
              setIsNavOpen(false);
              setIsReachOutOpen(true);
            }}
          >
            Contacts
          </button>
        </nav>
        <span className="nav-panel-role">Data Scientist | Data Analyst</span>
      </aside>

      <div className="hero-about-stack">
        {/* ===== HERO PAGE ===== */}
        <main
          className={`hero-wrapper ${animatedSections.hero ? "animate-stack" : ""}`}
          ref={heroRef}
          data-section="hero"
          id="hero"
        >
          <div className="hero-role-badge">
            <span className="pipe-indicator" aria-hidden="true"></span>
            <span>Data Scientist | Data Analyst</span>
          </div>

          <div className="hero-content">
            <h1 className="hero-headline">
              <span>data-driven</span>
              <span>insights</span>
              <span>smarter</span>
              <span>decisions.</span>
            </h1>
            <p className="hero-subtext">
              Works with teams and organizations to turn complex data into
              clear, actionable insights that drive growth and innovation.
            </p>
          </div>

          <div className="hero-character-container">
            <img
              src="/hero-character.png"
              alt="Elsa Elisa Yohana Sianturi coding on laptop illustration"
              className="hero-character-img"
              id="hero-avatar"
            />
          </div>
        </main>

        {/* ===== ABOUT ME PAGE ===== */}
        <section
          className={`about-wrapper ${animatedSections.about ? "animate-stack" : ""}`}
          ref={aboutRef}
          data-section="about"
          id="about"
        >
          {/* Bio paragraph with inline orange highlights */}
          <p className="about-bio">
            Informatics Engineering graduate with hands-on experience in data
            pipelines, AI-driven systems, and interactive dashboards. Passionate
            about <mark className="about-highlight">Data Analytics,</mark>{" "}
            <mark className="about-highlight">Data Scientist,</mark> and{" "}
            <mark className="about-highlight">Data Engineering</mark> with a
            focus on transforming data into intelligent solutions and actionable
            insights.
          </p>

          {/* Focus areas */}
          <div className="about-focus-list">
            {FOCUS_AREAS.map((area, idx) => (
              <div
                key={area.id}
                className={`about-focus-row${expandedFocus === area.id ? " is-active" : ""}`}
                tabIndex={0}
                onClick={() =>
                  setExpandedFocus((current) =>
                    current === area.id ? null : area.id,
                  )
                }
                aria-expanded={expandedFocus === area.id}
              >
                <div className="focus-left">
                  <h2 className="focus-title">{area.title}</h2>
                  <p className="focus-desc">{area.description}</p>
                </div>
                <div
                  className="focus-tags-container"
                  aria-label={`Skills for ${area.title}`}
                >
                  {area.tags.map((tag) => (
                    <span key={tag} className="focus-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                {idx < FOCUS_AREAS.length - 1 && (
                  <div className="focus-divider" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ===== TOOLKIT AND PROJECTS INTRO ===== */}
      <section
        className={`toolkit-projects-wrapper ${animatedSections.toolkit ? "animate-stack" : ""}`}
        aria-label="Toolkit and projects"
        id="projects"
        ref={toolkitRef}
        data-section="toolkit"
      >
        <div className="toolkit-section">
          <h2 className="toolkit-heading">
            My <span>Toolkit</span>
          </h2>
          <div className="toolkit-grid">
            {TOOLKIT_ITEMS.map((tool) => (
              <div className="toolkit-item" key={tool.name}>
                <img
                  src={tool.image}
                  alt={`${tool.name} logo`}
                  className="toolkit-logo"
                />
                <span>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="projects-intro">
          <h2>My Projects.</h2>
        </div>

        <div className="projects-grid">
          {PROJECT_ITEMS.slice(
            0,
            showAllProjects ? PROJECT_ITEMS.length : 6,
          ).map((project) => (
            <article className="project-card" key={project.id}>
              <img
                src="/contohthumnailproject.webp"
                alt=""
                className="project-thumbnail"
              />
              <h3>{project.title}</h3>
              <div className="project-meta">
                <span className="project-meta-label">Tech</span>
                <span>{project.tech}</span>
              </div>
              <div className="project-card-footer">
                <span className="project-role">{project.role}</span>
                <a
                  href=""
                  className="project-arrow"
                  aria-label={`Open ${project.title}`}
                >
                  <img src="/tanda-panah.png" alt="" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <a
          href=""
          className="projects-see-all projects-see-all-bottom"
          aria-label={showAllProjects ? "Hide projects" : "See all projects"}
          onClick={(event) => {
            event.preventDefault();
            setShowAllProjects((isVisible) => !isVisible);
          }}
        >
          <img src="/tanda-panah.png" alt="" aria-hidden="true" />
          <span>{showAllProjects ? "Hide." : "See All."}</span>
        </a>
      </section>

      {/* ===== EXPERIENCE SECTION ===== */}
      <section
        className={`experience-wrapper ${animatedSections.experience ? "animate-stack" : ""}`}
        aria-label="Work experience"
        id="experience"
        ref={experienceRef}
        data-section="experience"
      >
        <div className="experience-intro">
          <h2>
            I’m an aspiring data specialist
            <span>
              focused on turning complex datasets into actionable insights and
              AI-driven solutions
            </span>
          </h2>
        </div>

        <div className="experience-list">
          {EXPERIENCE_ITEMS.map((experience) => {
            const isExpanded = expandedExperience === experience.id;

            return (
              <article
                className={`experience-item${isExpanded ? " is-expanded" : ""}`}
                key={experience.id}
              >
                <div className="experience-summary">
                  <div className="experience-role">
                    <h3>{experience.title}</h3>
                    <p>{experience.organization}</p>
                  </div>
                  <span className="experience-period">{experience.period}</span>
                  <button
                    type="button"
                    className="experience-toggle"
                    aria-expanded={isExpanded}
                    aria-label={`${isExpanded ? "Hide" : "Show"} details for ${experience.title}`}
                    onClick={() =>
                      setExpandedExperience(isExpanded ? null : experience.id)
                    }
                  >
                    <img src="/icontambah.png" alt="" aria-hidden="true" />
                  </button>
                </div>
                {isExpanded && (
                  <p className="experience-description">
                    {experience.description}
                  </p>
                )}
              </article>
            );
          })}
        </div>

        <div className="experience-links">
          <a href="">Connect on LinkedIn.</a>
          <a href="">Download CV</a>
        </div>
      </section>

      {/* ===== AWARDS SHOWCASE ===== */}
      <section
        className={`awards-wrapper ${animatedSections.awards ? "animate-stack" : ""}`}
        aria-label="Awards and achievements"
        ref={awardsRef}
        data-section="awards"
      >
        <div
          className="awards-track"
          style={{
            transform: `translateX(-${activeAward * 25}%)`,
            transition: isAwardTransitionEnabled ? undefined : "none",
          }}
          onTransitionEnd={() => {
            if (activeAward === 0) {
              setIsAwardTransitionEnabled(false);
              setActiveAward(AWARD_ITEMS.length);
              requestAnimationFrame(() => {
                setIsAwardTransitionEnabled(true);
                setIsAwardAnimating(false);
              });
              return;
            }
            if (activeAward === AWARD_SLIDES.length - 1) {
              setIsAwardTransitionEnabled(false);
              setActiveAward(1);
              requestAnimationFrame(() => {
                setIsAwardTransitionEnabled(true);
                setIsAwardAnimating(false);
              });
              return;
            }
            setIsAwardAnimating(false);
          }}
        >
          {AWARD_SLIDES.map((award, index) => (
            <article
              className={`award-slide${award.label.startsWith("Pertamina") ? " award-slide--scholarship" : ""}${award.label.startsWith("2nd Place") ? " award-slide--uiux" : ""}`}
              key={`${award.label}-${index}`}
            >
              <div className="award-copy">
                <p className="award-label">{award.label}</p>
                <blockquote>“{award.quote}”</blockquote>
              </div>
              <div className="award-image-wrapper">
                <img
                  src={award.image}
                  alt={award.alt}
                  className="award-image"
                />
              </div>
            </article>
          ))}
        </div>
        <div className="award-controls">
          <button
            type="button"
            className="award-arrow award-arrow--left"
            aria-label="Previous achievement"
            aria-disabled={isAwardAnimating}
            onClick={() => {
              if (isAwardAnimating) return;
              setIsAwardAnimating(true);
              setActiveAward((current) => current - 1);
            }}
          >
            <img src="/panahadd.png" alt="" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="award-arrow"
            aria-label="Next achievement"
            aria-disabled={isAwardAnimating}
            onClick={() => {
              if (isAwardAnimating) return;
              setIsAwardAnimating(true);
              setActiveAward((current) => current + 1);
            }}
          >
            <img src="/panahadd.png" alt="" aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer
        className={`site-footer ${animatedSections.footer ? "animate-stack" : ""}`}
        ref={footerRef}
        data-section="footer"
      >
        <nav className="site-footer-nav" aria-label="Footer navigation">
          <div>
            <a href="#hero">Home</a>
            <a href="#about">About Me</a>
            <a href="#experience">Resume</a>
            <a href="#projects">Projects</a>
          </div>
          <div>
            <a href="https://www.linkedin.com/in/elsaelisayohanasianturi/">
              LinkedIn
            </a>
            <a href="https://github.com/elsaelisa09">Github</a>
          </div>
        </nav>
        <div className="site-footer-content">
          <span className="site-footer-role">
            Data Scientist | Data Analyst
          </span>
          <a
            href="mailto:elsaelisayohana05@gmail.com"
            className="site-footer-email"
            onClick={handleEmailClick}
          >
            elsaelisayohana05@gmail.com
          </a>
        </div>
        <div className="site-footer-character">
          <img src="/profil2.png" alt="Elsa coding on a laptop" />
        </div>
      </footer>

      {/* ===== REACH OUT / CONTACT PANEL (SWIPE IN/OUT) ===== */}
      <div
        className={`reachout-panel ${isReachOutOpen ? "open" : ""}`}
        aria-hidden={!isReachOutOpen}
      >
        <MosaicBar label="Close" onClick={handleCloseClick} id="close-button" />

        <aside
          className="right-fixed-name contact-right-name"
          aria-label="Author Name"
        >
          <span>Elsa Elisa Yohana Sianturi</span>
        </aside>

        <section className="contact-main-wrapper">
          <div className="contact-orange-area">
            <nav className="contact-top-nav">
              <a
                href="https://www.linkedin.com/in/elsaelisayohanasianturi/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-nav-link"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/elsaelisa09"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-nav-link"
              >
                Github
              </a>
            </nav>

            <div className="contact-star-wrapper" aria-hidden="true">
              <img src="/bintang.png" alt="" className="contact-star-img" />
            </div>

            <div className="contact-content-body">
              <a
                href="mailto:elsaelisayohana05@gmail.com"
                className="contact-email-link"
                title="Send email to Elsa"
                onClick={handleEmailClick}
              >
                elsaelisayohana05@gmail.com
              </a>

              <p className="contact-bio-text">
                I'm interested in working with teams that treat data as the core
                foundation of decision-making. I enjoy engineering reliable
                pipelines, developing AI models, and turning complex datasets
                into clear, actionable insights
              </p>

              <div className="contact-signature-block">
                <div className="signature-img-wrapper">
                  <img
                    src="/ttd.png"
                    alt="Signature"
                    className="contact-signature-img"
                  />
                </div>
                <div className="contact-sign-name">Elsa!</div>
                <div className="contact-sign-role">Data Scientist/Analyst</div>
              </div>
            </div>
          </div>

          <div className="contact-white-area"></div>

          <div className="contact-character-container">
            <img
              src="/profil2.png"
              alt="Elsa illustration back view"
              className="contact-character-img"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
