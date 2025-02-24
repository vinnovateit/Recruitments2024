import React, { useState, useEffect } from "react";

interface CursorPosition {
  x: number;
  y: number;
}

interface CustomCursorProps {
  color: string; // Accept color as a prop
}

const CustomCursor3: React.FC<CustomCursorProps> = ({ color }) => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent): void => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateCursorPosition);
    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        body * {
          cursor: none !important;
        }
      `}</style>
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <svg
          width="30"
          height="32"
          viewBox="0 0 61 65"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.58084 3.0444C5.47917 1.29174 1.30921 5.37998 2.98036 9.51553L22.7439 58.4239C24.6271 63.0844 31.4377 62.3644 32.3047 57.4131L35.7006 38.0213C36.0779 35.8672 37.8112 34.2082 39.9797 33.9256L53.9184 32.1095C58.9653 31.4518 59.9173 24.5534 55.237 22.5535L9.58084 3.0444Z"
            fill={color} // Dynamic color
            stroke="white"
            strokeWidth="5"
          />
        </svg>
      </div>
    </>
  );
};

export default CustomCursor3;
