"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const trailingRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [cursorState, setCursorState] = useState<"default" | "large" | "transparent">("default");

  useEffect(() => {
    const cursor = cursorRef.current;
    const trailingCursors = trailingRefs.current;
    const cursorPositions = Array.from({ length: 8 }, () => ({ x: 0, y: 0 }));

    const updateCursor = (e: MouseEvent) => {
      cursorPositions[0].x = e.clientX;
      cursorPositions[0].y = e.clientY;

      // Update trailing effect
      cursorPositions.forEach((pos, index) => {
        if (index === 0) return;
        const prevPos = cursorPositions[index - 1];

        gsap.to(pos, {
          x: prevPos.x,
          y: prevPos.y,
          duration: 0.1,
          ease: "power2.out",
        });
      });

      // Main cursor animation
      gsap.to(cursor, {
        x: cursorPositions[0].x - 30,
        y: cursorPositions[0].y - 30,
        width: cursorState === "large" || cursorState === "transparent" ? 60 : 20,
        height: cursorState === "large" || cursorState === "transparent" ? 60 : 20,
        backgroundColor: cursorState === "large" ? "rgba(74, 222, 128, 0.9)" : "transparent",
        border: cursorState === "transparent" ? "2px solid rgba(255, 255, 255, 0.4)" : "none",
        opacity: 1,
        duration: 0.15,
        ease: "power2.out",
      });

      // Trailing circles animation (only when in default state)
      trailingCursors.forEach((circle, index) => {
        gsap.to(circle, {
          x: cursorPositions[index + 1].x - 10,
          y: cursorPositions[index + 1].y - 10,
          width: 20 - index * 2,
          height: 20 - index * 2,
          backgroundColor: `rgba(74, 222, 128, ${1 - index * 0.1})`,
          opacity: cursorState === "default" ? 1 : 0, // Hide trailing circles when hovering
          duration: 0.1,
          ease: "power2.out",
        });
      });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A" || target.tagName === "BUTTON") {
        setCursorState("large");
      } else if (target.tagName === "IMG") {
        setCursorState("transparent");
      }
    };

    const handleMouseLeave = () => {
      setCursorState("default");
    };

    // Remove default cursor on links & buttons
    const style = document.createElement("style");
    style.textContent = `a, button,input { cursor: none !important; }`;
    document.head.appendChild(style);

    window.addEventListener("mousemove", updateCursor);
    document.querySelectorAll("a, button, img").forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      document.querySelectorAll("a, button, img").forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      document.head.removeChild(style);
    };
  }, [cursorState]);

  return (
    <>
      {/* Main Cursor */}
      <div
        ref={(el) => (cursorRef.current = el)}
        className="fixed top-0 left-0 rounded-full pointer-events-none mix-blend-difference z-50"
      />
      
      {/* Trailing Circles */}
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}
          ref={(el) => (trailingRefs.current[index] = el)}
          className="fixed top-0 left-0 rounded-full pointer-events-none mix-blend-difference z-50"
        />
      ))}
    </>
  );
};

export default CustomCursor;
