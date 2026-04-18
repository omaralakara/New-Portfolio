import React, { useEffect, useState } from "react";
import Clock from "./Clock";
// ─────────────────────────────────────────────────────────────
// Layout constants (used to shape the UI and clock positioning)
// ─────────────────────────────────────────────────────────────
const R = 220; // box cutout radius px
const GAP = 36; // gap-9 = 36px
const H = GAP / 2; // 18px half-gap offset
const TOP_H = 450; // top row height px

// ─────────────────────────────────────────────────────────────
// Hook: Detect if screen is desktop size (>= 1024px)
// Used to switch between mobile and desktop layouts
// ─────────────────────────────────────────────────────────────
const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isDesktop;
};

// ─────────────────────────────────────────────────────────────
// Main Component (Layout + Clock positioning)
// ─────────────────────────────────────────────────────────────
const Aboutme = () => {
  const isDesktop = useIsDesktop();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const base =
    "border border-white/[0.08] bg-[#0f0f0f] transition-all duration-500 ease-out";
  const hoverEffect =
    "hover:border-white/40 hover:bg-[#161616] hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]";

  // ── Mobile ────────────────────────────────────────────────────────────────
  if (!isDesktop) {
    return (
      <section className="bg-black py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`${base} ${hoverEffect} h-[320px] rounded-3xl`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ── Desktop ───────────────────────────────────────────────────────────────
  return (
    <section className="bg-black py-16">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Relative wrapper so clock can be absolutely positioned */}
        <div className="relative flex flex-col gap-9">
          {/* TOP ROW */}
          <div
            className="grid gap-9"
            style={{ gridTemplateColumns: "1fr 2.2fr 1fr" }}
          >
            <div className={`${base} ${hoverEffect} h-[450px] rounded-4xl`} />

            <div
              className={`${base} ${hoverEffect} h-[450px]`}
              style={{
                borderRadius: "2rem 2rem 2rem 2rem",
                WebkitMaskImage: `radial-gradient(circle ${R}px at 50% calc(100% + ${H}px), transparent 99%, black 100%)`,
                maskImage: `radial-gradient(circle ${R}px at 50% calc(100% + ${H}px), transparent 99%, black 100%)`,
              }}
            />

            <div className={`${base} ${hoverEffect} h-[450px] rounded-4xl`} />
          </div>

          {/* BOTTOM ROW */}
          <div className="grid grid-cols-2 gap-9">
            <div
              className={`${base} ${hoverEffect} h-[450px]`}
              style={{
                borderRadius: "2rem 0 2rem 2rem",
                WebkitMaskImage: `radial-gradient(circle ${R}px at calc(100% + ${H}px) -${H}px, transparent 99%, black 100%)`,
                maskImage: `radial-gradient(circle ${R}px at calc(100% + ${H}px) -${H}px, transparent 99%, black 100%)`,
              }}
            />

            <div
              className={`${base} ${hoverEffect} h-[450px]`}
              style={{
                borderRadius: "0 2rem 2rem 2rem",
                WebkitMaskImage: `radial-gradient(circle ${R}px at -${H}px -${H}px, transparent 99%, black 100%)`,
                maskImage: `radial-gradient(circle ${R}px at -${H}px -${H}px, transparent 99%, black 100%)`,
              }}
            />
          </div>

          {/* ── Clock — center pinned to row boundary ───────────────── */}
          <div
            style={{
              position: "absolute",
              top: `${TOP_H + H}px`, // 450 + 18 = 468px
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 20,
              borderRadius: "50%",
              background: "#090909",
              padding: "3px",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Clock time={time} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboutme;
