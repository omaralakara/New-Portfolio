import { useState, useEffect, useRef } from "react";
import { motion, animate } from "framer-motion";
import Spline from "@splinetool/react-spline";

// ── Counter: Refined Logic ─────────────────────────────────────────────────────
const Counter = ({ to, suffix = "" }) => {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(0, to, {
            duration: 2,
            ease: "circOut",
            onUpdate: (v) => {
              node.textContent = Math.floor(v) + suffix;
            },
          });
          observer.unobserve(node);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [to, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

// ── Hero ──────────────────────────────────────────────────────────────────────
const Hero = () => {
  const [splineReady, setSplineReady] = useState(false);
  const [mountSpline, setMountSpline] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const t = setTimeout(() => setMountSpline(true), 2000);
    return () => clearTimeout(t);
  }, [isMobile]);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        minHeight: "100dvh",
        background: "linear-gradient(180deg, #0a0a14 0%, #050508 100%)", // Rich base
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* ── BACKGROUND LAYER ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        {/* 1. Top Ambient Light Leak */}
        <div
          style={{
            position: "absolute",
            top: -150,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            height: 600,
            background:
              "radial-gradient(circle at 50% 0%, rgba(34,211,238,0.08) 0%, transparent 75%)",
            filter: "blur(100px)",
          }}
        />

        {/* 2. The Fading Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
            // This is the magic: Grid disappears before it hits the bottom
            WebkitMaskImage:
              "linear-gradient(to bottom, black 20%, transparent 85%)",
            maskImage: "linear-gradient(to bottom, black 20%, transparent 85%)",
            opacity: 0.6,
          }}
        />

        {/* 3. Bottom Deep Blur (The "Melt") */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40%",
            background:
              "linear-gradient(to top, #050508 20%, transparent 100%)",
            zIndex: 2,
          }}
        />
      </div>
      {/* ── ALIGNED CONTENT WRAPPER ── */}
      <div className="container mx-auto px-6 relative z-10">
        <div
          className="hero-inner"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 40,
            width: "100%",
          }}
        >
          {/* ── LEFT ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="hero-left"
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 28,
            }}
          >
            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "5px 14px 5px 8px",
                background: "rgba(34,211,238,0.05)",
                border: "1px solid rgba(34,211,238,0.15)",
                borderRadius: 100,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#22d3ee",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#22d3ee",
                  boxShadow: "0 0 6px #22d3ee",
                  animation: "blink 2s ease-in-out infinite",
                }}
              />
              Available for Work
            </div>

            {/* Headline */}
            <h1
              style={{
                fontSize: "clamp(38px, 5.5vw, 72px)",
                fontWeight: 900,
                lineHeight: 0.92,
                letterSpacing: "-0.04em",
                color: "#fff",
                margin: 0,
              }}
            >
              Code That <span style={{ color: "#22d3ee" }}>Converts.</span>
              <br />
              Products That <span style={{ color: "#3b82f6" }}>Scale.</span>
            </h1>

            {/* Subtext */}
            <p
              style={{
                fontSize: "clamp(13px, 1.4vw, 15px)",
                color: "#A1A1AA",
                lineHeight: 1.7,
                maxWidth: 440,
                margin: 0,
              }}
            >
              Full-stack engineering · Cloud-native solutions ·{" "}
              <span style={{ color: "#22d3ee", fontWeight: 500 }}>
                FinTech Architecture
              </span>
            </p>

            {/* Stats */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "rgba(9,9,11,0.55)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: 14,
                overflow: "hidden",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              {[
                { to: 3, suffix: "+", label: "Years" },
                { to: 24, suffix: "+", label: "Projects" },
                { to: 100, suffix: "%", label: "Trust" },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "10px 26px",
                    borderRight:
                      i !== 2 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: "clamp(17px, 2vw, 22px)",
                      fontWeight: 700,
                      color: "#e4e4e7",
                    }}
                  >
                    <Counter to={s.to} suffix={s.suffix} />
                  </span>
                  <span
                    style={{
                      fontSize: 8,
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#71717A",
                      marginTop: 3,
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT — SPLINE ── */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              style={{
                position: "relative",
                flex: "0 0 auto",
                width: "min(520px, 48%)",
                height: 580,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 1,
                  overflow: "hidden",
                }}
              >
                {mountSpline ? (
                  <>
                    {!splineReady && (
                      <div className="flex items-center justify-center absolute inset-0 z-10">
                        <div className="w-8 h-8 border-2 border-white/5 border-t-cyan-400 rounded-full animate-spin" />
                      </div>
                    )}
                    <Spline
                      scene="https://prod.spline.design/4wdSfkDAruaZ-0A5/scene.splinecode"
                      onLoad={() => setSplineReady(true)}
                      style={{
                        width: "100%",
                        height: "100%",
                        transform: "scale(1.2) translate(10px, 10px)",
                        opacity: splineReady ? 1 : 0,
                        transition: "opacity 0.8s ease",
                      }}
                    />
                  </>
                ) : null}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom Fade Out */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "30%",
          background: "linear-gradient(to top, #050508, transparent)",
          zIndex: 30,
          pointerEvents: "none",
        }}
      />

      <style>{`
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: .2; } }
        @keyframes spin { to { transform: rotate(360deg); } }

        @media (max-width: 900px) {
          .hero-inner {
            flex-direction: column !important;
            text-align: center !important;
          }
          .hero-left {
            align-items: center !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
