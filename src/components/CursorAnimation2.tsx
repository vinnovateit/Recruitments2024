"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor2: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    const updateCursor = (e: MouseEvent) => {
      if (cursor) {
        gsap.to(cursor, {
          x: e.clientX - 5,
          y: e.clientY - 5,
          duration: 0.1,
          ease: "power2.out",
        });
      }
    };

    // Remove default cursor
    const style = document.createElement("style");
    style.textContent = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    window.addEventListener("mousemove", updateCursor);

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="hidden lg:block fixed top-0 left-0 w-5 h-5 bg-lime-400 rounded-full pointer-events-none z-50"
    />
  );
};

export default CustomCursor2;
