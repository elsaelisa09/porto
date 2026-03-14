import MainLayout from "./layouts/MainLayout";
import useSmoothScroll from "./hooks/useSmoothScroll";
import CalendarLayout from "./layouts/CalendarLayout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const HomePage = () => {
  useSmoothScroll();
  return <MainLayout />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/calendar" element={<CalendarLayout />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
