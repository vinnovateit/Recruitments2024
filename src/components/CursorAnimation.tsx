"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorsRef = useRef([]);
  const cursorPoints = Array(4).fill(null);

  useEffect(() => {
    const cursors = cursorsRef.current;
    const cursorPositions = cursorPoints.map(() => ({ x: 0, y: 0 }));
    let currentIndex = 0;

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
          gsap.to(pos, {
            duration: 0.08,
            x: prevPos.x,
            y: prevPos.y,
            ease: "power1.out",
          });
        });

        // Animate each cursor with tighter spacing
        cursors.forEach((cursor, index) => {
          gsap.to(cursor, {
            duration: 0.08,
            x: cursorPositions[index].x - (6 - index * 0.5),
            y: cursorPositions[index].y - (6 - index * 0.5),
            ease: "power1.out",
          });
        });
      },
    });

    const updateCursor = (e) => {
      cursorPositions[0].x = e.clientX;
      cursorPositions[0].y = e.clientY;
    };

    // Interactive effects
    const handleMouseEnter = (e) => {
      const target = e.target;
      
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

    const handleMouseLeave = () => {
      // Reset to original trail state
      cursors.forEach((cursor, index) => {
        gsap.to(cursor, {
          width: 16 - index * 1,
          height: 16 - index * 1,
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
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      document.querySelectorAll('a, button, img').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {cursorPoints.map((_, index) => (
        <div
          key={index}
          ref={el => cursorsRef.current[index] = el}
          className="fixed top-0 left-0 rounded-full pointer-events-none mix-blend-difference z-50"
        />
      ))}
    </>
  );
};

export default CustomCursor;