import SectionWrapper from "../components/SectionWrapper";
import LogoLoop from "../components/LogoLoop";
import profil from "../assets/profil.png";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { PRIMARY_EMAIL, PRIMARY_EMAIL_MAILTO } from "../constants/contact";

const skillLogos = [
  {
    src: "https://cdn.simpleicons.org/html5/000000",
    alt: "HTML",
    title: "HTML",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    src: "https://cdn.simpleicons.org/css/000000",
    alt: "CSS",
    title: "CSS",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    src: "https://cdn.simpleicons.org/cplusplus/000000",
    alt: "C++",
    title: "C++",
    href: "https://isocpp.org",
  },
  {
    src: "https://cdn.simpleicons.org/python/000000",
    alt: "Python",
    title: "Python",
    href: "https://www.python.org",
  },
  {
    src: "https://cdn.simpleicons.org/pytorch/000000",
    alt: "PyTorch",
    title: "PyTorch",
    href: "https://pytorch.org",
  },
  {
    src: "https://cdn.simpleicons.org/figma/000000",
    alt: "Figma",
    title: "Figma",
    href: "https://www.figma.com",
  },
  {
    src: "https://www.vectorlogo.zone/logos/microsoft_powerbi/microsoft_powerbi-icon.svg",
    alt: "Power BI",
    title: "Power BI",
    href: "https://www.microsoft.com/power-platform/products/power-bi",
  },
  {
    src: "https://www.vectorlogo.zone/logos/visualstudio_code/visualstudio_code-icon.svg",
    alt: "VS Code",
    title: "VS Code",
    href: "https://code.visualstudio.com",
  },
  {
    src: "https://cdn.simpleicons.org/git/000000",
    alt: "Git",
    title: "Git",
    href: "https://git-scm.com",
  },
  {
    src: "https://cdn.simpleicons.org/weightsandbiases/000000",
    alt: "Weights & Biases",
    title: "Weights & Biases",
    href: "https://wandb.ai",
  },
];

const Home = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <SectionWrapper
      id="home"
      title=" "
      containerClassName="max-w-6xl pt-2 md:pt-0 pb-8 md:pb-12"
      contentClassName="max-w-none"
    >
      <div ref={ref} className="relative w-full">
        <h1
          className={`font-alexandria font-bold text-[40px] sm:text-[48px] lg:text-[59px] leading-tight text-center md:text-left text-slate-900 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          CREATIVE DESIGNER &amp; AI ENGINEER
        </h1>

        <div className="relative mt-0 lg:mt-0 min-h-[420px]">
          <div
            className={`flex justify-center lg:block lg:absolute lg:left-[52%] lg:top-0px lg:-translate-x-1/2 transition-all duration-700 ${
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
            className={`-mt-14 lg:mt-0 lg:absolute lg:left-[68%] lg:top-0 font-chathura uppercase tracking-[0.35em] text-slate-700 transition-all duration-700 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="flex items-center gap-8 text-[22px] sm:text-[26px] lg:text-[28px] ">
              <span>Based</span>
              <span>in</span>
              <span>Indonesia</span>
            </div>
            <div className="mt-[-10px] text-right text-[24px] sm:text-[28px] lg:text-[30px] font-semibold tracking-[0.25em]">
              Lampung
            </div>
          </div>

          <div
            className={`mt-8 text-center lg:text-left lg:mt-4 lg:absolute lg:left-[36%] lg:top-[247px] lg:-translate-x-1/2 font-poppins font-semibold text-[14px] sm:text-[15px] lg:text-[14px] text-black transition-all duration-700 ${
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
            I'm Elsa, an experienced UI/UX designer crafting memorable digital
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
          <div className="flex items-center gap-2 whitespace-nowrap font-chathura uppercase tracking-[0.06em] sm:tracking-[0.1em] text-slate-900 text-[32px] sm:text-[22px] lg:text-[40px]">
            <span>Available for Collaboration</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.2"
              stroke="currentColor"
              className="w-4 h-4 sm:w-5 sm:h-5 xl:w-6 xl:h-6 text-slate-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25"
              />
            </svg>
          </div>
          <a
            href={PRIMARY_EMAIL_MAILTO}
            className="inline-block -mt-6 tracking-[0.1em] decoration-1 origin-left font-poppins font-light text-[12px] md:text-[18px] text-slate-500 hover:text-black transition-[color,transform] duration-300 hover:scale-[1.03] underline lg:ml-40 lg:-mt-7 lg:font-light"
          >
            {PRIMARY_EMAIL}
          </a>
        </div>

        <div
          className={`mt-10 lg:mt-15 flex flex-col items-center text-center lg:items-end lg:text-right transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <div className="flex items-center justify-center lg:justify-end gap-4 -mb-1">
            <div className="relative">
              <span className="font-chathura  uppercase tracking-[0.4em] text-slate-900 text-[28px] sm:text-[32px] lg:text-[40px] ">
                Currently
              </span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/sExt. Yeah. Yes. All.vg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.2"
              stroke="currentColor"
              className="w-4 h-4 sm:w-5 sm:h-5 xl:w-6 xl:h-6 text-slate-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25"
              />
            </svg>
          </div>

          <h2 className="font-poppins uppercase tracking-[0.1em] text-[12px] text-slate-900 text-[14px] sm:text-[20px] lg:text-[16px] -mb-0.5">
            Final Year Informatics Engineering
          </h2>

          <h3 className="font-alexandria font-semibold text-slate-900 text-[24px] sm:text-[80px] lg:text-[28px] tracking-wide">
            ITERA
          </h3>
        </div>

        <div
          className={`mt-14 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "700ms" }}
        >
          <p className="mb-0 lg:mb-4 font-chathura text-[34px] uppercase tracking-[0.22em] text-slate-500">
            Skills
          </p>
          <div className="relative h-[96px] overflow-hidden px-2 sm:px-4">
            <LogoLoop
              logos={skillLogos}
              speed={96}
              direction="left"
              logoHeight={44}
              gap={64}
              hoverSpeed={0}
              fadeOut
              scaleOnHover
              fadeOutColor="#ffffff"
              ariaLabel="Skills logo loop"
              renderItem={(item, key) => {
                if (!("src" in item)) {
                  return item.node;
                }

                return (
                  <a
                    key={key}
                    href={item.href}
                    aria-label={item.alt ?? item.title ?? "logo link"}
                    title={item.title}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center rounded opacity-55 transition-opacity duration-300 hover:opacity-100 focus-visible:outline focus-visible:outline-current focus-visible:outline-offset-2"
                  >
                    <img
                      src={item.src}
                      srcSet={item.srcSet}
                      sizes={item.sizes}
                      width={item.width}
                      height={item.height}
                      alt={item.alt ?? ""}
                      loading="lazy"
                      decoding="async"
                      className="h-[var(--logoloop-logoHeight)] w-auto object-contain transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-110"
                    />
                  </a>
                );
              }}
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Home;
