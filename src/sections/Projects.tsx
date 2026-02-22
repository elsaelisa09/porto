import { useEffect, useRef, useState } from "react";
import SectionWrapper from "../components/SectionWrapper";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import fitGuideMockup from "../assets/mockup-FitGuideITERA.png";
import wisataQUMockup from "../assets/mockup-wisataQU.png";
import kiddieSafeMockup from "../assets/mockup-kiddiesafe.png";
import eduBotMockup from "../assets/edu_bot.png";
import faceRecAttendanceMockup from "../assets/FaceRec-Attendance.png";
import indonesianNerMockup from "../assets/NER.png";
import chatbotMockup from "../assets/chatbot.png";
import rentUrStyleMockup from "../assets/renturstyle.png";
import indFoodsClassificationMockup from "../assets/food-classification.png";

const projectsData = [
  {
    id: 1,
    title: "EduBot",
    description:
      "An AI learning robot with LLM-based Q&A and an attendance system using voice and ultrasonic sensors.",
    image: eduBotMockup,
    url: "https://drive.google.com/file/d/1uYyfmKm-9h7kJUYr_UdWTs067368O78l/view?usp=sharing",
  },
  {
    id: 2,
    title: "FaceRec Attendance",
    description:
      "Built an AI-based face recognition model and deployed a web app to automate student attendance securely and efficiently.",
    image: faceRecAttendanceMockup,
    url: "https://github.com/elsaelisa09/TugasBesarIIDeepLearning",
  },
  {
    id: 3,
    title: "Document AI ChatBot",
    description:
      "A RAG-powered chat app that lets users ask questions about documents and instantly get answers using an LLM.",
    image: chatbotMockup,
    url: "https://github.com/elsaelisa09/ChatBot-Dokumen",
  },
  {
    id: 4,
    title: "IND Foods Classification",
    description:
      "Trained an EfficientNet-B6 model to classify Indonesian food images into 5 categories.",
    image: indFoodsClassificationMockup,
    url: "https://github.com/elsaelisa09/Tugas-Besar-1-DeepLearning",
  },
  {
    id: 5,
    title: "Indonesian NER",
    description:
      "Experimented with IndoELECTRA for Indonesian NER using the SINGGALANG dataset and evaluated with F1-score.",
    image: indonesianNerMockup,
    url: "https://github.com/rayhanfatihg/Named-Entity-Recognition-nlp",
  },
  {
    id: 6,
    title: "FitGuide ITERA",
    description:
      "A UI/UX design concept that helps ITERA students use gym equipment safely and confidently.",
    image: fitGuideMockup,
    url: "https://www.figma.com/proto/moC2WqjtvkrL7vVfe5AwPR/IMK-FitGuide-ITERA?node-id=477-1748&p=f&t=TQu0ttxtPo9gvBzb-1&scaling=scale-down&content-scaling=fixed&page-id=10%3A3&starting-point-node-id=597%3A4522",
  },
  {
    id: 7,
    title: "WisataQU",
    description:
      "UI/UX design for a smart travel app to explore nearby attractions in real time and connect with local services.",
    image: wisataQUMockup,
    url: "https://www.figma.com/proto/4oeHhXm8dDxrtJEV6ffZUj/YuaiYuex?node-id=334-3389&t=EzoXVVdwryWKJc2v-1&scaling=scale-down&content-scaling=fixed&page-id=1%3A2&starting-point-node-id=472%3A6937",
  },
  {
    id: 8,
    title: "Kiddie Safe",
    description:
      "UI/UX design for a child-safe internet app that helps protect kids from harmful content and cyberbullying.",
    image: kiddieSafeMockup,
    url: "https://www.figma.com/proto/VkM0yzZ0gVXpZWHqauSNxR/Intuify---KiddieSafe?node-id=43-9&p=f&t=oK1nwL01OrmiWcVN-1&scaling=scale-down&content-scaling=fixed&page-id=1%3A5&starting-point-node-id=36%3A420&show-proto-sidebar=1",
  },
  {
    id: 9,
    title: "RentUr Style",
    description:
      "A web app for renting premium themed outfits for special occasions stylish without overspending.",
    image: rentUrStyleMockup,
    url: "https://www.figma.com/proto/22NGllyMUXjOsGs7Xi9gXE/TEAM-DEV-ONE-UI-UX?node-id=420-2444&t=0b4aRFgQyjixyB41-1&scaling=scale-down&content-scaling=fixed&page-id=1%3A6&starting-point-node-id=420%3A2233&show-proto-sidebar=1",
  },
];

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [showAllDesktop, setShowAllDesktop] = useState(false);
  const desktopVisibleLimit = 6;
  const hasExtraDesktopProjects = projectsData.length > desktopVisibleLimit;
  const primaryProjects = projectsData.slice(0, desktopVisibleLimit);
  const extraProjects = projectsData.slice(desktopVisibleLimit);
  const extraDesktopContentRef = useRef<HTMLDivElement | null>(null);
  const [extraDesktopHeight, setExtraDesktopHeight] = useState(0);

  useEffect(() => {
    const content = extraDesktopContentRef.current;
    if (!content) return;

    const updateHeight = () => {
      setExtraDesktopHeight(content.scrollHeight);
    };

    updateHeight();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateHeight);
      return () => window.removeEventListener("resize", updateHeight);
    }

    const resizeObserver = new ResizeObserver(() => updateHeight());
    resizeObserver.observe(content);

    return () => resizeObserver.disconnect();
  }, [extraProjects.length]);

  const renderProjectCard = (
    project: (typeof projectsData)[number],
    animationIndex: number,
  ) => (
    <a
      key={project.id}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group overflow-hidden rounded-3xl border border-slate-90 bg-white transition-[transform,opacity,border-color,box-shadow] hover:border-slate-500 hover:shadow-lg ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{
        transitionDelay: isVisible
          ? `${animationIndex * 120}ms, ${animationIndex * 120}ms, 0ms, 0ms`
          : "0ms, 0ms, 0ms, 0ms",
        transitionDuration: "900ms, 900ms, 180ms, 180ms",
      }}
    >
      <div className="aspect-video w-full overflow-hidden bg-slate-100">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4 pt-2 sm:pt-4">
        <h3 className="mb-0 text-[36px] sm:text-lg font-semibold text-slate-900 font-chathura xl:text-4xl xl:tracking-[0.1em]">
          {project.title}
        </h3>
        <p className="-mt-2 sm:mt-0 text-xs sm:text-sm font-light sm:font-normal text-slate-600 line-clamp-2">
          {project.description}
        </p>
        <div className="mt-4 flex items-center text-[14px] sm:text-sm font-light text-slate-900 font-poppins xl:text-sm">
          View Project
          <svg
            className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1 "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </a>
  );

  return (
    <SectionWrapper
      id="projects"
      title={
        <span className="flex w-full items-center justify-start gap-12 xl:mb-16">
          <span className="font-light">My</span>
          <span className="font-light tracking-[0.3em] ">Projects</span>
        </span>
      }
      titleClassName="font-chathura font-light uppercase text-slate-900 text-[48px] sm:text-[22px] lg:text-[90px]"
    >
      <div
        ref={ref}
        className="grid grid-cols-1 gap-9 md:grid-cols-2 lg:grid-cols-3"
      >
        {primaryProjects.map((project, index) =>
          renderProjectCard(project, index),
        )}
      </div>
      {hasExtraDesktopProjects && (
        <>
          <div className="mt-9 grid grid-cols-1 gap-9 md:grid-cols-2 lg:hidden">
            {extraProjects.map((project, index) =>
              renderProjectCard(project, index + desktopVisibleLimit),
            )}
          </div>
          <div
            className={`hidden overflow-hidden transition-[max-height,opacity,margin-top] duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:block ${
              showAllDesktop
                ? "lg:mt-9 lg:opacity-100"
                : "lg:pointer-events-none lg:mt-0 lg:opacity-0"
            }`}
            style={{
              maxHeight: showAllDesktop ? `${extraDesktopHeight}px` : "0px",
            }}
          >
            <div
              ref={extraDesktopContentRef}
              className="grid gap-9 lg:grid-cols-3"
            >
              {extraProjects.map((project, index) =>
                renderProjectCard(project, index + desktopVisibleLimit),
              )}
            </div>
          </div>
        </>
      )}
      {hasExtraDesktopProjects && (
        <div className="mt-12 hidden justify-center lg:flex">
          <button
            type="button"
            onClick={() => setShowAllDesktop((prev) => !prev)}
            className="group inline-flex items-center gap-4 font-chathura uppercase tracking-[0.3em] text-slate-500 text-[28px] transition-colors duration-300 hover:text-black"
          >
            <span className="relative inline-block after:absolute after:left-0 after:-bottom-[0px] after:h-[1.1px] after:w-full after:origin-left after:scale-x-100 after:bg-current after:content-[''] after:transition-transform after:duration-700 after:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:after:scale-x-[0.45]">
              {showAllDesktop ? "Hide" : "View All"}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.2"
              stroke="currentColor"
              className="h-4 w-4 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-45"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25"
              />
            </svg>
          </button>
        </div>
      )}
    </SectionWrapper>
  );
};

export default Projects;
