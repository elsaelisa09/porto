import { useState, useEffect } from "react";
import { CV_LINK } from "../constants/contact";

const CVPreview = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50));

  return (
    <div className="flex h-screen w-full flex-col bg-slate-100">
      {/* Header */}
      <div className="z-10 flex items-center justify-between border-b bg-white px-4 py-3 sm:px-6 sm:py-4 shadow-sm">
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="/"
            className="group flex items-center gap-1.5 text-slate-600 transition-colors hover:text-slate-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:-translate-x-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            <span className="font-poppins text-xs sm:text-sm font-medium tracking-wide">Back</span>
          </a>
          <div className="h-5 w-px bg-slate-200 sm:h-6" />
          <h1 className="font-marvel text-base sm:text-xl font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-slate-900">
            CV
          </h1>
        </div>

        {/* Zoom Controls (Desktop Only) */}
        {!isMobile && (
          <div className="flex items-center gap-4 rounded-lg bg-slate-50 px-3 py-1.5 border border-slate-200">
            <button
              onClick={handleZoomOut}
              className="p-1 text-slate-500 hover:text-black transition-colors"
              title="Zoom Out"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
              </svg>
            </button>
            <span className="font-poppins text-xs font-bold text-slate-700 w-10 text-center">
              {zoom}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1 text-slate-500 hover:text-black transition-colors"
              title="Zoom In"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>
        )}
        
        <a
          href={CV_LINK}
          download="CV-Elsa-Elisa-Yohana-Sianturi.pdf"
          className="flex items-center gap-2 border border-black bg-white px-3 py-1.5 sm:px-5 sm:py-2 text-black transition-all hover:bg-black hover:text-white active:scale-95 shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-3.5 w-3.5 sm:h-4 sm:w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M7.5 12 12 16.5m0 0L16.5 12M12 16.5V3"
            />
          </svg>
          <span className="font-poppins text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest">
            Download
          </span>
        </a>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-slate-100 flex justify-center py-8">
        {isMobile ? (
          <div className="flex h-full flex-col items-center justify-center px-6 text-center">
            <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
                className="mx-auto mb-4 h-16 w-16 text-slate-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
              <h2 className="mb-2 font-marvel text-2xl font-bold uppercase tracking-wider text-slate-900">
                Pratinjau CV
              </h2>
              <p className="font-poppins text-sm text-slate-500">
                Gunakan tombol di bawah untuk melihat CV dengan tampilan yang lebih optimal di perangkat mobile Anda.
              </p>
            </div>
            
            <a
              href={CV_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-xs bg-black py-4 text-center text-white transition-transform active:scale-95"
            >
              <span className="font-poppins text-xs font-bold uppercase tracking-[0.2em]">
                Buka Resume Lengkap
              </span>
            </a>
            
            <p className="mt-4 font-poppins text-[10px] uppercase tracking-widest text-slate-400">
              Format PDF • Mendukung Zoom & Download
            </p>
          </div>
        ) : (
          <div 
            className="transition-transform duration-300 ease-out origin-top shadow-2xl h-fit max-w-5xl"
            style={{ transform: `scale(${zoom / 100})` }}
          >
            <iframe
              src={`${CV_LINK}#toolbar=0&navpanes=0&scrollbar=0`}
              className="w-[850px] h-[1150px] border-none bg-white"
              title="CV Preview"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CVPreview;
