import SectionWrapper from "../components/SectionWrapper";
import OrbitImages from "../components/OrbitImages";
import { PRIMARY_EMAIL, PRIMARY_EMAIL_MAILTO } from "../constants/contact";
import foto1 from "../assets/foto1.webp";
import foto2 from "../assets/foto2.webp";
import foto3 from "../assets/foto3.webp";
import foto4 from "../assets/foto4.webp";
import foto5 from "../assets/foto5.webp";
import foto6 from "../assets/foto6.webp";
import foto7 from "../assets/foto7.webp";
import foto8 from "../assets/foto8.webp";

const contactLinks = [
  {
    id: "email",
    label: "Email",
    value: PRIMARY_EMAIL,
    href: PRIMARY_EMAIL_MAILTO,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/elsaelisayohana",
    href: "https://www.linkedin.com",
  },
  {
    id: "instagram",
    label: "Instagram",
    value: "instagram.com/elsaaelisaaa",
    href: "https://www.instagram.com/elsaaelisaaa/",
  },
  {
    id: "github",
    label: "GitHub",
    value: "github.com/elsaelisa09",
    href: "https://github.com/elsaelisa09",
  },
];

const orbitImages = [foto1, foto2, foto3, foto4, foto5, foto6, foto7, foto8];

const Contact = () => {
  return (
    <SectionWrapper
      id="contact"
      title={
        <span className="flex w-full text-[42px] lg:text-[82px]  items-center justify-start gap-12 xl:mb-12 lg:-mb-4">
          <span className="font-light">Let&apos;s</span>
          <span className="font-light tracking-[0.3em]">Connect</span>
        </span>
      }
      containerClassName="max-w-6xl !pb-0 md:!pb-2"
      contentClassName="max-w-none"
      sectionClassName="min-h-0"
      titleClassName="font-chathura font-light uppercase text-slate-900 text-[20px] sm:text-[22px] lg:text-[90px]"
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
        <div className="max-w-3xl">
          <div className="mt-4 border-t border-slate-200">
            {contactLinks.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target={item.id === "email" ? undefined : "_blank"}
                rel={item.id === "email" ? undefined : "noopener noreferrer"}
                className="group flex items-center justify-between gap-4 border-b border-slate-200 py-4 transition-colors"
              >
                <div className="min-w-0">
                  <p className="font-poppins text-[11px] uppercase tracking-[0.18em] text-slate-500 transition-colors duration-300 group-hover:text-slate-700">
                    {item.label}
                  </p>
                  <p className="truncate font-chathura text-[30px] leading-none text-slate-600 transition-[color,transform] duration-300 group-hover:scale-[1.02] group-hover:text-black sm:text-[36px]">
                    {item.value}
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.2"
                  stroke="currentColor"
                  className="h-5 w-5 shrink-0 text-slate-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:-rotate-45 group-hover:text-black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25"
                  />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-0">
          <aside className="hidden rounded-3xl border border-slate-200 bg-slate-50/60 p-6 sm:p-7 lg:block">
            <p className="font-poppins text-[11px] uppercase tracking-[0.2em] text-slate-500">
              Base
            </p>
            <p className="mt-2 font-chathura text-[36px] leading-none text-slate-900 sm:text-[42px]">
              Lampung, Indonesia
            </p>

            <div className="mt-6 border-t border-slate-200 pt-6">
              <p className="font-poppins text-[11px] uppercase tracking-[0.2em] text-slate-500">
                Preferred Topics
              </p>
              <ul className="mt-3 space-y-2 font-poppins  text-xs lg:text-sm text-slate-700">
                <li>/ UI-UX Design</li>
                <li>/ AI Engineering</li>
                <li>/ NLP and RAG</li>
              </ul>
            </div>
          </aside>

          <OrbitImages
            images={orbitImages}
            shape="ellipse"
            baseWidth={1600}
            radiusX={700}
            radiusY={220}
            rotation={-8}
            duration={30}
            itemSize={165}
            responsive
            responsiveAspectRatio="16 / 6"
            radius={300}
            direction="normal"
            fill
            showPath
            paused={false}
            pathColor="rgba(100, 116, 139, 0.28)"
            className="w-[560px] max-w-none -mt-36 sm:hidden"
          />

          <OrbitImages
            images={orbitImages}
            shape="ellipse"
            baseWidth={1600}
            radiusX={700}
            radiusY={155}
            rotation={-8}
            duration={30}
            itemSize={165}
            responsive
            responsiveAspectRatio="3 / 2"
            radius={300}
            direction="normal"
            fill
            showPath
            paused={false}
            pathColor="rgba(100, 116, 139, 0.28)"
            className="hidden sm:block w-[700px] lg:w-[820px] max-w-none sm:-mt-40 lg:-mt-[22rem] lg:translate-x-[4px] xl:translate-x-[36px]"
          />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
