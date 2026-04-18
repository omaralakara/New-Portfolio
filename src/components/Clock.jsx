import React from "react";
// ─────────────────────────────────────────────────────────────
// Premium Clock Component (SVG-based analog watch)
// ─────────────────────────────────────────────────────────────
const CLOCK_D = 400; // clock diameter px
function Clock({ time }) {
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

  // ─────────────────────────────────────────
  // Hour markers (big white bars)
  // Each one is rotated around the center
  // ─────────────────────────────────────────
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

  // ─────────────────────────────────────────
  // Minute ticks (small lines between hours)
  // ─────────────────────────────────────────
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

  // ─────────────────────────────────────────
  // Generic "premium" watch hand (hour/minute)
  // Drawn as a tapered shape (luxury style)
  // ─────────────────────────────────────────
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

  // ─────────────────────────────────────────
  // Seconds hand (thin line + circle tail)
  // ─────────────────────────────────────────
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
  // ─────────────────────────────────────────
  // Render SVG Clock
  // ─────────────────────────────────────────
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
export default Clock;
