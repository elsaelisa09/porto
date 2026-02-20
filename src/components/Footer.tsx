const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white px-4 sm:px-6 pb-0 mb-0">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-[24px] border border-white/10 bg-black px-7 py-9 sm:rounded-[28px] sm:px-8 sm:py-10 lg:rounded-[34px] lg:py-11">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <a
              href="#home"
              className="font-marvel text-2xl font-bold uppercase tracking-[0.28em] text-slate-100"
            >
              Portfolio
            </a>
            <p className="mt-3 max-w-md font-poppins text-sm text-slate-400">
              Building meaningful digital experiences through design systems and
              AI-powered products.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-poppins text-sm uppercase tracking-[0.12em] text-slate-400">
            <a href="#projects" className="transition-colors hover:text-white">
              Projects
            </a>
            <a
              href="#highlights"
              className="transition-colors hover:text-white"
            >
              Highlights
            </a>
            <a href="#contact" className="transition-colors hover:text-white">
              Contact
            </a>
            <a
              href="mailto:elsaelisayohana05@gmail.com"
              className="underline decoration-1 underline-offset-4 transition-colors hover:text-white"
            >
              Email Me
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-white/15 pt-5 font-poppins text-xs uppercase tracking-[0.14em] text-slate-500 sm:flex sm:items-center sm:justify-between">
          <p>(c) {year} Elsa Elisa Yohana</p>
          <p className="mt-2 sm:mt-0">
            Designed and developed with React + Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
