"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import heroImage from "public/lp_img.png";
import Link from "next/link";
import gsap from "gsap";

export const Landingpage = () => {
  // Refs for animation targets
  const heroImageRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const nowRef = useRef(null);
  const taglineRef = useRef(null);
  const buttonRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    // GSAP timeline for sequential animations
    const tl = gsap.timeline();
    
    // Initial state for text elements - hidden and slightly down
    gsap.set([titleRef.current, subtitleRef.current, nowRef.current, taglineRef.current, buttonRef.current, svgRef.current], 
      { opacity: 0, y: 20 });
    
    // Initial state for hero image - off-screen to the right
    gsap.set(heroImageRef.current, { opacity: 0, x: 200 });
    
    // Sequential appear animations for text elements
    tl.to(svgRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
      .to(titleRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
      .to(nowRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
      .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
      .to(buttonRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
      // Slide in hero image from right
      .to(heroImageRef.current, { 
        opacity: 1, 
        x: 0, 
        duration: 0.8, 
        ease: "power2.out" 
      });
    
    // Floating animation for hero image (starts after slide-in is complete)
    tl.add(() => {
      gsap.to(heroImageRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
    
    return () => {
      // Cleanup animations
      tl.kill();
    };
  }, []);

  return (
    <div className="min-h-screen relative font-Fixture">
      {/* SVG decoration */}
      <svg
        ref={svgRef}
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
          <h1 ref={titleRef} className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#FF5ACD]">
            VINNOVATEIT
          </h1>
          <h2 ref={subtitleRef} className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#9FFF47]">
            RECRUITING
          </h2>
          <h3 ref={nowRef} className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
            NOW
          </h3>
          <p ref={taglineRef} className="mt-4 text-white text-base md:text-lg font-semibold">
            VinnovateIT, because everybody needs a family in college!
          </p>
          <Link href="/apply" className="group inline-block">
            <button 
              ref={buttonRef}
              className="z-10 mt-6 px-8 py-2 md:px-6 md:py-3 bg-pink-500 text-white uppercase font-bold rounded-none md:rounded-lg transition-all duration-200 group-hover:bg-[#9FFF47] group-hover:text-black hover:scale-110 pointer-events-none"
            >
              REGISTER NOW
            </button>
          </Link>
        </div>

        {/* RIGHT IMAGE SECTION - added more top margin for mobile */}
        <div className="relative md:w-1/2 flex justify-center mt-12 py-5 md:mt-0 overflow-hidden">
          <div ref={heroImageRef}>
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