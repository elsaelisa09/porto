import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
import Lenis from "lenis";
import "./App.css";
import ProjectDetail from "./ProjectDetail";

// Focus areas data for About Me page
const FOCUS_AREAS = [
  {
    id: "analytics",
    title: "Data Analytics & Insights",
    description:
      "transform raw and complex datasets into interactive dashboards and actionable insights to drive informed business decisions",
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

const PROJECT_ITEMS = [
  {
    id: "project-1",
    title: "Sales Dashboard & KPI Analytics",
    tech: "Python, SQL, Power BI",
    role: "Data Analyst",
    subtitle: "Data Engineering",
    situation: "Perusahaan retail menghadapi kesulitan dalam memantau performa penjualan secara real-time. Data tersebar di berbagai sumber dan laporan manual memakan waktu berhari-hari, sehingga keputusan bisnis sering terlambat dan tidak berbasis data yang akurat.",
    tasks: [
      { title: "Membersihkan Data Historis Penjualan", desc: "Memproses dan menstandarisasi lebih dari 99.000 baris data transaksi mentah agar bebas dari anomali. Tugas ini mencakup penanganan missing values, perbaikan error pencarian data antar tabel, dan transformasi format data awal agar valid, konsisten, serta siap untuk dianalisis lebih lanjut." },
      { title: "Mengekstrak Matrik Kinerja Utama (KPI)", desc: "Mengidentifikasi indikator krusial yang paling relevan dengan kesehatan dan target bisnis. Tugas ini berfokus pada agregasi data yang sudah bersih untuk merumuskan metrik penting, seperti tren total pendapatan bulanan, volume transaksi, serta tingkat kontribusi penjualan dari setiap kategori produk." },
      { title: "Membangun Dashboard Interaktif", desc: "Merancang antarmuka visualisasi yang dinamis dan ramah pengguna untuk menyajikan wawasan bisnis. Tujuan dari tugas ini adalah memungkinkan pemangku kepentingan non-teknis untuk memfilter, mengurutkan, dan membaca tren data secara mandiri melalui tata letak pelaporan yang intuitif." },
    ],
    results: [
      { bold: "Data Bersih & Valid:", text: " Berhasil menstrukturkan >99.000 baris data mentah menjadi dataset yang bebas anomali dan siap dianalisis." },
      { bold: "Wawasan Bisnis Tepat Sasaran:", text: " Mengidentifikasi produk dengan performa terbaik untuk membantu manajemen merencanakan alokasi inventaris berbasis data." },
      { bold: "Efisiensi Pelaporan:", text: " Mengotomatisasi visualisasi melalui dashboard interaktif, memangkas waktu pembuatan laporan manual secara drastis." },
    ],
  },
  {
    id: "project-2",
    title: "Customer Churn Prediction Model",
    tech: "Python, Scikit-learn, Tableau",
    role: "Data Science",
    subtitle: "Machine Learning",
    situation: "Perusahaan telekomunikasi mengalami tingkat churn pelanggan yang tinggi namun tidak memiliki sistem prediktif untuk mengidentifikasi pelanggan berisiko sebelum mereka berhenti berlangganan, sehingga tim retensi tidak dapat bertindak secara proaktif.",
    tasks: [
      { title: "Eksplorasi & Preprocessing Data", desc: "Menganalisis dataset pelanggan dengan lebih dari 7.000 entri, menangani imbalanced class, encoding variabel kategorikal, dan normalisasi fitur numerik agar model dapat belajar secara optimal dari pola data historis." },
      { title: "Membangun Model Prediksi", desc: "Melatih dan membandingkan beberapa algoritma klasifikasi termasuk Random Forest, XGBoost, dan Logistic Regression. Melakukan hyperparameter tuning menggunakan GridSearchCV untuk memaksimalkan recall pada kelas churn." },
      { title: "Visualisasi & Interpretasi Model", desc: "Membuat dashboard Tableau yang menampilkan segmen pelanggan berisiko tinggi beserta faktor-faktor penyebab churn, memungkinkan tim bisnis mengambil tindakan retensi yang tepat sasaran." },
    ],
    results: [
      { bold: "Akurasi Model 87%:", text: " Model XGBoost mencapai akurasi 87% dengan recall 82% pada kelas churn di data uji." },
      { bold: "Identifikasi Segmen Risiko:", text: " Berhasil mengidentifikasi 3 segmen pelanggan berisiko tinggi berdasarkan pola penggunaan dan riwayat pembayaran." },
      { bold: "Penghematan Biaya Retensi:", text: " Tim retensi dapat memprioritaskan outreach ke pelanggan yang tepat, meningkatkan efisiensi kampanye retensi secara signifikan." },
    ],
  },
  {
    id: "project-3",
    title: "ETL Pipeline untuk Data Warehouse",
    tech: "Python, Apache Airflow, PostgreSQL",
    role: "Data Engineer",
    subtitle: "Data Engineering",
    situation: "Startup e-commerce memiliki data transaksi yang tersebar di berbagai microservice dan database berbeda. Tidak ada pipeline terpusat yang mengintegrasikan data tersebut, sehingga analisis lintas platform menjadi sangat sulit dan memakan waktu.",
    tasks: [
      { title: "Desain Arsitektur Data Warehouse", desc: "Merancang skema star schema untuk data warehouse dengan fact table transaksi dan dimension tables untuk produk, pelanggan, dan waktu. Memastikan struktur mendukung query analitik yang cepat dan efisien." },
      { title: "Membangun ETL Pipeline dengan Airflow", desc: "Mengembangkan DAG (Directed Acyclic Graph) di Apache Airflow untuk mengotomatisasi proses ekstraksi data dari 5 sumber berbeda, transformasi sesuai business rules, dan loading ke PostgreSQL data warehouse setiap malam." },
      { title: "Monitoring & Data Quality Check", desc: "Mengimplementasikan automated data quality checks pada setiap tahap pipeline, termasuk validasi schema, deteksi duplikat, dan alerting via email ketika pipeline gagal atau data anomali terdeteksi." },
    ],
    results: [
      { bold: "Pipeline Berjalan Otomatis:", text: " ETL pipeline berjalan setiap malam tanpa intervensi manual, memproses rata-rata 50.000 record per eksekusi." },
      { bold: "Data Terintegrasi:", text: " Data dari 5 sumber berbeda berhasil diintegrasikan ke satu data warehouse yang konsisten dan dapat diandalkan." },
      { bold: "Waktu Query Berkurang 70%:", text: " Analis bisnis dapat menjalankan query lintas platform dalam hitungan detik dibanding sebelumnya yang memakan jam." },
    ],
  },
  {
    id: "project-4",
    title: "RAG-based Document Retrieval System",
    tech: "Python, LangChain, ChromaDB",
    role: "AI Engineer",
    subtitle: "AI / Machine Learning",
    situation: "PT Pertamina Hulu Rokan memiliki ribuan dokumen teknis dan SOP yang sulit diakses oleh karyawan. Pencarian manual memakan waktu lama dan sering menghasilkan informasi yang tidak relevan atau sudah usang.",
    tasks: [
      { title: "Implementasi Vector Database", desc: "Membangun sistem indexing dokumen menggunakan ChromaDB sebagai vector store. Setiap dokumen dipecah menjadi chunks optimal dan dikonversi menjadi embeddings menggunakan model bahasa untuk memungkinkan pencarian semantik yang akurat." },
      { title: "Pengembangan RAG Pipeline", desc: "Mengintegrasikan retrieval system dengan LLM menggunakan LangChain framework. Pipeline menerima pertanyaan pengguna, mencari dokumen relevan dari vector store, dan menghasilkan jawaban yang grounded pada konteks dokumen asli." },
      { title: "Evaluasi & Optimasi Akurasi", desc: "Merancang evaluation framework menggunakan dataset pertanyaan-jawaban yang dikurasi secara manual. Melakukan iterasi pada chunk size, overlap, dan prompt engineering untuk memaksimalkan akurasi jawaban sistem." },
    ],
    results: [
      { bold: "Akurasi 76%:", text: " Sistem mencapai 76% akurasi dalam menjawab pertanyaan teknis berdasarkan evaluasi manual terhadap 100 pertanyaan uji." },
      { bold: "Waktu Pencarian Berkurang:", text: " Karyawan dapat menemukan informasi relevan dalam hitungan detik dibanding pencarian manual yang memakan 15-30 menit." },
      { bold: "Skalabel:", text: " Sistem dapat dengan mudah diperbarui dengan dokumen baru tanpa perlu re-training model dari awal." },
    ],
  },
  {
    id: "project-5",
    title: "Social Media Sentiment Analysis",
    tech: "Python, NLTK, Power BI",
    role: "Data Analyst",
    subtitle: "Data Analytics",
    situation: "Brand consumer goods ingin memahami persepsi publik terhadap produk mereka di media sosial namun tidak memiliki sistem otomatis untuk menganalisis ribuan komentar dan ulasan yang masuk setiap harinya.",
    tasks: [
      { title: "Scraping & Pengumpulan Data", desc: "Mengumpulkan lebih dari 15.000 komentar dari Twitter dan Instagram menggunakan API resmi. Data dibersihkan dari spam, duplikat, dan konten tidak relevan sebelum masuk ke tahap analisis." },
      { title: "Pemodelan Sentimen", desc: "Melatih model klasifikasi sentimen (positif/negatif/netral) menggunakan fine-tuned IndoBERT untuk teks berbahasa Indonesia. Model dievaluasi menggunakan cross-validation untuk memastikan generalisasi yang baik." },
      { title: "Dashboard Monitoring Real-time", desc: "Membangun dashboard Power BI yang menampilkan tren sentimen harian, word cloud topik populer, dan perbandingan sentimen antar produk kompetitor untuk mendukung keputusan tim marketing." },
    ],
    results: [
      { bold: "Akurasi Sentimen 83%:", text: " Model IndoBERT mencapai F1-score 83% pada dataset uji yang beragam." },
      { bold: "Insight Produk Teridentifikasi:", text: " Berhasil mengidentifikasi 5 pain point utama pelanggan yang sebelumnya tidak diketahui tim produk." },
      { bold: "Monitoring Otomatis:", text: " Tim marketing dapat memantau reputasi brand secara real-time tanpa perlu membaca komentar satu per satu." },
    ],
  },
  {
    id: "project-6",
    title: "Inventory Forecasting System",
    tech: "Python, Prophet, Ms. Excel",
    role: "Data Analyst",
    subtitle: "Predictive Analytics",
    situation: "Perusahaan distribusi mengalami masalah overstock dan stockout yang berulang karena perencanaan inventaris masih dilakukan secara manual berdasarkan intuisi, tanpa mempertimbangkan pola musiman dan tren historis penjualan.",
    tasks: [
      { title: "Analisis Pola Historis", desc: "Menganalisis data penjualan 3 tahun terakhir untuk mengidentifikasi pola musiman, tren jangka panjang, dan anomali. Visualisasi decomposition time series membantu stakeholder memahami komponen-komponen yang mempengaruhi permintaan." },
      { title: "Implementasi Model Forecasting", desc: "Menggunakan Facebook Prophet untuk membangun model forecasting yang dapat menangani seasonality ganda (mingguan dan tahunan) serta holiday effects. Model divalidasi menggunakan walk-forward validation." },
      { title: "Integrasi ke Laporan Excel", desc: "Mengembangkan template Excel otomatis yang mengintegrasikan output forecast dengan sistem pemesanan yang sudah ada, memungkinkan tim operasional menggunakan prediksi tanpa perlu keahlian teknis khusus." },
    ],
    results: [
      { bold: "Error Forecast Berkurang 40%:", text: " MAPE model turun dari 35% (metode manual) menjadi 21% menggunakan Prophet." },
      { bold: "Stockout Berkurang:", text: " Kejadian stockout pada produk fast-moving berkurang 60% dalam 3 bulan pertama implementasi." },
      { bold: "Efisiensi Modal:", text: " Nilai inventaris rata-rata berkurang 18% karena pemesanan lebih tepat sasaran berdasarkan prediksi data." },
    ],
  },
  {
    id: "project-7",
    title: "Student Performance Analytics",
    tech: "Python, SQL, Tableau",
    role: "Data Analyst",
    subtitle: "Data Analytics",
    situation: "Institusi pendidikan ingin mengidentifikasi mahasiswa yang berisiko gagal lebih awal agar dapat diberikan intervensi akademik tepat waktu. Selama ini tidak ada sistem yang dapat memprediksi performa mahasiswa secara proaktif.",
    tasks: [
      { title: "Pengumpulan & Integrasi Data Akademik", desc: "Mengintegrasikan data dari sistem akademik, absensi, dan nilai tugas dari 3 semester terakhir untuk 2.000+ mahasiswa. Data dinormalisasi dan divalidasi untuk memastikan konsistensi antar sumber." },
      { title: "Analisis Faktor Risiko", desc: "Menggunakan analisis korelasi dan feature importance untuk mengidentifikasi faktor-faktor yang paling berpengaruh terhadap performa akademik, termasuk tingkat kehadiran, nilai mid-term, dan partisipasi tugas." },
      { title: "Dashboard Monitoring Dosen", desc: "Membangun dashboard Tableau interaktif yang memungkinkan dosen memantau perkembangan setiap mahasiswa, melihat tren nilai, dan mendapatkan alert otomatis untuk mahasiswa yang menunjukkan tanda-tanda penurunan performa." },
    ],
    results: [
      { bold: "Identifikasi Dini:", text: " Sistem berhasil mengidentifikasi 89% mahasiswa berisiko gagal sebelum UAS, memberikan waktu untuk intervensi." },
      { bold: "Tingkat Kelulusan Meningkat:", text: " Setelah implementasi program intervensi berbasis data, tingkat kelulusan tepat waktu meningkat 12%." },
      { bold: "Adopsi Dosen Tinggi:", text: " 85% dosen aktif menggunakan dashboard dalam pengambilan keputusan akademik setelah pelatihan singkat." },
    ],
  },
  {
    id: "project-8",
    title: "Energy Consumption Monitoring",
    tech: "Python, IoT Sensors, Power BI",
    role: "Data Engineer",
    subtitle: "Data Engineering",
    situation: "Program Desa Energi Berdikari membutuhkan sistem monitoring konsumsi energi terbarukan di desa-desa binaan. Data dari panel surya dan turbin angin belum terintegrasi sehingga efisiensi energi sulit dipantau dan dioptimalkan.",
    tasks: [
      { title: "Integrasi Data Sensor IoT", desc: "Membangun pipeline untuk mengumpulkan data real-time dari sensor IoT yang terpasang pada panel surya dan turbin angin di 5 desa. Data dikirim ke cloud setiap 15 menit dan disimpan dalam time-series database." },
      { title: "Analisis Efisiensi Energi", desc: "Menganalisis pola konsumsi energi harian dan musiman untuk mengidentifikasi waktu puncak penggunaan dan potensi pemborosan. Membandingkan output aktual vs kapasitas teoritis untuk setiap instalasi." },
      { title: "Dashboard Komunitas", desc: "Merancang dashboard sederhana yang dapat diakses oleh pengelola desa untuk memantau status sistem energi, konsumsi harian, dan estimasi penghematan biaya dibanding penggunaan listrik konvensional." },
    ],
    results: [
      { bold: "Monitoring Real-time Aktif:", text: " 5 desa berhasil terhubung ke sistem monitoring terpusat dengan uptime 94%." },
      { bold: "Efisiensi Meningkat 15%:", text: " Identifikasi dan perbaikan kebocoran energi meningkatkan efisiensi sistem secara keseluruhan." },
      { bold: "Laporan Otomatis:", text: " Laporan bulanan untuk program Pertamina dihasilkan otomatis, menghemat 8 jam kerja manual per bulan." },
    ],
  },
];

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
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
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


  // Smooth scrolling untuk halaman utama dan detail project.
  useLayoutEffect(() => {
    let lenis = null;

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const syncSmoothScroll = () => {
      const isScrollLocked =
        isNavOpen ||
        isReachOutOpen ||
        document.body.style.overflow === "hidden";

      if (isScrollLocked || motionPreference.matches) {
        lenis?.destroy();
        lenis = null;
        return;
      }

      if (lenis) return;

      lenis = new Lenis({
        autoRaf: true,
        smoothWheel: true,
        lerp: 0.1,
        anchors: {
          offset: -24,
        },
      });
    };

    // Ikuti penguncian scroll saat menu detail dibuka.
    const overflowObserver = new MutationObserver(syncSmoothScroll);

    overflowObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });

    motionPreference.addEventListener("change", syncSmoothScroll);
    syncSmoothScroll();

    return () => {
      overflowObserver.disconnect();
      motionPreference.removeEventListener("change", syncSmoothScroll);
      lenis?.destroy();
    };
  }, [
    currentPage,
    selectedProjectIndex,
    isNavOpen,
    isReachOutOpen,
  ]);
  // Intersection observer: detect which section is in view
  useEffect(() => {
    if (currentPage !== "home") return undefined;
    
    const options = { root: null, threshold: 0.1};

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
  }, [currentPage]);

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

  const [pendingScrollTarget, setPendingScrollTarget] = useState(null);

  useEffect(() => {
    if (currentPage !== "home" || !pendingScrollTarget) return;

    const el = document.getElementById(pendingScrollTarget);
    if (!el) return;

    // Arahkan halaman ke section tujuan.
    el.scrollIntoView({
      behavior: "instant",
      block: "start",
    });

    // Animasi saat kembali dari detail ke daftar project.
    const section = el.closest(".toolkit-projects-wrapper");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
      pendingScrollTarget === "project-list" &&
      section &&
      !reduceMotion
    ) {
      section.animate(
        [
          { opacity: 0, transform: "translateY(20px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        {
          duration: 450,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        }
      );
    }

    setPendingScrollTarget(null);
  }, [currentPage, pendingScrollTarget]);

  const handleBackToProjects = useCallback(() => {
    setPendingScrollTarget("project-list");
    setCurrentPage("home");
  }, []);

  const handleNavFromDetail = useCallback((hash) => {
    setPendingScrollTarget(hash.replace("#", ""));
    setCurrentPage("home");
  }, []);

  if (currentPage === "project-detail") {
    return (
      <ProjectDetail
        project={PROJECT_ITEMS[selectedProjectIndex]}
        projectIndex={selectedProjectIndex}
        totalProjects={PROJECT_ITEMS.length}
        onBack={handleBackToProjects}
        onNext={() => setSelectedProjectIndex((i) => (i + 1) % PROJECT_ITEMS.length)}
        onPrev={() => setSelectedProjectIndex((i) => (i - 1 + PROJECT_ITEMS.length) % PROJECT_ITEMS.length)}
        onNavClick={handleNavFromDetail}
        onReachOut={() => {
          setCurrentPage("home");
          requestAnimationFrame(() => setTimeout(() => setIsReachOutOpen(true), 80));
        }}
      />
    );
  }

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
        <span className="nav-panel-role">Data Science | Data Analyst</span>
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
            <span>Data Science | Data Analyst</span>
          </div>

          <div className="hero-content">
            <h1 className="hero-headline">
              <span>data-driven</span>
              <span>insights</span>
              <span>smarter</span>
              <span>decisions.</span>
            </h1>
            <p className="hero-subtext">
              Empowering teams and organizations to turn complex data into clear, actionable insights that drive growth and innovation.
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
            <mark className="about-highlight">Data Science,</mark> and{" "}
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

        <div className="projects-intro" id="project-list">
          <h2>My Projects.</h2>
        </div>

        <div className="projects-grid">
          {PROJECT_ITEMS.slice(
            0,
            showAllProjects ? PROJECT_ITEMS.length : 6,
          ).map((project, index) => (
            <article
              className="project-card"
              key={project.id}
              onClick={() => {
                setSelectedProjectIndex(index);
                setCurrentPage("project-detail");
              }}
              style={{ cursor: "pointer" }}
            >
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
                <span className="project-arrow">
                  <img src="/tanda-panah.png" alt="" aria-hidden="true" />
                </span>
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
            Data Science | Data Analyst
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
                <div className="contact-sign-role">Data Science/Analyst</div>
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
