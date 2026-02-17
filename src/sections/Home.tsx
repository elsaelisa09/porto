import SectionWrapper from "../components/SectionWrapper";
import profil from "../assets/profil.png";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const Home = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <SectionWrapper
      id="home"
      title=" "
      containerClassName="max-w-6xl pt-12 md:pt-0 pb-8 md:pb-12"
      contentClassName="max-w-none"
    >
      <div ref={ref} className="relative w-full">
        <h1
          className={`font-alexandria font-bold text-[40px] sm:text-[48px] lg:text-[59px] leading-tight text-slate-900 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          CREATIVE DESIGNER &amp; AI ENGINEER
        </h1>

        <div className="relative mt-0 lg:mt-0 min-h-[420px]">
          <div
            className={`lg:absolute lg:left-[52%] lg:top-0px lg:-translate-x-1/2 transition-all duration-700 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <img
              src={profil}
              alt="Profil"
              className="w-[240px] sm:w-[280px] lg:w-[300px] h-auto object-cover scale-[0.7]"
            />
          </div>

          <div
            className={`mt-6 lg:mt-0 lg:absolute lg:left-[68%] lg:top-0 font-chathura uppercase tracking-[0.35em] text-slate-700 transition-all duration-700 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="flex items-center gap-8 text-[22px] sm:text-[26px] lg:text-[28px]">
              <span>Based</span>
              <span>in</span>
              <span>Indonesia</span>
            </div>
            <div className="mt-[-10px] text-right text-[24px] sm:text-[28px] lg:text-[30px] font-semibold tracking-[0.25em]">
              Lampung
            </div>
          </div>

          <div
            className={`mt-8 lg:mt-0 lg:absolute lg:left-[35%] lg:top-[247px] lg:-translate-x-1/2 font-poppins font-semibold text-[14px] sm:text-[15px] lg:text-[16px] text-black transition-all duration-700 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <p>/COMPUTER VISION</p>
            <p>/UI-UX DESIGN</p>
            <p>/AI ENGINEERING</p>
            <p>/NLP AND RAG</p>
            <p>/MULTIMODAL ML</p>
          </div>
        </div>

        <div
          className={`mt-10 lg:mt-0 lg:pt-2 font-chathura uppercase tracking-[0.15em] text-slate-900 max-w-3xl mx-auto text-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <p className="text-[22px] sm:text-[24px] lg:text-[26px] leading-[1.15]">
            I'm an experienced UI/UX designer crafting memorable digital
            experiences through human-centered design and AI technologies such
            as Computer Vision, NLP, RAG, and multimodal machine learning
          </p>
        </div>

        <div
          className={`mt-12 lg:mt-16 flex flex-col items-center lg:items-start gap-4 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <div className="flex items-center gap-3 font-chathura uppercase tracking-[0.1em] text-slate-900 text-[20px] sm:text-[22px] lg:text-[40px]">
            <span>Available for Collaboration</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.2"
              stroke="currentColor"
              className="w-6 h-6 sm:w-8 sm:h-8 text-slate-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25"
              />
            </svg>
          </div>
          <a
            href="mailto:elsaelisayohana05@gmail.com"
            className="font-poppins text-[16px] sm:text-[18px] text-slate-700 hover:text-slate-900 transition-colors underline lg:ml-40 lg:-mt-7 lg:font-light"
          >
            elsaelisayohana05@gmail.com
          </a>
        </div>

        <div
          className={`mt-16 lg:mt-15 flex flex-col items-end text-right transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <div className="flex items-center gap-4 -mb-1">
            <div className="relative">
              <span className="font-chathura  uppercase tracking-[0.4em] text-slate-900 text-[28px] sm:text-[32px] lg:text-[40px] ">
                Currently
              </span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.2"
              stroke="currentColor"
              className="w-7 h-7 sm:w-8 sm:h-8 text-slate-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25"
              />
            </svg>
          </div>

          <h2 className="font-poppins uppercase tracking-[0.1em] text-slate-900 text-[18px] sm:text-[20px] lg:text-[16px] -mb-0.5">
            Final Year Informatics Engineering
          </h2>

          <h3 className="font-alexandria font-semibold text-slate-900 text-[64px] sm:text-[80px] lg:text-[28px] tracking-wide">
            ITERA
          </h3>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Home;
