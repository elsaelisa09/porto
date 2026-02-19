import SectionWrapper from "../components/SectionWrapper";

const contactLinks = [
  {
    id: "email",
    label: "Email",
    value: "elsaelisayohana05@gmail.com",
    href: "mailto:elsaelisayohana05@gmail.com",
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
    value: "github.com/elsae",
    href: "https://github.com",
  },
];

const Contact = () => {
  return (
    <SectionWrapper
      id="contact"
      title={
        <span className="flex w-full items-center justify-start gap-12 xl:mb-12">
          <span className="font-light">Let&apos;s</span>
          <span className="font-light tracking-[0.3em]">Connect</span>
        </span>
      }
      containerClassName="max-w-6xl"
      contentClassName="max-w-none"
      titleClassName="font-chathura font-light uppercase text-slate-900 text-[20px] sm:text-[22px] lg:text-[90px]"
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="max-w-3xl">
          <p className="font-poppins text-sm uppercase tracking-[0.18em] text-slate-500">
            Available for collaboration, internship, and freelance projects.
          </p>
          <p className="mt-5 font-poppins text-[16px] leading-relaxed text-slate-600 sm:text-[17px]">
            If you have an idea, project, or role that fits my focus in UI/UX
            and AI engineering, send me a message. I usually reply within 24
            hours.
          </p>

          <div className="mt-10 border-t border-slate-200">
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
                  className="h-5 w-5 shrink-0 text-slate-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black"
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

        <aside className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6 sm:p-7">
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
            <ul className="mt-3 space-y-2 font-poppins text-sm text-slate-700">
              <li>/ UI-UX Design</li>
              <li>/ AI Engineering</li>
              <li>/ NLP and RAG</li>
            </ul>
          </div>
        </aside>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
