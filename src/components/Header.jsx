import { useState, useEffect } from "react";
import { FiGithub, FiMenu, FiX } from "react-icons/fi";

const navItems = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Contact",
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
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
      <header className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-5">
            {/* LOGO (FIXED FONT) */}
            <span className="font-display text-xl tracking-tight text-white">
              O<span className="text-sky-400">A</span>
            </span>

            {/* STATUS */}
            <div className="hidden sm:flex items-center gap-3 border-l border-white/10 pl-5">
              <span className="w-1 h-1 rounded-full bg-sky-400" />

              <div className="flex flex-col leading-none gap-1">
                <span className="text-[10px] font-semibold tracking-[0.25em] text-sky-400 uppercase">
                  Always Building
                </span>

                <span className="text-[10px] font-medium tracking-[0.25em] text-zinc-500 uppercase">
                  Always Learning
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-1.5">
            {/* NAV */}
            <div className="hidden lg:flex items-center bg-zinc-950/40 border border-white/10 rounded-full px-1 py-1 backdrop-blur-md">
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
    absolute left-1/2 -translate-x-1/2 bottom-0 h-[1px] w-6
    bg-sky-400 transition-all duration-300
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
                text-white rounded-full
                bg-sky-400/10 border border-sky-400/20
                transition-all duration-300
                hover:bg-sky-400/20
                hover:border-sky-400/40
                hover:-translate-y-[1px]
                hover:shadow-[0_0_20px_rgba(56,189,248,0.25)]
                "
              >
                Let’s Work
              </a>
            </div>

            {/* GITHUB */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 flex items-center justify-center rounded-full bg-zinc-950/40 border border-white/10 text-white transition-all duration-300 hover:border-sky-400/30 hover:-translate-y-[1px] hover:shadow-[0_0_15px_rgba(56,189,248,0.15)]"
            >
              <FiGithub size={18} />
            </a>

            {/* MOBILE */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden text-white ml-2"
            >
              <FiMenu size={28} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

const MobileMenu = ({ isOpen, onClose }) => (
  <div
    className={`fixed inset-0 z-[100] bg-black transition-transform duration-300 ${
      isOpen ? "translate-y-0" : "-translate-y-full"
    }`}
  >
    <div className="flex flex-col h-full p-8">
      <div className="flex justify-between items-center mb-12">
        <span className="text-white font-semibold">O.A</span>
        <button onClick={onClose} className="text-white">
          <FiX size={24} />
        </button>
      </div>

      <nav className="flex flex-col gap-8">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={onClose}
            className="text-3xl font-medium text-zinc-300 hover:text-white transition"
          >
            {item}
          </a>
        ))}
      </nav>
    </div>
  </div>
);

export default Header;
