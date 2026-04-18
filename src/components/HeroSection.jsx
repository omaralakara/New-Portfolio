import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full bg-black text-white overflow-hidden"
    >
      {/* THE ALIGNMENT WRAPPER */}
      <div className="container mx-auto flex min-h-screen flex-col justify-between px-4 py-8 pt-20 sm:px-6 sm:py-10 sm:pt-24 lg:px-8">
        {/* --- MIDDLE SECTION --- */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center sm:px-6 pb-24 sm:pb-16">
          {/* --- 1. BUTTON WRAPPER --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="group relative mb-5 pointer-events-auto sm:mb-6"
          >
            {" "}
            {/* The Multi-Color Aura Glow */}
            <div className="absolute -inset-[2px] rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
              <div
                className="absolute inset-[-250%] animate-[spin_4s_linear_infinite]"
                style={{
                  background: `conic-gradient(
          from 0deg, 
          transparent 0deg, 
          #fbbf24 45deg,   /* Yellow */
          #ef4444 90deg,   /* Red */
          #ec4899 135deg,  /* Pink */
          #3b82f6 180deg,  /* Blue */
          transparent 270deg
        )`,
                }}
              />
            </div>
            <a
              href="https://linkedin.com/in/omar-al-akara"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center gap-2 rounded-full border border-zinc-900 bg-black px-4 py-2 text-[9px] font-bold uppercase tracking-widest transition-all duration-300 group-hover:bg-zinc-950 sm:px-5 sm:text-[10px]"
            >
              <span className="text-zinc-500 transition-colors duration-300 group-hover:text-white">
                Say hi on
              </span>

              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-3 w-3 text-[#0077B5] transition-all duration-300 group-hover:scale-110 sm:h-3.5 sm:w-3.5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </motion.div>

          {/* OMAR Main text*/}
          <h1 className="select-none text-[18vw] font-black uppercase leading-[0.85] tracking-tighter sm:text-[14vw] lg:text-[11vw]">
            {"OMAR.AK".split("").map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + i * 0.06,
                  ease: "easeOut",
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </h1>

          {/* SUBTEXT - More margin for airiness */}
          <div className="pointer-events-auto mt-6 max-w-[85vw] sm:mt-10 sm:max-w-3xl lg:mt-14 lg:max-w-4xl">
            {/* small uppercase line */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75, ease: "easeOut" }}
              className="mb-3 text-[9px] uppercase tracking-[0.2em] text-zinc-500 sm:mb-4 sm:text-[10px] sm:tracking-[0.32em] md:text-xs md:tracking-[0.4em]"
            >
              Building cloud-native fintech and blockchain solutions that
            </motion.p>
            {/* H2 — "deliver" first, then "real impact." */}
            <h2 className="text-2xl font-serif italic lowercase tracking-tight text-zinc-100 opacity-90 sm:text-4xl md:text-6xl lg:text-7xl">
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
                className="inline-block mr-1 sm:mr-2 md:mr-3"
              >
                deliver
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.05, ease: "easeOut" }}
                className="inline-block bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, #fbbf24, #ef4444, #ec4899, #3b82f6)`,
                  WebkitBackgroundClip: "text",
                }}
              >
                real impact
              </motion.span>
            </h2>
          </div>
        </div>

        {/* --- BOTTOM SECTION --- */}
        <div className="z-10 mt-auto flex w-full flex-row items-end justify-center gap-8 pb-8 sm:justify-between sm:gap-4 sm:pb-4">
          {/* Location Section */}
          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2, ease: "easeOut" }}
            className="flex flex-col items-center gap-2"
          >
            <div className="text-xl text-rose-400 sm:text-2xl">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div className="flex flex-col text-center text-[9px] font-bold uppercase leading-tight tracking-[0.16em] sm:text-[10px] sm:tracking-[0.2em]">
              <span>BASED IN BEKAA,</span>
              <span className="text-zinc-500">LEBANON</span>
            </div>
          </motion.div>

          {/* Role Section */}
          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2, ease: "easeOut" }}
            className="flex flex-col items-center gap-2"
          >
            <div className="text-xl text-amber-400 sm:text-2xl">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <div className="flex flex-col text-center text-[9px] font-bold uppercase leading-tight tracking-[0.16em] sm:text-[10px] sm:tracking-[0.2em]">
              <span>SOFTWARE ENGINEER,</span>
              <span className="text-zinc-500">& INSTRUCTOR</span>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
