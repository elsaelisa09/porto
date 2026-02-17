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
];

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <SectionWrapper
      id="projects"
      title={
        <span className="flex w-full items-center justify-start gap-12 xl:mb-12">
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
        {projectsData.map((project, index) => (
          <a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group overflow-hidden rounded-3xl border border-slate-90 bg-white transition-all hover:border-slate-500 hover:shadow-lg ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{
              transitionDelay: isVisible ? `${index * 10}ms` : "0ms",
              transitionDuration: "5ms",
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
              <h3 className="mb-2 text-lg font-semibold text-slate-900">
                {project.title}
              </h3>
              <p className="text-sm text-slate-600 line-clamp-2">
                {project.description}
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-slate-900">
                View Project
                <svg
                  className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
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
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Projects;
