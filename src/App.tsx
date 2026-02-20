import MainLayout from "./layouts/MainLayout";
import useSmoothScroll from "./hooks/useSmoothScroll";

const App = () => {
  useSmoothScroll();

  return <MainLayout />;
};

export default App;
