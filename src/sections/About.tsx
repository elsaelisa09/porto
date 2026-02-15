import SectionWrapper from "../components/SectionWrapper";
import profil2 from "../assets/profil2.jpg";

const About = () => {
  return (
    <SectionWrapper
      id="about"
      title="About Me"
      containerClassName="py-32 md:py-48"
      sectionClassName="bg-black"
      titleClassName="text-white text-6xl md:text-7xl lg:text-8xl font-alexandria font-bold tracking-tight mb-16"
      contentClassName="max-w-none"
    >
      <div className="flex flex-col gap-32 md:gap-40 w-full max-w-7xl mx-auto">
        {/* Photo and Description Section */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 w-full items-start">
          {/* Photo */}
          <div className="flex-shrink-0 lg:w-[380px]">
            <img
              src={profil2}
              alt="Profile"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Description */}
          <div className="flex-1 flex flex-col gap-12">
            <p className="font-poppins font-light text-[20px] md:text-[22px] lg:text-[24px] text-white leading-relaxed">
              I am a final-year Informatics Engineering student at Institut
              Teknologi Sumatera (ITERA) with a strong interest in Computer
              Vision, Artificial Intelligence, and design (UI/UX). I enjoy
              building intelligent systems that not only work accurately but
              also feel intuitive and meaningful for users. Throughout my
              academic journey, I have actively contributed to student
              organizations including HMIF ITERA, KM ITERA, and Sobat Bumi
              Lampung, where I developed leadership, teamwork, and communication
              skills while collaborating on impactful initiatives.
            </p>

            {/* Expertise */}
            <div className="pt-8 border-t border-gray-700">
              <h4 className="font-poppins font-semibold text-[16px] md:text-[18px] text-gray-400 mb-6 tracking-wider">
                EXPERTISE
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="font-poppins text-[18px] md:text-[20px] text-white">
                  Computer Vision
                </div>
                <div className="font-poppins text-[18px] md:text-[20px] text-white">
                  UI/UX Design
                </div>
                <div className="font-poppins text-[18px] md:text-[20px] text-white">
                  AI Engineering
                </div>
                <div className="font-poppins text-[18px] md:text-[20px] text-white">
                  NLP & RAG Systems
                </div>
                <div className="font-poppins text-[18px] md:text-[20px] text-white">
                  Multimodal ML
                </div>
                <div className="font-poppins text-[18px] md:text-[20px] text-white">
                  Human-Centered Design
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights Section */}
        <div className="w-full">
          <h3 className="font-poppins font-semibold text-[20px] md:text-[24px] text-gray-400 mb-10 pb-6 border-b border-gray-700 tracking-wider">
            HIGHLIGHTS
          </h3>
          <ul className="font-jetbrains text-[16px] md:text-[18px] text-white space-y-4 leading-relaxed">
            <li className="flex gap-4">
              <span className="text-gray-500 flex-shrink-0">01</span>
              <span>
                Winner| "Desa Energi Berdikari" Project (Team) - Pertamina
                Foundation 2024 - 2026
              </span>
            </li>
            <li className="flex gap-4">
              <span className="text-gray-500 flex-shrink-0">02</span>
              <span>Teaching Assistant | Interaction Design — ITERA 2025</span>
            </li>
            <li className="flex gap-4">
              <span className="text-gray-500 flex-shrink-0">03</span>
              <span>
                Head of Academic & Scholarship Division - HIMPUNAN MAHASISWA
                INFORMATIKA ITERA 2025
              </span>
            </li>
            <li className="flex gap-4">
              <span className="text-gray-500 flex-shrink-0">04</span>
              <span>
                Internship | AI Engineering (RAG System) - PT Pertamina Hulu
                Rokan 2025
              </span>
            </li>
            <li className="flex gap-4">
              <span className="text-gray-500 flex-shrink-0">05</span>
              <span>
                Sobat Bumi Scholarship Recipient - Pertamina Foundation 2024 -
                2025
              </span>
            </li>
            <li className="flex gap-4">
              <span className="text-gray-500 flex-shrink-0">06</span>
              <span>
                2nd Place| UI/UX Competition (Team) - HIMPUNAN MAHASISWA
                INFORMATIKA ITERA 2024
              </span>
            </li>
            <li className="flex gap-4">
              <span className="text-gray-500 flex-shrink-0">07</span>
              <span>
                Speaker | IFGTPB 2024 Scholarship Session - HIMPUNAN MAHASISWA
                INFORMATIKA ITERA 2024
              </span>
            </li>
            <li className="flex gap-4">
              <span className="text-gray-500 flex-shrink-0">08</span>
              <span>
                Secretary | Information Technology Division - KM ITERA 2024
              </span>
            </li>
            <li className="flex gap-4">
              <span className="text-gray-500 flex-shrink-0">09</span>
              <span>
                Teaching Assistant | Introduction to Computers and Software —
                ITERA 2023
              </span>
            </li>
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;
