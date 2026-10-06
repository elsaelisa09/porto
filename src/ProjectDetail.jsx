import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";

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
  const [showVideo, setShowVideo] = useState(false);
  useEffect(() => {
    setShowVideo(false);
  }, [project.id]);

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


// Buka detail dari atas, termasuk saat Next/Prev.
useLayoutEffect(() => {
  const scrollOptions = {
    top: 0,
    left: 0,
    behavior: "instant",
  };

  // Reset posisi scroll body dan halaman.
  document.body.scrollTo(scrollOptions);
  window.scrollTo(scrollOptions);
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
        <span className="nav-panel-role">Data Science | Data Analyst</span>
      </aside>

      {/* ===== KONTEN UTAMA ===== */}
      <main key={project.id} className="pd-main pd-enter">
        {/* Tombol Back → kembali ke section #projects */}
        <button type="button" className="pd-back-btn" onClick={onBack}>
          <img src="/panahadd.png" alt="" aria-hidden="true" className="pd-back-icon" />
          <span>Back</span>
        </button>

        <h1 className="pd-title">{project.title}</h1>
        <p className="pd-subtitle">{project.subtitle}</p>
        
        {project.youtubeId ? (
          <div 
            className="pd-video-placeholder" 
            style={{ 
              position: 'relative', 
              width: '75%', /* Diperkecil 25% dari ukuran penuh (100%) */
              margin: '0 auto 2rem auto', /* Agar posisinya tetap di tengah */
              aspectRatio: '16 / 9', /* Menjaga rasio video tetap proporsional */
              overflow: 'hidden', 
              borderRadius: '16px',
              backgroundColor: '#000'
            }}
          >
            {!showVideo ? (
              <div 
                style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, cursor: 'pointer' }}
                onClick={() => setShowVideo(true)}
              >
                <img 
                  src={project.image || "/contohthumnailproject.webp"} 
                  alt={project.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} 
                />
                <div style={{
                  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                  width: '68px', height: '48px', backgroundColor: 'rgba(255,0,0,0.9)', borderRadius: '12px',
                  display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}>
                  <div style={{
                    width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '18px solid white', marginLeft: '6px'
                  }}></div>
                </div>
              </div>
            ) : (
              <iframe 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1`} 
                title={project.title}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            )}
          </div>
        ) : (
          /* Saya juga menyesuaikan ukuran gambar (jika tidak ada video) agar konsisten besarnya dengan video */
          <img 
            src={project.image || "/contohthumnailproject.webp"} 
            alt={project.title} 
            className="pd-media-placeholder" 
            style={{ 
              width: '75%', 
              margin: '0 auto 2rem auto', 
              display: 'block', 
              aspectRatio: '16 / 9', 
              objectFit: 'cover', 
              borderRadius: '16px' 
            }} 
          />
        )}
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
