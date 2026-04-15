import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import CustomCursor from "./components/CustomCursor";

function App() {
  return (
    <>
      <CustomCursor /> {/* glow lives here now */}
      <Header />
      <HeroSection />
    </>
  );
}
export default App;
