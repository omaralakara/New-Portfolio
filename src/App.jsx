import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import CustomCursor from "./components/CustomCursor";

function App() {
  return (
    <>
      {/* ── FIXED SPACE BACKGROUND
            Lives here once, stays behind every section on the whole site.
            -z-10 puts it behind everything. pointer-events-none so it
            never blocks clicks.                                          ── */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Purple nebula — top right */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-10%",
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(88,28,219,0.35) 0%, rgba(109,40,217,0.15) 40%, transparent 70%)",
          }}
        />

        {/* Teal nebula — bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "-8%",
            width: 620,
            height: 620,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(8,145,178,0.30) 0%, rgba(6,182,212,0.12) 40%, transparent 70%)",
          }}
        />

        {/* Faint indigo — center, ties the two together */}
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "35%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(49,10,101,0.20) 0%, transparent 65%)",
          }}
        />
      </div>

      <CustomCursor />
      <Header />
      <HeroSection />
    </>
  );
}

export default App;
