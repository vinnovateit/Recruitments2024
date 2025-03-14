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
  const arrowRef = useRef(null);
  const thunderIconRef = useRef(null);

  useEffect(() => {
    // GSAP timeline for sequential animations
    const tl = gsap.timeline();
    
    // Initial state for text elements - hidden and slightly down
    gsap.set([titleRef.current, subtitleRef.current, nowRef.current, taglineRef.current, buttonRef.current, svgRef.current], 
      { opacity: 0, y: 20 });
    
    // Initial state for hero image - off-screen to the right
    gsap.set(heroImageRef.current, { opacity: 0, x: 200 });
    
    // Initial state for thunder icon - make it visible eventually
    gsap.set(thunderIconRef.current, { opacity: 0 });
    
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
      })
      // Make thunder icon visible
      .to(thunderIconRef.current, {
        opacity: 1,
        duration: 0.5,
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

    // Blinking animation for the arrow
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        opacity: 0.3,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    
    return () => {
      // Cleanup animations
      tl.kill();
    };
  }, []);

  return (
    <div className="relative font-Fixture overflow-x-hidden">
      {/* SVG decoration */}
      <svg
        ref={svgRef}
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

      <div className="absolute right-0">
        <img
          ref={thunderIconRef}
          src="/thundericon.png"
          alt="Thunder Icon"
          className="w-20 md:w-32"
        />
      </div>

      {/* Main content container */}
      <div className="max-w-screen flex h-screen w-full flex-col items-center justify-center px-6 md:flex-row md:justify-between md:px-12 lg:px-24">
        {/* LEFT TEXT SECTION - reduced top margin for mobile */}
        <div className="mt-4 w-full text-center md:mt-0 md:w-1/2 md:text-left md:flex md:flex-col md:justify-center">
          <h1
            ref={titleRef}
            className="text-4xl font-bold text-[#FF5ACD] md:text-6xl lg:text-7xl"
          >
            VINNOVATEIT
          </h1>
          <h2
            ref={subtitleRef}
            className="text-4xl font-bold text-[#9FFF47] md:text-6xl lg:text-7xl"
          >
            RECRUITING
          </h2>
          <h3
            ref={nowRef}
            className="text-4xl font-bold text-white md:text-6xl lg:text-7xl"
          >
            NOW
          </h3>
          <p
            ref={taglineRef}
            className="mt-4 text-base font-semibold text-white md:text-lg"
          >
            VinnovateIT, because everybody needs a family in college!
          </p>
          <Link href="/apply" className="group inline-block">
            <button
              ref={buttonRef}
              className="group pointer-events-none relative z-10 mt-4 overflow-hidden rounded-none bg-pink-500 px-8 py-2 font-bold uppercase text-white transition-transform duration-200 hover:scale-110 md:mt-6 md:px-6 md:py-3"
            >
              <span className="relative z-10 group-hover:text-black">
                REGISTER NOW
              </span>
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-[#9FFF47] transition-transform duration-300 ease-in-out group-hover:scale-y-100"></span>
            </button>
          </Link>
        </div>

        {/* RIGHT IMAGE SECTION - aligned with text vertically */}
        <div className="relative mt-4 flex justify-center items-center md:mt-0 md:w-1/2">
          <div ref={heroImageRef} className="md:flex md:items-center md:h-full">
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

      {/* Blinking Arrow SVG at bottom */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <svg
          ref={arrowRef}
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-pulse"
        >
          <circle cx="30" cy="30" r="29" stroke="#9FFF47" strokeWidth="2" />
          <path
            d="M30 15 L30 45 M20 35 L30 45 L40 35"
            stroke="#9FFF47"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 select-none overflow-hidden opacity-0"
        data-ctf="v1nn0v4t3"
        data-hint="This is the first. Robots have been barred to access the next one."
        style={{ position: "absolute", clip: "rect(0,0,0,0)" }}
      />
    </div>
  );
};

export default Landingpage;