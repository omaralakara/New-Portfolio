import React, { useEffect, useState } from "react";

const CLOCK_D = 400;

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const SZ = CLOCK_D;
  const cx = SZ / 2;
  const cy = SZ / 2;

  const outerR = SZ / 2 - 1;
  const grooveR = outerR - 12;
  const chapterR = grooveR - 10;
  const faceR = chapterR - 1;

  const s = time.getSeconds();
  const m = time.getMinutes();
  const h = time.getHours() % 12;

  const sDeg = s * 6;
  const mDeg = m * 6 + s * 0.1;
  const hDeg = h * 30 + m * 0.5;

  const HourBaton = ({ index }) => {
    const deg = index * 30;
    return (
      <rect
        x={cx - 2.5}
        y={cy - chapterR + 6}
        width={5}
        height={22}
        rx={2.5}
        fill="rgba(255,255,255,0.88)"
        transform={`rotate(${deg}, ${cx}, ${cy})`}
      />
    );
  };

  const MinuteTick = ({ index }) => {
    if (index % 5 === 0) return null;
    const deg = index * 6;
    return (
      <rect
        x={cx - 0.6}
        y={cy - chapterR + 4}
        width={1.2}
        height={5}
        fill="rgba(255,255,255,0.28)"
        transform={`rotate(${deg}, ${cx}, ${cy})`}
      />
    );
  };

  const SwordHand = ({ deg, length, baseW, tipW, tailLen, color }) => {
    const path = `
      M ${cx},${cy - length}
      L ${cx + baseW / 2},${cy - length * 0.18}
      L ${cx + tipW / 2},${cy}
      L ${cx},${cy + tailLen}
      L ${cx - tipW / 2},${cy}
      L ${cx - baseW / 2},${cy - length * 0.18}
      Z
    `;

    return (
      <path d={path} fill={color} transform={`rotate(${deg}, ${cx}, ${cy})`} />
    );
  };

  const SecondsHand = ({ deg }) => (
    <g transform={`rotate(${deg}, ${cx}, ${cy})`}>
      <rect
        x={cx - 0.8}
        y={cy - faceR * 0.82}
        width={1.6}
        height={faceR * 0.82 + 28}
        rx={0.8}
        fill="rgba(255,255,255,0.75)"
      />
      <circle cx={cx} cy={cy + 22} r={5} fill="rgba(255,255,255,0.6)" />
    </g>
  );

  return (
    <svg width={SZ} height={SZ}>
      <circle cx={cx} cy={cy} r={outerR + 20} fill="rgba(0,0,0,0.6)" />
      <circle cx={cx} cy={cy} r={outerR} fill="#111" />

      <circle
        cx={cx}
        cy={cy}
        r={grooveR}
        fill="none"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth="10"
      />

      <circle cx={cx} cy={cy} r={chapterR} fill="#0d0d0d" />
      <circle cx={cx} cy={cy} r={faceR} fill="#090909" />

      {Array.from({ length: 60 }, (_, i) => (
        <MinuteTick key={i} index={i} />
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <HourBaton key={i} index={i} />
      ))}

      <SwordHand
        deg={hDeg}
        length={faceR * 0.5}
        baseW={10}
        tipW={3}
        tailLen={16}
        color="white"
      />
      <SwordHand
        deg={mDeg}
        length={faceR * 0.76}
        baseW={7}
        tipW={2}
        tailLen={14}
        color="white"
      />
      <SecondsHand deg={sDeg} />

      <circle cx={cx} cy={cy} r={9} fill="white" />
      <circle cx={cx} cy={cy} r={6} fill="#111" />
      <circle cx={cx} cy={cy} r={3} fill="white" />
    </svg>
  );
};

export default Clock;
