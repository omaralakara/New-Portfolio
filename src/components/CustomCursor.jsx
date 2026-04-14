import React, { useEffect } from "react";
import gsap from "gsap";
import { createPortal } from "react-dom";

const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.getElementById("cursor-dot");
    const outline = document.getElementById("cursor-outline");

    const hasMouse = window.matchMedia("(any-pointer: fine)").matches;
    const isLargeEnough = window.innerWidth >= 768;
    const glow = document.getElementById("cursor-glow");
    // Only initialize if it's a desktop/laptop with a mouse
    if (!hasMouse || !isLargeEnough) {
      gsap.set(["#cursor-dot", "#cursor-outline", "#cursor-glow"], {
        display: "none",
      });
      return;
    }
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;

      if (glow) {
        gsap.to(glow, {
          x: clientX,
          y: clientY,
          duration: 0.6,
          ease: "power3.out",
        });
      }
      // The Dot: Perfect follow
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.1,
      });

      // The Outline: Magnetic "lag" effect
      gsap.to(outline, {
        x: clientX,
        y: clientY,
        duration: 0.4,
        ease: "power3.out",
      });

    };

    const onMouseDown = () => {
      gsap.to([cursor, outline], { scale: 0.7, duration: 0.2 });
    };

    const onMouseUp = () => {
      gsap.to([cursor, outline], { scale: 1, duration: 0.2 });
    };

    const onMouseEnterLink = () => {
      gsap.to(outline, { scale: 2.2, borderColor: "#22d3ee", duration: 0.3 });
      gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 });
    };

    const onMouseLeaveLink = () => {
      gsap.to(outline, {
        scale: 1,
        borderColor: "rgba(34, 211, 238, 0.5)",
        duration: 0.3,
      });
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    const links = document.querySelectorAll("a, button, .cursor-pointer");
    links.forEach((link) => {
      link.addEventListener("mouseenter", onMouseEnterLink);
      link.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      links.forEach((link) => {
        link.removeEventListener("mouseenter", onMouseEnterLink);
        link.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, []);

  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      {/* The Dot */}
      <div
        id="cursor-dot"
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-9999 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />

      {/* The Magnetic Ring */}
      <div
        id="cursor-outline"
        className="fixed top-0 left-0 w-10 h-10 border border-cyan-400/50 rounded-full pointer-events-none z-9998 -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-colors duration-300"
      />
    </>,
    document.body,
  );
};

export default CustomCursor;
