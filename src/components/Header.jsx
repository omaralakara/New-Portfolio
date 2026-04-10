import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiLinkedin, FiInstagram, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

const navItems = ["Home", "About", "Projects", "Experience", "Contact"];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.header className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-white/5">
      {" "}
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {" "}
        {/* LOGO */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center"
        >
          <div className="flex items-center cursor-pointer group">
            {/* O (SAME HOVER AS BUTTON) */}
            <motion.div
              initial="initial"
              whileHover="hover"
              className="relative h-10 w-10 rounded-xl overflow-hidden flex items-center justify-center mr-3 cursor-pointer group"
            >
              {/* 1. THE MAIN GRADIENT BACKGROUND (Fades out) */}
              <motion.div
                variants={{
                  initial: { opacity: 1 },
                  hover: { opacity: 0 },
                }}
                className="absolute inset-0 bg-linear-to-br from-cyan-500 via-cyan-400 to-blue-600"
              />

              {/* 2. THE HOVER BACKGROUND (Fades in - glassy look) */}
              <motion.div
                variants={{
                  initial: { opacity: 0 },
                  hover: { opacity: 1 },
                }}
                className="absolute inset-0 bg-cyan-950/40 border border-cyan-500/50 rounded-xl"
              />

              {/* 3. THE SHIMMER LIGHT STREAK */}
              <motion.div
                variants={{
                  initial: { x: "-150%", opacity: 0 },
                  hover: { x: "150%", opacity: 1 },
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 bg-linear-to-br from-transparent via-white/40 to-transparent z-10"
              />

              {/* 4. THE LETTER "O" */}
              <motion.span
                variants={{
                  initial: { color: "#ffffff", scale: 1 },
                  hover: { color: "#22d3ee", scale: 1.1 },
                }}
                className="relative z-20 font-bold text-lg transition-colors duration-300"
              >
                O.A
              </motion.span>

              {/* 5. OUTER GLOW EFFECT */}
              <motion.div
                variants={{
                  initial: { opacity: 0, scale: 0.5 },
                  hover: { opacity: 1, scale: 1.3 },
                }}
                className="absolute inset-0 bg-cyan-500/20 blur-lg -z-10"
              />
            </motion.div>

            <motion.span
              whileHover="hover"
              initial="initial"
              className="relative text-xl font-bold tracking-tight hidden lg:block cursor-pointer overflow-hidden"
            >
              {/* THE MAIN TEXT */}
              <motion.span
                variants={{
                  initial: { color: "#a1a1aa" }, // Muted zinc-400
                  hover: { color: "#ffffff" }, // Pure white
                }}
                transition={{ duration: 0.3 }}
                className="relative z-10 block"
              >
                OmarAlakara
              </motion.span>

              {/* THE SHARP SHIMMER (A thin line that passes over the text) */}
              <motion.div
                variants={{
                  initial: { x: "-100%" },
                  hover: { x: "100%" },
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                }}
                className="absolute inset-0 z-20 pointer-events-none"
              >
                <div className="w-1/2 h-full bg-linear-to-br from-transparent via-cyan-400/40 to-transparent skew-x-12" />
              </motion.div>

              {/* VERY SUBTLE UNDERLINE (Optional - remove if you want it even cleaner) */}
              <motion.div
                variants={{
                  initial: { scaleX: 0, opacity: 0 },
                  hover: { scaleX: 1, opacity: 1 },
                }}
                className="absolute bottom-0 left-0 w-full h-px bg-linear-to-br from-transparent via-cyan-500/50 to-transparent origin-left"
              />
            </motion.span>
          </div>
        </motion.div>
        {/* 2.  CENTER NAME (MOBILE ONLY) */}
        <motion.div
          initial={{ opacity: 0, y: -50 }} // Starts above the screen
          animate={{ opacity: 1, y: 0 }} // Drops into position
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 14,
            delay: 0.3,
          }}
          className="md:hidden absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
        >
          {/* THE TEXT WITH SHARP GRADIENT */}
          <span className="text-sm font-black tracking-tighter uppercase italic bg-clip-text text-transparent bg-linear-to-b from-white via-white to-cyan-500 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
            OmarAlakara
          </span>

          {/* THE SHARP GLOW LINE */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="h-[2px] w-full bg-linear-to-r from-transparent via-cyan-400 to-transparent mt-0.5 shadow-[0_0_10px_#22d3ee]"
          />
        </motion.div>
        {/* NAV */}
        <nav className="hidden md:flex items-center justify-center gap-8">
          {navItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4 + index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              className="relative group cursor-pointer"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-white transition-all duration-300">
                {item}
              </span>

              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-linear-to-br from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>

              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-md bg-cyan-400/20 transition duration-300 rounded-md"></span>
            </motion.div>
          ))}
        </nav>
        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden md:flex justify-end items-center gap-5"
        >
          <div className="flex items-center gap-4">
            {[FiGithub, FiLinkedin, FiInstagram].map((Icon, i) => (
              <motion.div
                key={i}
                whileHover={{
                  y: -5,
                  scale: 1.15,
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative group cursor-pointer"
              >
                {/* ICON */}
                <Icon className="text-zinc-500 group-hover:text-cyan-400 transition duration-300 text-lg relative z-10" />

                {/* BACKGROUND GLOW */}
                <div className="absolute inset-0 rounded-full bg-cyan-400/10 opacity-0 group-hover:opacity-100 blur-md transition duration-300"></div>

                {/* SOFT BACKPLATE */}
                <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition duration-300"></div>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover="hover"
            initial="initial"
            whileTap={{ scale: 0.95 }}
            animate={{
              y: [0, -2, 0],
            }}
            transition={{
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
            className="relative px-6 py-2 rounded-xl overflow-hidden border border-transparent flex items-center justify-center"
          >
            {/* 1. THE MAIN GRADIENT BACKGROUND (Fades out) */}
            <motion.div
              variants={{
                initial: { opacity: 1 },
                hover: { opacity: 0 },
              }}
              className="absolute inset-0 bg-linear-to-br from-cyan-500 to-blue-600"
            />

            {/* 2. THE HOVER BACKGROUND (Fades in - glassy look for black backgrounds) */}
            <motion.div
              variants={{
                initial: { opacity: 0 },
                hover: { opacity: 1 },
              }}
              className="absolute inset-0 bg-cyan-950/40 border border-cyan-500/50 rounded-xl"
            />

            {/* 3. THE SHIMMER LIGHT STREAK */}
            <motion.div
              variants={{
                initial: { x: "-100%", opacity: 0 },
                hover: { x: "100%", opacity: 1 },
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-linear-to-br from-transparent via-white/30 to-transparent z-10"
            />

            {/* 4. THE TEXT */}
            <motion.span
              variants={{
                initial: { color: "#ffffff" },
                hover: { color: "#22d3ee" },
              }}
              className="relative z-20 text-xs font-black uppercase tracking-widest transition-colors duration-300"
            >
              Hire Me
            </motion.span>

            {/* 5. OUTER GLOW EFFECT */}
            <motion.div
              variants={{
                initial: { opacity: 0, scale: 0.5 },
                hover: { opacity: 1, scale: 1.2 },
              }}
              className="absolute inset-0 bg-cyan-500/20 blur-xl -z-10"
            />
          </motion.button>
        </motion.div>
        {/* MOBILE TOGGLE BUTTON */}
        <motion.div
          initial={{ opacity: 0, x: 30 }} // Matches logo (which comes from -30, this comes from +30)
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:hidden flex items-center z-100 relative"
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative p-2 group"
          >
            <motion.div
              initial={false}
              animate={{
                rotate: isOpen ? 90 : 0,
                color: isOpen ? "#22d3ee" : "#ffffff", // Swaps to Cyan when open
              }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="text-3xl relative z-10"
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </motion.div>

            {/* COOL COLOR GLOW BEHIND THE ICON */}
            <motion.div
              animate={{
                opacity: isOpen ? 1 : 0,
                scale: isOpen ? 1.2 : 0.8,
              }}
              className="absolute inset-0 bg-cyan-500/20 blur-md rounded-full -z-10"
            />

            {/* HOVER EFFECT (Matches your other buttons) */}
            <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </motion.div>
        {/* MOBILE MENU OVERLAY */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-0 h-screen w-full bg-black/95 backdrop-blur-xl z-80 flex flex-col items-center justify-center"
            >
              {/* 1. LINKS */}
              <nav className="flex flex-col items-center gap-8">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="text-3xl font-bold tracking-tighter text-zinc-500 hover:text-white transition-colors"
                  >
                    {item}
                  </motion.a>
                ))}
              </nav>

              {/* 2. MOBILE HIRE ME BUTTON */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover="hover"
                className="mt-12 relative px-10 py-4 rounded-xl overflow-hidden flex items-center justify-center"
              >
                <motion.div
                  variants={{ initial: { opacity: 1 }, hover: { opacity: 0 } }}
                  className="absolute inset-0 bg-linear-to-br from-cyan-500 to-blue-600"
                />
                <motion.div
                  variants={{ initial: { opacity: 0 }, hover: { opacity: 1 } }}
                  className="absolute inset-0 bg-cyan-950/40 border border-cyan-500/50 rounded-xl"
                />
                <motion.span
                  variants={{
                    initial: { color: "#ffffff" },
                    hover: { color: "#22d3ee" },
                  }}
                  className="relative z-20 text-sm font-black uppercase tracking-widest"
                >
                  Hire Me
                </motion.span>
              </motion.button>

              {/* 3. MOBILE SOCIALS */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex gap-10 mt-12"
              >
                {[FiGithub, FiLinkedin, FiInstagram].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="text-3xl text-zinc-500 hover:text-cyan-400 transition-colors"
                  >
                    <Icon />
                  </a>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
