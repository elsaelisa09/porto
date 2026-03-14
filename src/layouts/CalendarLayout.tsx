import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Calendar from "../sections/Calendar";

const CalendarLayout = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="pt-24">
        <Calendar />
      </main>
      <Footer />
    </div>
  );
};

export default CalendarLayout;
