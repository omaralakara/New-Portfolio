import React, { useEffect, useState } from "react";

const R = 220; // circle radius px
const GAP = 36; // gap-9 = 36px
const H = GAP / 2; // 18px

// Detects if we're on desktop (≥ 1024px)
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

const Aboutme = () => {
  const isDesktop = useIsDesktop();

  // 1. Added transition, hover border color, and a subtle bg glow
  const base =
    "border border-white/[0.08] bg-[#0f0f0f] transition-all duration-500 ease-out";
  const hoverEffect =
    "hover:border-white/40 hover:bg-[#161616] hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]";
  // ── Mobile layout — 5 stacked cards ──────────────────────────────────────
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

  // ── Desktop layout — grid with circle cutouts ─────────────────────────────
  return (
    <section className="bg-black py-16">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex flex-col gap-9">
          {/* TOP ROW */}
          <div
            className="grid gap-9"
            style={{ gridTemplateColumns: "1fr 2.2fr 1fr" }}
          >
            {/* Box 1 */}
            <div className={`${base} ${hoverEffect} h-[450px] rounded-4xl`} />

            {/* Box 2 — semicircle cut at bottom center */}
            <div
              className={`${base} ${hoverEffect} h-[450px]`}
              style={{
                borderRadius: "2rem 2rem 2rem 2rem",
                WebkitMaskImage: `radial-gradient(circle ${R}px at 50% calc(100% + ${H}px), transparent 99%, black 100%)`,
                maskImage: `radial-gradient(circle ${R}px at 50% calc(100% + ${H}px), transparent 99%, black 100%)`,
              }}
            />

            {/* Box 3 */}
            <div className={`${base} ${hoverEffect} h-[450px] rounded-4xl`} />
          </div>

          {/* BOTTOM ROW */}
          <div className="grid grid-cols-2 gap-9">
            {/* Box 4 — quarter circle cut from top-right */}
            <div
              className={`${base} ${hoverEffect} h-[450px]`}
              style={{
                borderRadius: "2rem 0 2rem 2rem",
                WebkitMaskImage: `radial-gradient(circle ${R}px at calc(100% + ${H}px) -${H}px, transparent 99%, black 100%)`,
                maskImage: `radial-gradient(circle ${R}px at calc(100% + ${H}px) -${H}px, transparent 99%, black 100%)`,
              }}
            />

            {/* Box 5 — quarter circle cut from top-left */}
            <div
              className={`${base} ${hoverEffect} h-[450px]`}
              style={{
                borderRadius: "0 2rem 2rem 2rem",
                WebkitMaskImage: `radial-gradient(circle ${R}px at -${H}px -${H}px, transparent 99%, black 100%)`,
                maskImage: `radial-gradient(circle ${R}px at -${H}px -${H}px, transparent 99%, black 100%)`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboutme;
