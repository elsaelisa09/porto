import SectionWrapper from "../components/SectionWrapper";
import profil from "../assets/profil.png";

const Home = () => {
  return (
    <SectionWrapper
      id="home"
      title=" "
      containerClassName="max-w-6xl pt-12 md:pt-0"
      contentClassName="max-w-none"
    >
      <h1 className="font-alexandria font-bold text-[59px] leading-tight text-slate-900 whitespace-nowrap">
        CREATIVE DESIGNER &amp; AI ENGINEER
      </h1>
      <div className="mt-0 ml-[750px] flex flex-col gap-2 text-[28px] font-chathura uppercase tracking-[0.35em] text-slate-700">
        <div className="flex items-center gap-10">
          <span>Based</span>
          <span>in</span>
          <span>Indonesia</span>
        </div>
        <div className="mt-[-20px] ml-[230px] text-[32px] font-bold tracking-[0.25em]">Lampung</div>
      </div>
      <div className="mt-[-90px] ml-[550px]">
        <img src={profil} alt="Profil" className="w-[35%] h-auto" />
      </div>
      <div className="font-poppins font-semibold text-[16px] text-black mt-[-120px] ml-[380px]">
        <div >
          <span>/COMPUTER VISION</span>
        </div>
        <div>
          <span>/UI-UX DESIGN</span>
        </div>
        <div>
          <span>/AI ENGINEERING</span>
        </div>
        <div>
          <span>/NLP AND RAG</span>
        </div>
        <div>
          <span>/MULTIMODAL ML</span>
        </div>
      </div>
      <div className="mt-[40px] font-chathura uppercase tracking-[0.15em] text-slate-900 max-w-2xl mx-auto text-center">
        <p className="text-[26px] leading-[1]">I'm an experienced UI/UX designer crafting memorable digital experiences through human-centered design and AI technologies such as Computer Vision, NLP, RAG, and multimodal machine learning</p>
      </div>

    </SectionWrapper>
  );
};

export default Home;
