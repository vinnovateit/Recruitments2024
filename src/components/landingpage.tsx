"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import heroImage from "public/lp_img.png";
import Link from "next/link";
import gsap from "gsap";

export const Landingpage = () => {
  const buttonRef = useRef(null);
  const imageRef = useRef(null);
  const buttonOutlineRef = useRef(null);

  useEffect(() => {
    // Floating animation for the image
    gsap.to(imageRef.current, {
      y: -20,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    });

    // Button hover animation setup
    const button = buttonRef.current;
    const outline = buttonOutlineRef.current;

    // Initial state of outline
    gsap.set(outline, {
      scale: 1.1,
      opacity: 0,
    });

    // Create hover animation
    const hoverTimeline = gsap.timeline({ paused: true });
    hoverTimeline
      .to(outline, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      })
      .to(button, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      }, 0);

    // Add event listeners
    button.addEventListener("mouseenter", () => hoverTimeline.play());
    button.addEventListener("mouseleave", () => hoverTimeline.reverse());

    // Cleanup
    return () => {
      button.removeEventListener("mouseenter", () => hoverTimeline.play());
      button.removeEventListener("mouseleave", () => hoverTimeline.reverse());
    };
  }, []);

  return (
    <div className="min-h-screen relative font-Fixture">
      {/* SVG decoration */}
      <svg
        className="absolute top-0 left-0 w-16 md:w-32 lg:w-40 ml-[-1.2vw]"
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

      {/* Main content container */}
      <div className="max-w-screen w-full min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-24">
        {/* LEFT TEXT SECTION */}
        <div className="text-center md:text-left md:w-1/2 pt-16 md:pt-0">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#FF5ACD]">
            VINNOVATEIT
          </h1>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#9FFF47]">
            RECRUITING
          </h2>
          <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
            NOW
          </h3>
          <p className="mt-4 text-white text-base md:text-lg font-semibold">
            VinnovateIT, because everybody needs a family in college!
          </p>
          <div className="relative inline-block mt-6">
            <Link href="/apply">
              <button
                ref={buttonRef}
                className="z-10 px-8 py-2 md:px-6 md:py-3 bg-pink-500 text-white uppercase font-bold rounded-none transition-all duration-200 hover:bg-[#9FFF47] hover:text-black"
              >
                REGISTER NOW
              </button>
            </Link>
            {/* Button outline */}
            <div
              ref={buttonOutlineRef}
              className="absolute inset-0 border-2 border-white rounded-none pointer-events-none"
            ></div>
          </div>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="relative md:w-1/2 flex justify-center mt-8 md:mt-0">
          <div ref={imageRef}>
            <Image
              src={heroImage}
              alt="Illustration"
              className="max-w-full"
              height={500}
              width={750}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;