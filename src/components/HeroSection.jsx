// STEP 6 — GSAP entrance animations.
// Only animates opacity + transform — zero layout cost, runs on GPU.
// gsap.context() scopes everything and ctx.revert() cleans up on unmount.

import { useState, useEffect, useRef, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import robotFallback from "../assets/robot.png";

// ── Spline lazy loaded so it never blocks the initial render
const Spline = lazy(() => import("@splinetool/react-spline"));

// ── Roles defined outside — prevents typewriter glitch
const ROLES = [
  "Software Developer",
  "Cloud Architect",
  "Fintech Solutions",
  "Problem Solver",
];

// ─── LOADING ANIMATION ────────────────────────────────────────────────────────
const LoadingLogo = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
    className="relative flex flex-col items-center justify-center w-48 h-48"
  >
    <div className="relative flex items-center justify-center w-full h-full">
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-16 h-16 bg-cyan-500/20 blur-2xl rounded-full"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute w-32 h-32 border border-dashed border-cyan-500/20 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute w-24 h-24 border-t-2 border-l-2 border-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.2)]"
      />
      <motion.div
        animate={{ top: ["10%", "90%", "10%"], opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute w-full h-px bg-linear-to-r from-transparent via-cyan-400 to-transparent z-10"
      />
    </div>
    <div className="mt-8 flex flex-col items-center gap-2">
      <motion.span
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
      >
        System Boot
      </motion.span>
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              backgroundColor: ["#18181b", "#22d3ee", "#18181b"],
              scale: [1, 1.5, 1],
            }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            className="w-1 h-1 rounded-full"
          />
        ))}
      </div>
    </div>
  </motion.div>
);

