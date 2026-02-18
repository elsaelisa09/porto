import { useEffect, useRef, useState } from "react";
import SectionWrapper from "../components/SectionWrapper";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce application with payment integration and real-time inventory management.",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=500&h=300&fit=crop",
    url: "https://github.com/username/project1",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "Collaborative task management tool with drag-and-drop interface and team features.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop",
    url: "https://github.com/username/project2",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description:
      "Real-time weather monitoring dashboard with interactive maps and forecasting analytics.",
    image:
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&h=300&fit=crop",
    url: "https://github.com/username/project3",
  },
  {
    id: 4,
    title: "Social Media Analytics",
    description:
      "Analytics platform for tracking social media metrics across multiple platforms.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
    url: "https://github.com/username/project4",
  },
  {
    id: 5,
    title: "Portfolio Website",
    description:
      "Modern portfolio template with animated transitions and responsive design.",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&h=300&fit=crop",
    url: "https://github.com/username/project5",
  },
  {
    id: 6,
    title: "Fitness Tracker",
    description:
      "Mobile-first fitness tracking app with workout plans and progress visualization.",
    image:
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=500&h=300&fit=crop",
    url: "https://github.com/username/project6",
  },
  {
    id: 7,
    title: "Expense Tracker",
    description:
      "Personal finance dashboard for tracking spending, budgeting goals, and monthly trends.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=300&fit=crop",
    url: "https://github.com/username/project7",
  },
  {
    id: 8,
    title: "Learning Platform",
    description:
      "Online learning platform with course progress, quizzes, and interactive lesson modules.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=300&fit=crop",
    url: "https://github.com/username/project8",
  },
  {
    id: 9,
    title: "Event Booking System",
    description:
      "Event booking system with seat selection, QR ticketing, and attendee management tools.",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&h=300&fit=crop",
    url: "https://github.com/username/project9",
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
      <div className="p-4">
        <h3 className="mb-0 text-lg font-semibold text-slate-900 font-chathura xl:text-4xl xl:tracking-[0.1em]">
          {project.title}
        </h3>
        <p className="text-sm text-slate-600 line-clamp-2">
          {project.description}
        </p>
        <div className="mt-4 flex items-center text-sm font-light text-slate-900 font-poppins xl:text-sm">
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
      titleClassName="font-chathura font-light uppercase text-slate-900 text-[20px] sm:text-[22px] lg:text-[90px]"
    >
      <div
        ref={ref}
        className="grid grid-cols-1 gap-9 md:grid-cols-2 lg:grid-cols-3"
      >
        {primaryProjects.map((project, index) => renderProjectCard(project, index))}
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
            <div ref={extraDesktopContentRef} className="grid gap-9 lg:grid-cols-3">
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
