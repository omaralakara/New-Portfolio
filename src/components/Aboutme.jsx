import React, { useEffect, useState } from "react";

// ─── Layout constants ─────────────────────────────────────────────────────────
const R = 220; // box cutout radius px
const GAP = 36; // gap-9 = 36px
const H = GAP / 2; // 18px half-gap offset
const TOP_H = 450; // top row height px
const CLOCK_D = 400; // clock diameter px

// ─── Desktop detector ─────────────────────────────────────────────────────────
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

// ─── Premium Clock ────────────────────────────────────────────────────────────
function PremiumClock({ time }) {
  const SZ = CLOCK_D;
  const cx = SZ / 2,
    cy = SZ / 2;

  // Layer radii
  const outerR = SZ / 2 - 1; // bezel outer edge
  const grooveR = outerR - 12; // bezel inner groove
  const chapterR = grooveR - 10; // chapter ring (tick marks live here)
  const faceR = chapterR - 1; // clean dial face

  // Time
  const s = time.getSeconds();
  const ms = time.getMilliseconds();
  const m = time.getMinutes();
  const h = time.getHours() % 12;

  const sDeg = s * 6;
  const mDeg = m * 6 + s * 0.1;
  const hDeg = h * 30 + m * 0.5;

  // ── Baton hour marker (rectangle, rotated around center) ──────────────────
  const HourBaton = ({ index }) => {
    const deg = index * 30;
    const batonH = 22;
    const batonW = 5;
    const outerY = cy - chapterR + 6;
    return (
      <rect
        x={cx - batonW / 2}
        y={outerY}
        width={batonW}
        height={batonH}
        rx={batonW / 2}
        fill="rgba(255,255,255,0.88)"
        transform={`rotate(${deg}, ${cx}, ${cy})`}
      />
    );
  };

  // ── Minute dot (small tick between hour markers) ──────────────────────────
  const MinuteTick = ({ index }) => {
    if (index % 5 === 0) return null; // skip — hour baton is here
    const deg = index * 6;
    const tickH = index % 5 === 0 ? 10 : 5;
    const tickW = 1.2;
    const outerY = cy - chapterR + 4;
    return (
      <rect
        x={cx - tickW / 2}
        y={outerY}
        width={tickW}
        height={tickH}
        fill="rgba(255,255,255,0.28)"
        transform={`rotate(${deg}, ${cx}, ${cy})`}
      />
    );
  };

  // ── Sword / dauphine hand ──────────────────────────────────────────────────
  // Drawn pointing up (deg=0 = 12 o'clock), rotated around center
  const SwordHand = ({
    deg,
    length,
    baseW,
    tipW,
    tailLen,
    color,
    opacity = 1,
  }) => {
    // Body: tapered from baseW at center to tipW at tip
    const path = [
      `M ${cx},${cy - length}`, // tip (top)
      `L ${cx + baseW / 2},${cy - length * 0.18}`, // right shoulder
      `L ${cx + tipW / 2},${cy}`, // right base
      `L ${cx},${cy + tailLen}`, // tail
      `L ${cx - tipW / 2},${cy}`, // left base
      `L ${cx - baseW / 2},${cy - length * 0.18}`, // left shoulder
      "Z",
    ].join(" ");

    return (
      <path
        d={path}
        fill={color}
        fillOpacity={opacity}
        transform={`rotate(${deg}, ${cx}, ${cy})`}
      />
    );
  };

  // ── Seconds hand ──────────────────────────────────────────────────────────
  // Thin stem + small circle counterweight
  const SecondsHand = ({ deg }) => (
    <g transform={`rotate(${deg}, ${cx}, ${cy})`}>
      {/* Main stem */}
      <rect
        x={cx - 0.8}
        y={cy - faceR * 0.82}
        width={1.6}
        height={faceR * 0.82 + 28}
        rx={0.8}
        fill="rgba(255,255,255,0.75)"
      />
      {/* Counterweight lollipop */}
      <circle cx={cx} cy={cy + 22} r={5} fill="rgba(255,255,255,0.6)" />
    </g>
  );

  return (
    <svg
      width={SZ}
      height={SZ}
      viewBox={`0 0 ${SZ} ${SZ}`}
      style={{ display: "block" }}
    >
      {/* ── Ambient shadow ring ─────────────────────────────────────── */}
      <circle cx={cx} cy={cy} r={outerR + 20} fill="rgba(0,0,0,0.6)" />

      {/* ── Outer bezel ─────────────────────────────────────────────── */}
      <circle
        cx={cx}
        cy={cy}
        r={outerR}
        fill="#111111"
        stroke="rgba(255,255,255,0.10)"
        strokeWidth="1"
      />

      {/* ── Bezel inner groove ring ──────────────────────────────────── */}
      <circle
        cx={cx}
        cy={cy}
        r={grooveR}
        fill="none"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth="10"
      />

      {/* ── Chapter ring background ──────────────────────────────────── */}
      <circle cx={cx} cy={cy} r={chapterR} fill="#0d0d0d" />

      {/* ── Clean dial face ──────────────────────────────────────────── */}
      <circle cx={cx} cy={cy} r={faceR} fill="#090909" />

      {/* ── Very subtle inner shadow on face edge ───────────────────── */}
      <circle
        cx={cx}
        cy={cy}
        r={faceR}
        fill="none"
        stroke="rgba(0,0,0,0.6)"
        strokeWidth="6"
      />

      {/* ── Minute ticks ─────────────────────────────────────────────── */}
      {Array.from({ length: 60 }, (_, i) => (
        <MinuteTick key={i} index={i} />
      ))}

      {/* ── Hour baton markers ───────────────────────────────────────── */}
      {Array.from({ length: 12 }, (_, i) => (
        <HourBaton key={i} index={i} />
      ))}

      {/* ── Hour hand ────────────────────────────────────────────────── */}
      <SwordHand
        deg={hDeg}
        length={faceR * 0.5}
        baseW={10}
        tipW={3}
        tailLen={16}
        color="rgba(255,255,255,0.96)"
      />

      {/* ── Minute hand ──────────────────────────────────────────────── */}
      <SwordHand
        deg={mDeg}
        length={faceR * 0.76}
        baseW={7}
        tipW={2}
        tailLen={14}
        color="rgba(255,255,255,0.90)"
      />

      {/* ── Seconds hand ─────────────────────────────────────────────── */}
      <SecondsHand deg={sDeg} />

      {/* ── Center cap — 3 layers ────────────────────────────────────── */}
      <circle cx={cx} cy={cy} r={9} fill="rgba(255,255,255,0.90)" />
      <circle cx={cx} cy={cy} r={6} fill="#111111" />
      <circle cx={cx} cy={cy} r={3} fill="rgba(255,255,255,0.80)" />
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
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
            <PremiumClock time={time} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboutme;
