"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorsRef = useRef([]);
  const cursorPoints = Array(8).fill(null);

  useEffect(() => {
    const cursors = cursorsRef.current;
    const cursorPositions = cursorPoints.map(() => ({ x: 0, y: 0 }));
    let currentIndex = 0;

    // Set up initial cursor styles with decreasing sizes
    cursors.forEach((cursor, index) => {
      gsap.set(cursor, {
        width: 20 - index * 1.5,  // Reduced size difference between circles
        height: 20 - index * 1.5,
        backgroundColor: "rgba(74, 222, 128, " + (1 - index * 0.1) + ")",
      });
    });

    // Animation ticker for smooth cursor trail
    gsap.to({}, {
      duration: 0.016,
      repeat: -1,
      onRepeat: () => {
        // Update positions with reduced delay effect
        cursorPositions.forEach((pos, index) => {
          if (index === 0) return;
          const prevPos = cursorPositions[index - 1];
          gsap.to(pos, {
            duration: 0.15,  // Reduced duration for tighter following
            x: prevPos.x,
            y: prevPos.y,
            ease: "none",  // Linear interpolation for smoother following
          });
        });

        // Animate each cursor to its target position with reduced spacing
        cursors.forEach((cursor, index) => {
          gsap.to(cursor, {
            duration: 0.15,
            x: cursorPositions[index].x - (10 - index * 0.8),  // Reduced spacing between circles
            y: cursorPositions[index].y - (10 - index * 0.8),
            ease: "none",
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
        // Merge all cursors into one white circle
        cursors.forEach((cursor, index) => {
          if (index === 0) {
            gsap.to(cursor, {
              width: 24,
              height: 24,
              backgroundColor: "white",
              opacity: 1,
              duration: 0.3,
            });
          } else {
            gsap.to(cursor, {
              opacity: 0,
              duration: 0.2,
            });
          }
        });
      } else if (target.tagName === 'IMG') {
        // Single blurred circle
        cursors.forEach((cursor, index) => {
          if (index === 0) {
            gsap.to(cursor, {
              width: 30,
              height: 30,
              filter: "blur(4px)",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              opacity: 1,
              duration: 0.3,
            });
          } else {
            gsap.to(cursor, {
              opacity: 0,
              duration: 0.2,
            });
          }
        });
      } else if (target.tagName === 'BUTTON') {
        // Only show the largest circle
        cursors.forEach((cursor, index) => {
          if (index === 0) {
            gsap.to(cursor, {
              width: 40,
              height: 40,
              backgroundColor: "rgba(74, 222, 128, 0.8)",
              opacity: 1,
              duration: 0.3,
            });
          } else {
            gsap.to(cursor, {
              opacity: 0,
              duration: 0.2,
            });
          }
        });
      }
    };

    const handleMouseLeave = () => {
      // Reset to original trail state
      cursors.forEach((cursor, index) => {
        gsap.to(cursor, {
          width: 20 - index * 1.5,  // Match initial size reduction
          height: 20 - index * 1.5,
          backgroundColor: "rgba(74, 222, 128, " + (1 - index * 0.1) + ")",
          filter: "blur(0px)",
          opacity: 1,
          duration: 0.3,
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