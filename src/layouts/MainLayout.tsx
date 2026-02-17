import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../sections/Home";
import Projects from "../sections/Projects";
import Highlights from "../sections/Highlights";
import Contact from "../sections/Contact";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="pt-24">
        <Home />
        <Projects />
        <Highlights />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
