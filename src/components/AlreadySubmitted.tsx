import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import CustomCursor3 from "./CursorAnimation3";
import FormFooter from "./FormFooter";

const AlreadyFilled: React.FC = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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
        return "text-4xl md:text-6xl font-normal";
      case "arabic":
        return "text-4xl md:text-6xl font-bold";
      case "devanagari":
        return "text-4xl md:text-6xl font-normal";
      case "korean":
        return "text-4xl md:text-6xl font-normal";
      default:
        return "text-5xl md:text-7xl font-bold tracking-wide";
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
    <div>
      <div className="flex min-h-screen items-center justify-center bg-specpurple font-Fixture cursor-none">
      <svg
        className="absolute left-0 top-0 ml-[-1.2vw] w-24 md:w-40"
        viewBox="0 0 129 95"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_56_3802)">
          <path
            d="M3.94072 3.27278C3.94072 3.27278 -7.6574 33.1742 7.87169 43.32C23.4008 53.4659 27.0135 18.6703 42.7494 27.7032C56.6596 35.688 36.1137 52.3997 54.2856 62.1731C72.4575 71.9464 83.7558 50.5554 83.7558 50.5554C83.7558 50.5554 88.4395 38.1416 74.4525 39.7015C60.4654 41.2614 57.6788 54.8699 78.6939 66.248C99.709 77.6261 108.971 62.9123 108.971 62.9123"
            stroke="white"
            strokeWidth="30"
            strokeLinecap="round"
          />
          <path
            d="M3.94072 3.27278C3.94072 3.27278 -7.6574 33.1742 7.87169 43.32C23.4008 53.4659 27.0135 18.6703 42.7494 27.7032C56.6596 35.688 36.1137 52.3997 54.2856 62.1731C72.4575 71.9464 83.7558 50.5554 83.7558 50.5554C83.7558 50.5554 88.4395 38.1416 74.4525 39.7015C60.4654 41.2614 57.6788 54.8699 78.6939 66.248C99.709 77.6261 108.971 62.9123 108.971 62.9123"
            stroke="#F94AC9"
            strokeWidth="15"
            strokeLinecap="round"
          />
        </g>
      </svg>

      <div className="absolute right-0 top-0">
        <img
          src="/thundericon.png"
          alt="Thunder Icon"
          className="w-20 md:w-32"
        />
      </div>
      <CustomCursor3 color={isHovered ? "#F472B6" : "#C1FF44"} />
      <div className="relative w-full max-w-4xl px-6">
        <div className="mt-[20vh] space-y-8">
          <div className="space-y-4 text-center">
            <motion.div
              className="flex justify-center items-center py-6 text-center rounded-lg relative w-auto mx-auto"
              animate={{
                backgroundColor:
                  currentIndex % 2 === 0 
                  ? "rgba(163, 230, 53, 0.4)"
                  : "rgba(244, 114, 182, 0.4)",
              }}
              transition={{
                duration: ANIMATION_DURATION,
                ease: "easeInOut",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "180px",
                width: "85%",
                maxWidth: "600px",
              }}
            >
              <div className="relative h-24 md:h-28 w-full flex items-center justify-center">
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
                      messages[currentIndex]?.style ?? "latin"
                    )}`}
                    style={getGradientStyle(currentIndex % 2 === 1)}
                  >
                    {messages[currentIndex]?.text ?? "ALREADY FILLED"}
                  </motion.h1>
                </AnimatePresence>
              </div>
            </motion.div>
            
            <p className="text-xl text-white md:text-2xl lg:text-3xl mt-8">
              You have already submitted your response.
            </p>
            
            <motion.button
              onClick={() => router.push("/")}
              className="mt-8 rounded px-10 py-3 text-lg font-medium text-white transition-colors"
              initial={{ backgroundColor: "#EC4899" }}
              whileHover={{ 
                backgroundColor: "#9FFF47", 
                color: "#000000",
                scale: 1.05
              }}
              transition={{ duration: 0.3 }}
            >
              Return Home
            </motion.button>
          </div>
        </div>
      </div>
    </div>
      <FormFooter/></div>
    
  );
};

export default AlreadyFilled;