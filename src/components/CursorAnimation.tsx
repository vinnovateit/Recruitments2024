"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  // Update the ref type to be explicit about the elements it contains
  const cursorsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cursorPoints = Array(4).fill(null);

  useEffect(() => {
    const cursors = cursorsRef.current;
    const cursorPositions = cursorPoints.map(() => ({ x: 0, y: 0 }));
    // let currentIndex = 0; <-- unused

    // Set up initial cursor styles with smaller sizes and closer spacing
    cursors.forEach((cursor, index) => {
      gsap.set(cursor, {
        width: 24 - index * 1,  // Smaller circles with less size difference
        height: 24 - index * 1,
        backgroundColor: "rgba(74, 222, 128, " + (1 - index * 0.1) + ")",
      });
    });

    // Animation ticker for smoother cursor trail
    gsap.to({}, {
      duration: 0.008, // Faster update rate
      repeat: -1,
      onRepeat: () => {
        // Update positions with minimal delay
        cursorPositions.forEach((pos, index) => {
          if (index === 0) return;
          const prevPos = cursorPositions[index - 1];
          if (!prevPos) return;
          gsap.to(pos, {
            duration: 0.08,
            x: prevPos.x,
            y: prevPos.y,
            ease: "power1.out",
          });
        });

        // Animate each cursor with tighter spacing
        cursors.forEach((cursor, index) => {
          const position = cursorPositions[index];
          if (!cursor || !position) return;
          
          gsap.to(cursor, {
            duration: 0.08,
            x: position.x - (6 - index * 0.5),
            y: position.y - (6 - index * 0.5),
            ease: "power1.out",
          });
        });
      },
    });

    const updateCursor = (e: MouseEvent): void => {
      const firstPosition = cursorPositions[0];
      if (firstPosition) {
        firstPosition.x = e.clientX;
        firstPosition.y = e.clientY;
      }
    };

    // Interactive effects
    const handleMouseEnter = (e: MouseEvent): void => {
      const target = e.target as HTMLElement;
      
      if (target.tagName === 'A') {
        cursors.forEach((cursor, index) => {
          if (index === 0) {
            gsap.to(cursor, {
              width: 20,
              height: 20,
              backgroundColor: "white",
              opacity: 1,
              duration: 0.2,
            });
          } else {
            gsap.to(cursor, {
              opacity: 0,
              duration: 0.1,
            });
          }
        });
      } else if (target.tagName === 'IMG') {
        cursors.forEach((cursor, index) => {
          if (index === 0) {
            gsap.to(cursor, {
              width: 32,
              height: 32,
              backgroundColor: "transparent",
              border: "2px solid rgb(74, 222, 128)",
              opacity: 1,
              duration: 0.2,
            });
          } else {
            gsap.to(cursor, {
              opacity: 0,
              duration: 0.1,
            });
          }
        });
      } else if (target.tagName === 'BUTTON') {
        cursors.forEach((cursor, index) => {
          if (index === 0) {
            gsap.to(cursor, {
              width: 32,
              height: 32,
              backgroundColor: "rgba(74, 222, 128, 0.8)",
              opacity: 1,
              duration: 0.2,
            });
          } else {
            gsap.to(cursor, {
              opacity: 0,
              duration: 0.1,
            });
          }
        });
      }
    };

    const handleMouseLeave = (): void => {
      // Reset to original trail state
      cursors.forEach((cursor, index) => {
        gsap.to(cursor, {
          width: 24 - index * 1,
          height: 24 - index * 1,
          backgroundColor: "rgba(74, 222, 128, " + (1 - index * 0.1) + ")",
          border: "none",
          filter: "blur(0px)",
          opacity: 1,
          duration: 0.2,
        });
      });
    };

    // Event listeners
    window.addEventListener('mousemove', updateCursor);
    document.querySelectorAll('a, button, img').forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter as EventListener);
      el.addEventListener('mouseleave', handleMouseLeave as EventListener);
    });

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      document.querySelectorAll('a, button, img').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter as EventListener);
        el.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      });
    };
  }, []);

  return (
    <div className="hidden lg:block">
      {cursorPoints.map((_, index) => (
        <div
          key={index}
          ref={el => {
            if (cursorsRef.current) {
              cursorsRef.current[index] = el;
            }
          }}
          className="fixed top-0 left-0 rounded-full pointer-events-none mix-blend-difference z-50"
        />
      ))}
    </div>
  );
};

export default CustomCursor;