// ─── TYPEWRITER HOOK ──────────────────────────────────────────────────────────
function useTypewriter(words) {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const textRef = useRef("");

  useEffect(() => {
    let timeout;
    indexRef.current = 0;
    isDeletingRef.current = false;
    textRef.current = "";

    const tick = () => {
      const current = words[indexRef.current % words.length];
      const isDeleting = isDeletingRef.current;
      if (!isDeleting) {
        textRef.current = current.slice(0, textRef.current.length + 1);
        setDisplayed(textRef.current);
        if (textRef.current === current) {
          timeout = setTimeout(() => {
            isDeletingRef.current = true;
            tick();
          }, 2000);
          return;
        }
        timeout = setTimeout(tick, 80);
      } else {
        textRef.current = current.slice(0, textRef.current.length - 1);
        setDisplayed(textRef.current);
        if (textRef.current === "") {
          isDeletingRef.current = false;
          indexRef.current = indexRef.current + 1;
          timeout = setTimeout(tick, 400);
          return;
        }
        timeout = setTimeout(tick, 45);
      }
    };
    timeout = setTimeout(tick, 800);
    return () => clearTimeout(timeout);
  }, [words]);

  return displayed;
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  const role = useTypewriter(ROLES);
  const [showRobot, setShowRobot] = useState(false);
  const [enableSpline, setEnableSpline] = useState(false);
  const [lowPerfMode] = useState(() => {
    if (typeof window === "undefined") return false;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isMobile = window.innerWidth < 1024;
    const lowCoreCount =
      typeof navigator.hardwareConcurrency === "number" &&
      navigator.hardwareConcurrency <= 4;
    const saveData = Boolean(navigator.connection?.saveData);
    return media.matches || isMobile || lowCoreCount || saveData;
  });
  const containerRef = useRef(); // GSAP scope

  // Show robot after loading animation
  useEffect(() => {
    const timer = setTimeout(() => setShowRobot(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Delay heavy Spline load until after intro + idle time.
  useEffect(() => {
    if (!showRobot || lowPerfMode) return;

    let timeoutId;
    let idleId;

    const startSpline = () => {
      timeoutId = window.setTimeout(() => setEnableSpline(true), 800);
    };

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(startSpline, { timeout: 1500 });
    } else {
      startSpline();
    }

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, [showRobot, lowPerfMode]);

  // ── GSAP entrance ──────────────────────────────────────────────────────────
  // Runs once on mount. Only uses opacity + translateY + skewY (all GPU, no layout cost).
  // gsap.context() scopes selectors to containerRef so they never
  // accidentally target elements in other sections.
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hide everything first so there's no flash before the animation runs
      gsap.set([".hero-tagline", ".hero-role", ".hero-desc"], {
        opacity: 0,
        y: 40,
      });

      // Build the timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl
        // Tagline sweeps up — slight skew gives it an editorial feel
        .to(".hero-tagline", {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 0.9,
          delay: 0.2,
        })
        // Role line follows
        .to(
          ".hero-role",
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
          },
          "-=0.4",
        ) // starts 0.4s before tagline finishes — feels connected
        // Description last
        .to(
          ".hero-desc",
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
          },
          "-=0.35",
        );
    }, containerRef); // ← scoped to this section only

    // Cleanup — kills all animations and reverts inline styles on unmount
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-dvh overflow-hidden flex items-center"
    >
      <div
        className="w-full h-full grid
                   grid-cols-1              grid-rows-[55fr_45fr]
                   lg:grid-cols-[55fr_45fr] lg:grid-rows-1
                   pt-20 px-6 container mx-auto gap-6"
      >
        {/* ── LEFT — text content ── */}
        <div
          className="flex flex-col justify-center
                     items-center text-center
                     lg:items-start lg:text-left"
        >
          {/* Tagline — GSAP target: .hero-tagline */}
          <h1
            className="hero-tagline
                       text-[clamp(2.8rem,6.5vw,5.2rem)]
                       font-black tracking-tight leading-[1.05]
                       text-white mb-6"
            style={{ transform: "skewY(-1.5deg)" }} // starts slightly skewed, GSAP resets to 0
          >
            I Build Things
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #22d3ee 0%, #67e8f9 45%, #3b82f6 100%)",
              }}
            >
              For The Web.
            </span>
          </h1>

          {/* Role line — GSAP target: .hero-role */}
          <div className="hero-role flex items-center gap-3 mb-6 h-6">
            <span className="w-6 h-px bg-cyan-500/70 shrink-0 hidden lg:block" />
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400">
              {role}
              <span
                className="inline-block w-[2px] h-[13px] bg-cyan-400
                               ml-[2px] align-middle animate-pulse"
              />
            </span>
          </div>

          {/* Description — GSAP target: .hero-desc */}
          <p
            className="hero-desc
                       text-zinc-500 text-sm leading-[1.85]
                       max-w-[380px] lg:max-w-[400px]"
          >
            I craft fast, scalable web experiences — from pixel-perfect
            frontends to cloud-native backends. Based in{" "}
            <span className="text-zinc-300 font-medium">Lebanon</span>, shipping{" "}
            <span className="text-zinc-300 font-medium">globally</span>.
          </p>
        </div>

        {/* ── RIGHT — Spline robot ── */}
        <div className="relative w-full h-full flex items-center justify-center min-h-[260px] sm:min-h-[320px] lg:min-h-[400px]">
          {/* Ambient glow behind robot (blends into page, no card edges) */}
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute left-[42%] top-[50%] h-[620px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[108px]"
              style={{
                background:
                  "radial-gradient(circle, rgba(34,211,238,0.26) 0%, rgba(14,165,233,0.17) 38%, transparent 78%)",
              }}
            />
            <div
              className="absolute left-[58%] top-[52%] h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
              style={{
                background:
                  "radial-gradient(circle, rgba(96,165,250,0.18) 0%, rgba(129,140,248,0.11) 40%, transparent 76%)",
              }}
            />
          </div>
          <AnimatePresence mode="wait">
            {!showRobot ? (
              <motion.div key="loader">
                <LoadingLogo />
              </motion.div>
            ) : lowPerfMode ? (
              <motion.div
                key="robot-fallback"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.75 }}
                className="relative z-10 w-full h-full flex items-center justify-center"
              >
                <img
                  src={robotFallback}
                  alt="Robot preview"
                  loading="lazy"
                  className="w-[88%] max-w-[540px] object-contain drop-shadow-[0_0_30px_rgba(34,211,238,0.25)]"
                />
              </motion.div>
            ) : (
              <motion.div
                key="spline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="relative z-10 w-full h-full"
              >
                <Suspense fallback={null}>
                  <div className="w-full h-full scale-[1.05] origin-center">
                    {enableSpline ? <Spline scene="/scene.splinecode" /> : null}
                  </div>
                </Suspense>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
