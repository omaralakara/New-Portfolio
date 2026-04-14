import { useEffect } from "react";
import Header from "./components/header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import CustomCursor from "./components/CustomCursor";

function App() {
  // Mouse-following glow — updates a CSS variable, zero re-renders
  useEffect(() => {
    const handleMove = (e) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <>
      {/* ── FIXED BACKGROUND — 2 light sources + mouse glow ── */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Base — very dark blue-black */}
        <div className="absolute inset-0 bg-[#02000f]" />

        {/* Light source 1 — cyan, lower left */}
        <div className="aurora aurora-3" />

        {/* Light source 2 — blue/purple, bottom right */}
        <div className="aurora aurora-2" />

        {/* Mouse glow — lazily follows cursor */}
        <div className="mouse-glow" />
      </div>

      <CustomCursor />
      <Header />
      <HeroSection />
      <AboutSection />
    </>
  );
}

export default App;
