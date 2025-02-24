import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedThankYouProps {
  setIsHovered: (hover: boolean) => void;
}

const ThankYou: React.FC<AnimatedThankYouProps> = ({ setIsHovered }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setHoveredState] = useState(false);

  const messages = [
    { text: "THANK YOU", style: "latin" },
    { text: "MERCI", style: "latin" },
    { text: "GRACIAS", style: "latin" },
    { text: "DANKE", style: "latin" },
    { text: "ありがとう", style: "japanese" },
    { text: "OBRIGADO", style: "latin" },
    { text: "谢谢", style: "chinese" },
    { text: "धन्यवाद", style: "devanagari" },
    { text: "شكرا", style: "arabic" },
    { text: "감사합니다", style: "korean" },
  ];

  const ANIMATION_DURATION = 0.5;
  const INTERVAL_DURATION = 1000;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length);
      }, INTERVAL_DURATION);
    } else {
      setCurrentIndex(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovered]);

  const getTextStyles = (style: string) => {
    switch (style) {
      case "japanese":
      case "chinese":
        return "text-5xl md:text-7xl font-normal";
      case "arabic":
        return "text-5xl md:text-7xl font-bold";
      case "devanagari":
        return "text-5xl md:text-7xl font-normal";
      case "korean":
        return "text-5xl md:text-7xl font-normal";
      default:
        return "text-6xl md:text-8xl font-bold tracking-wide";
    }
  };

  const getGradientStyle = (isEven: boolean) => ({
    backgroundImage: isEven
      ? "linear-gradient(to top right, #BC18CF 56%, #ffffff 50%)"
      : "linear-gradient(to top right, #9FFF47 56%, #ffffff 50%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  });

  return (
    <motion.div
      className="flex justify-center items-center px-12 py-3 md:py-20 text-center rounded-lg shadow-lg relative opacity-40 w-auto max-w-[80vw]"
      animate={{
        backgroundColor:
          currentIndex % 2 === 0 ? "rgb(163 230 53)" : "rgb(244 114 182)",
      }}
      transition={{
        duration: ANIMATION_DURATION,
        ease: "easeInOut",
      }}
      onMouseEnter={() => {
        setHoveredState(true);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setHoveredState(false);
        setIsHovered(false);
      }}
      style={{
        
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "200px", // Adjust height as needed
      }}
    >
      <div className="relative h-24 md:h-32 w-[70vw] md:w-[50vw] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: ANIMATION_DURATION,
              ease: "easeInOut",
            }}
            className={`absolute text-center ${getTextStyles(
              messages[currentIndex].style
            )}`}
            style={{
              ...getGradientStyle(currentIndex % 2 === 1),
              opacity: 1, // Ensures text always stays fully visible
            }}
          >
            {messages[currentIndex].text}
          </motion.h1>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ThankYou;
