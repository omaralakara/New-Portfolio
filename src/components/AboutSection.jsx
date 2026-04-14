import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all"; // Note: SplitText is a GSAP member plugin. I'll provide a CSS alternative below.

gsap.registerPlugin(ScrollTrigger);

function AboutSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial States
      gsap.set(".reveal-text", { y: "110%" });
      gsap.set(".about-line", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".image-overlay", { scaleY: 1, transformOrigin: "top" });
      gsap.set(".about-photo", { scale: 1.3 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          end: "bottom bottom",
          toggleActions: "play none none none",
        },
      });

      // 2. The Animation Sequence
      tl.to(".image-overlay", {
        scaleY: 0,
        duration: 1.2,
        ease: "expo.inOut",
      })
        .to(
          ".about-photo",
          {
            scale: 1,
            duration: 1.6,
            ease: "expo.out",
          },
          "-=1",
        )
        .to(
          ".about-line",
          {
            scaleX: 1,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.8",
        )
        .to(
          ".reveal-text",
          {
            y: "0%",
            duration: 1,
            stagger: 0.05,
            ease: "power4.out",
          },
          "-=0.7",
        )
        .to(
          ".about-copy",
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.5",
        );

      // 3. Subtle Parallax on Hover/Mousemove
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to(imageRef.current, {
          x: xPos,
          y: yPos,
          duration: 1.5,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-slate-950"
    >
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Image Side - No Card, Just Refined Depth */}
          <div className="relative group">
            <div
              ref={imageRef}
              className="relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden rounded-2xl"
            >
              {/* The "Pro" Reveal Overlay */}
              <div className="image-overlay absolute inset-0 bg-cyan-500 z-20" />

              <img
                src="/image.png"
                alt="Portrait"
                className="about-photo h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />

              {/* Floating Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-white/10 rounded-full blur-sm" />
            </div>
          </div>

          {/* Text Side */}
          <div className="flex flex-col justify-center h-full">
            <div className="overflow-hidden">
              <p className="reveal-text text-sm font-bold uppercase tracking-widest text-cyan-400 mb-4">
                About — Who I Am
              </p>
            </div>

            <div className="about-line h-[1px] w-12 bg-white/30 mb-8" />

            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.1] text-white mb-8">
              {/* Splitting text into lines for a mask reveal */}
              {[
                "I design and build",
                "modern digital products",
                "that feel premium.",
              ].map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <span className="reveal-text block">{line}</span>
                </div>
              ))}
            </h2>

            <div className="about-copy opacity-0 translate-y-8 space-y-6">
              <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
                I am a full-stack developer focused on crafting refined
                interfaces and scalable backend systems. I enjoy turning complex
                ideas into clean user experiences.
              </p>
              <p className="text-zinc-500 text-base leading-relaxed max-w-xl italic border-l border-cyan-500/50 pl-4">
                My style blends product thinking, engineering discipline, and
                visual craft.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
