import React, { useState, useCallback, useEffect } from "react";

function MosaicBar({ label, onClick, id }) {
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
      className="left-fixed-bar left-fixed-bar--dark"
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

export default function ProjectDetail({
  project,
  projectIndex,
  totalProjects,
  onBack,
  onNext,
  onPrev,
  onNavClick,
  onReachOut,
}) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Tutup nav dengan Escape, lock scroll saat nav terbuka
  useEffect(() => {
    if (!isNavOpen) return undefined;
    const handleKey = (e) => { if (e.key === "Escape") setIsNavOpen(false); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handleKey);
    };
  }, [isNavOpen]);

  // Scroll ke atas setiap ganti project (next/prev)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectIndex]);

  const handleNav = useCallback((hash) => {
    setIsNavOpen(false);
    onNavClick(hash);
  }, [onNavClick]);

  return (
    <div className="pd-page">
      {/* ===== SIDEBAR KIRI (MosaicBar dari main web) ===== */}
      <MosaicBar label="Reach Out" onClick={onReachOut} id="pd-reach-out" />

      {/* ===== NAMA VERTIKAL KANAN (sama dengan main web) ===== */}
      <aside className="right-fixed-name right-fixed-name--dark" aria-label="Author Name">
        <span>Elsa Elisa Yohana Sianturi</span>
      </aside>

      {/* ===== TOMBOL BUKA NAV ===== */}
      <button
        type="button"
        className={`nav-toggle${isNavOpen ? " is-hidden" : ""}`}
        aria-label="Open navigation menu"
        aria-expanded={isNavOpen}
        onClick={() => setIsNavOpen(true)}
      >
        <img src="/iconpluss.png" alt="" aria-hidden="true" />
      </button>

      {/* ===== BACKDROP NAV ===== */}
      <div
        className={`nav-backdrop${isNavOpen ? " is-visible" : ""}`}
        aria-hidden="true"
        onClick={() => setIsNavOpen(false)}
      />

      {/* ===== NAV PANEL ===== */}
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
          onClick={(e) => { e.preventDefault(); window.location.href = "mailto:elsaelisayohana05@gmail.com"; }}
        >
          @elsaelisayohana05@gmail.com
        </a>
        <nav className="nav-panel-links">
          <a href="#hero" onClick={(e) => { e.preventDefault(); handleNav("#hero"); }}>
            Home
          </a>
          <a href="#about" onClick={(e) => { e.preventDefault(); handleNav("#about"); }}>
            About Me
          </a>
          <a href="#projects" onClick={(e) => { e.preventDefault(); handleNav("#projects"); }}>
            Projects
          </a>
          <a href="#experience" onClick={(e) => { e.preventDefault(); handleNav("#experience"); }}>
            Resume
          </a>
          <button
            type="button"
            onClick={() => { setIsNavOpen(false); onReachOut(); }}
          >
            Contacts
          </button>
        </nav>
        <span className="nav-panel-role">Data Scientist | Data Analyst</span>
      </aside>

      {/* ===== KONTEN UTAMA ===== */}
      <main className="pd-main">
        {/* Tombol Back → kembali ke section #projects */}
        <button type="button" className="pd-back-btn" onClick={onBack}>
          <img src="/panahadd.png" alt="" aria-hidden="true" className="pd-back-icon" />
          <span>Back</span>
        </button>

        <h1 className="pd-title">{project.title}</h1>
        <p className="pd-subtitle">{project.subtitle}</p>

        <div className="pd-media-placeholder" aria-label="Project media" />

        <p className="pd-tech">
          Tech: <span className="pd-tech-highlight">{project.tech}</span>
        </p>

        <div className="pd-content-grid">
          <div className="pd-section-label">Situation</div>
          <div className="pd-section-body">
            <p>{project.situation}</p>
          </div>

          <div className="pd-section-label">Task &amp; Action</div>
          <div className="pd-section-body">
            {project.tasks.map((task, i) => (
              <div className="pd-task-item" key={i}>
                <h3>{task.title}</h3>
                <p>{task.desc}</p>
              </div>
            ))}
          </div>

          <div className="pd-section-label">Result</div>
          <div className="pd-section-body">
            <ul className="pd-result-list">
              {project.results.map((r, i) => (
                <li key={i}>
                  <strong>{r.bold}</strong>{r.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Navigasi Bawah */}
        <div className="pd-bottom-nav">
          <button type="button" className="pd-prev-btn" onClick={onPrev}>
            <img src="/panahadd.png" alt="" aria-hidden="true" className="pd-back-icon" />
            <span>Prev project</span>
          </button>
          <span className="pd-counter">{projectIndex + 1} / {totalProjects}</span>
          <button type="button" className="pd-next-btn" onClick={onNext}>
            <span>Next project</span>
            <img src="/panahadd.png" alt="" aria-hidden="true" />
          </button>
        </div>
      </main>
    </div>
  );
}
