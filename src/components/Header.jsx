import { useState, useEffect } from "react";
import { FiGithub, FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const navItems = ["Home", "About", "Experience", "Skills", "Projects"];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
  }, [isMenuOpen]);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        let highestRatio = 0;
        let current = "home";

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
            highestRatio = entry.intersectionRatio;
            current = entry.target.id;
          }
        });

        setActiveSection(current);
      },
      {
        root: null,
        threshold: [0.2, 0.4, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);
  return (
    <>
      <header className="fixed top-0 w-full z-50 lg:bg-black/40 lg:backdrop-blur-md">
        {" "}
        <div className="container mx-auto px-4 pt-4 h-20 flex items-center justify-between lg:px-6 lg:pt-0 lg:relative">
          {/* Mobile responsive div*/}

          <div className="flex w-full max-w-fit mx-auto items-center justify-center gap-4 h-12 px-5 rounded-full bg-zinc-950/40 border border-white/10 backdrop-blur-md lg:justify-between lg:max-w-none lg:bg-transparent lg:border-none lg:h-full lg:px-0">
            {/* LEFT */}
            <div className="flex items-center gap-5">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="font-display text-xl tracking-tight text-white"
              >
                O<span className="text-rose-400">A</span>
              </motion.span>
              {/* STATUS */}

              <div
                className={`hidden sm:flex items-center gap-3 border-l border-white/10 pl-5 transition-all duration-500 ${
                  scrolled
                    ? "opacity-0 -translate-x-3 pointer-events-none"
                    : "opacity-100 translate-x-0"
                }`}
              >
                {" "}
                <span className="w-1 h-1 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500" />
                <div className="flex flex-col leading-none gap-1">
                  <span className="text-[10px] font-semibold tracking-[0.25em] uppercase bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500">
                    Fintech / Blockchain
                  </span>

                  <span className="text-[10px] font-medium tracking-[0.25em] text-zinc-500 uppercase">
                    Lebanon → Worldwide
                  </span>
                </div>
              </div>
            </div>

            {/* THE SEPARATOR | */}
            <div className="h-5 w-[1.5px] bg-white/30 rounded-full lg:hidden" />
            {/* RIGHT */}
            <div className="flex items-center gap-1.5">
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className={`hidden lg:flex items-center bg-zinc-950/40 border border-white/10 rounded-full px-1 py-1 backdrop-blur-md transition-all duration-500 ${
                  scrolled ? "absolute left-1/2 -translate-x-1/2" : "relative"
                }`}
              >
                <nav className="flex items-center">
                  {navItems.map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .getElementById(item.toLowerCase())
                          ?.scrollIntoView({
                            behavior: "smooth",
                          });
                      }}
                      className={`
                   relative px-3 py-2 text-[10px] font-medium uppercase tracking-[0.15em]
                   transition-all duration-300
                   ${
                     activeSection === item.toLowerCase()
                       ? "text-white"
                       : "text-zinc-400 hover:text-white"
                   }
                 `}
                    >
                      {item}
                      <span
                        className={`
 absolute left-1/2 -translate-x-1/2 bottom-0 h-[1px] w-4
    bg-rose-400 transition-all duration-300
    ${activeSection === item.toLowerCase() ? "opacity-100" : "opacity-0"}
  `}
                      />
                    </a>
                  ))}
                </nav>

                <div className="w-px h-5 bg-white/10 mx-1" />

                {/* CTA */}
                <a
                  href="#contact"
                  className="
                  px-4 py-2 text-[10px] font-semibold uppercase tracking-widest
                  text-zinc-400 rounded-full
                  bg-white/5 border border-white/10
                  transition-all duration-300
                  hover:text-white hover:bg-white/10 hover:border-white/20
                  hover:-translate-y-[1px]
                "
                >
                  Let’s Work
                </a>
              </motion.div>

              <motion.a
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 flex items-center justify-center rounded-full bg-zinc-950/40 border border-white/10 text-zinc-400 transition-all duration-300 hover:text-white hover:border-white/20 hover:bg-white/5 hover:-translate-y-[1px]"
              >
                <FiGithub size={18} />
              </motion.a>

              {/* MOBILE */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden text-white ml-2"
              >
                <FiMenu size={28} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

const MobileMenu = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md lg:hidden"
      >
        {/* TOP BAR */}
        <div className="flex justify-between items-center px-6 pt-6 pb-4 border-b border-white/5">
          {/* LOGO — matches desktop */}
          <span className="font-display text-xl tracking-tight text-white">
            O<span className="text-rose-400">A</span>
          </span>

          <div className="flex items-center gap-3">
            {/* GITHUB */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-zinc-400 transition-all duration-300 hover:text-white hover:border-white/20"
            >
              <FiGithub size={16} />
            </a>

            {/* CLOSE */}
            <button
              onClick={onClose}
              className="h-9 w-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-zinc-400 transition-all duration-300 hover:text-white hover:border-white/20"
            >
              <FiX size={16} />
            </button>
          </div>
        </div>

        {/* LINKS */}
        <nav className="flex flex-col items-center justify-center gap-1 mt-16">
          {navItems.map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={onClose}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.07,
                ease: "easeOut",
              }}
              className="group relative text-4xl font-semibold text-zinc-500 hover:text-white transition-colors duration-300 py-2 tracking-tight"
            >
              {item}
              {/* underline on hover */}
              <span className="absolute left-1/2 -translate-x-1/2 bottom-1 h-[1px] w-0 group-hover:w-6 bg-rose-400 transition-all duration-300" />
            </motion.a>
          ))}

          <motion.a
            href="#contact"
            onClick={onClose}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: navItems.length * 0.07 + 0.1, duration: 0.3 }}
            className="mt-8 px-8 py-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-400 rounded-full bg-white/5 border border-white/10 transition-all duration-300 hover:text-white hover:bg-white/10 hover:border-white/20"
          >
            Let's Work
          </motion.a>
        </nav>

        {/* BOTTOM */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="absolute bottom-8 left-0 right-0 flex justify-center"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500">
            Fintech / Blockchain
          </span>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Header;
