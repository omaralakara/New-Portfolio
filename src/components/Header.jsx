import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiLinkedin, FiInstagram, FiMenu, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom"; // Add this to your imports

const navItems = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Contact",
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls "Hire Me" popup

  // Inside your Header component:
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isModalOpen]);

  const handleSubmit = () => {
    // your form logic here (validation, API call, etc.)
    setIsModalOpen(false);
  };
  return (
    <motion.header className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-sm border-b border-white/[0.04]">
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
            onClick={() => setIsModalOpen(true)} // Add this line
            whileHover="hover"
            initial="initial"
            whileTap={{ scale: 0.95 }}
            animate={{
              y: [0, -2, 0],
            }}
            transition={{
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
            className="relative px-6 py-2 rounded-xl overflow-hidden border border-transparent flex items-center justify-center cursor-pointer"
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
                onClick={() => {
                  setIsOpen(false); // Close mobile menu
                  setIsModalOpen(true); // Open Hire Me modal
                }}
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
      {/* HIRE ME MODAL OVERLAY */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isModalOpen && (
              /* Now it's TRULY fixed to the viewport */
              <div className="fixed inset-0 z-1000 flex items-center justify-center p-4 overflow-hidden">
                {/* 1. DARK BACKDROP */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsModalOpen(false)}
                  className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                />

                {/* 2. THE MODAL CARD */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 400 }}
                  className="relative w-full max-w-lg bg-zinc-950 border border-white/10 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-1001 overflow-hidden"
                >
                  {/* SHARP ACCENT LINE AT TOP */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-cyan-500 to-transparent" />
                  {/* CONTENT */}
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-3xl font-black tracking-tighter text-white">
                          LET'S BUILD.
                        </h2>
                        <p className="text-cyan-400 font-bold text-xs uppercase tracking-widest mt-1">
                          Priority Inquiry
                        </p>
                      </div>
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="relative p-2 rounded-full transition-all duration-300 group cursor-pointer"
                      >
                        {/* 1. THE ICON WITH ROTATION ON HOVER */}
                        <motion.div
                          whileHover={{ rotate: 90, scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="relative z-10"
                        >
                          <FiX
                            size={24}
                            className="text-zinc-500 group-hover:text-white transition-colors duration-300"
                          />
                        </motion.div>

                        {/* 2. SUBTLE CIRCULAR GLOW BEHIND THE X */}
                        <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />

                        {/* 3. SHARP BORDER RING THAT APPEARS ON HOVER */}
                        <div className="absolute inset-0 rounded-full border border-white/10 scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300" />
                      </button>
                    </div>
                    <p className="text-zinc-400 mb-6 lg:mb-8 leading-relaxed text-sm lg:text-[15px]">
                      I’m currently open to{" "}
                      <span className="text-white font-semibold">
                        Full-Stack Development
                      </span>
                      ,{" "}
                      <span className="text-white font-semibold">Shopify</span>,
                      and specialized{" "}
                      <span className="text-white font-semibold">
                        Cloud Architecture
                      </span>{" "}
                      projects. I’m also keen on{" "}
                      <span className="text-cyan-400/90 italic">
                        learning-driven opportunities
                      </span>{" "}
                      that push technical boundaries. Drop a note—I’ll respond
                      within 24 hours.
                    </p>

                    <div className="space-y-4">
                      {/* NAME FIELD */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1 tracking-widest">
                            Full Name
                          </label>
                          <div className="relative group">
                            <input
                              type="text"
                              placeholder="Omar Al-Akara"
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-hidden focus:border-cyan-500/50 transition-colors placeholder:text-zinc-600"
                            />
                          </div>
                        </div>

                        {/* EMAIL FIELD */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1 tracking-widest">
                            Email Address
                          </label>
                          <input
                            type="email"
                            placeholder="you@company.com"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-hidden focus:border-cyan-500/50 transition-colors placeholder:text-zinc-600"
                          />
                        </div>
                      </div>

                      {/* TWO COLUMN ROW: PHONE & LOCATION */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1 tracking-widest">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            placeholder="+961 -- --- ---"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-hidden focus:border-cyan-500/50 transition-colors placeholder:text-zinc-600"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1 tracking-widest">
                            Location
                          </label>
                          <input
                            type="text"
                            placeholder="City, Country"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-hidden focus:border-cyan-500/50 transition-colors placeholder:text-zinc-600"
                          />
                        </div>
                      </div>

                      {/* PROJECT DETAILS */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase ml-1 tracking-widest">
                          Project Details
                        </label>
                        <textarea
                          rows="3"
                          placeholder="Briefly describe your vision..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-hidden focus:border-cyan-500/50 transition-colors resize-none placeholder:text-zinc-600"
                        />
                      </div>
                      <motion.button
                        type="button"
                        onClick={handleSubmit}
                        whileHover="hover"
                        initial="initial"
                        whileTap={{ scale: 0.98 }}
                        className="w-full mt-6 relative px-10 py-4 rounded-xl overflow-hidden flex items-center justify-center group cursor-pointer"
                      >
                        {/* 1. THE MAIN GRADIENT BACKGROUND (Fades out on hover) */}
                        <motion.div
                          variants={{
                            initial: { opacity: 1 },
                            hover: { opacity: 0 },
                          }}
                          className="absolute inset-0 bg-linear-to-br from-cyan-500 via-cyan-400 to-blue-600"
                        />

                        {/* 2. THE HOVER BACKGROUND (Fades in - sharp glass look) */}
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
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                          className="absolute inset-0 bg-linear-to-br from-transparent via-white/30 to-transparent z-10"
                        />

                        {/* 4. THE TEXT */}
                        <motion.span
                          variants={{
                            initial: { color: "#ffffff" },
                            hover: { color: "#22d3ee" },
                          }}
                          className="relative z-20 text-sm font-black uppercase tracking-[0.2em] transition-colors duration-300"
                        >
                          Send Proposal
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
                    </div>
                  </div>

                  {/* BACKGROUND DECORATION */}
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full" />
                </motion.div>
              </div>
            )}
          </AnimatePresence>, // 1. Close the AnimatePresence
          document.body, // 2. Specify the target
        )}
    </motion.header>
  );
};

export default Header;
