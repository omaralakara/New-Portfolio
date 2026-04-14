import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import CustomCursor from "./components/CustomCursor";

function App() {
  return (
    <>
      {/* ── background ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
        <div className="w-full h-full bg-[linear-gradient(to_right,#22d3ee_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* ── glow element ── */}
      <div
        id="cursor-glow"
        className="pointer-events-none fixed top-0 left-0 w-[220px] h-[220px] rounded-full -translate-x-1/2 -translate-y-1/2 blur-[60px] opacity-40 z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.8) 0%, rgba(34,211,238,0.25) 40%, transparent 70%)",
        }}
      />

      <CustomCursor />
      <Header />
      <HeroSection />
      {/* <AboutSection /> */}
    </>
  );
}

export default App;
