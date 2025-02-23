"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import illustration1 from "public/assets/x36.png";
import illustration2 from "public/assets/x34.png";
import illustration3 from "public/assets/Group 414.png";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const JoinOurCommunity: React.FC = () => {
  // Create refs for the animated letters and images
  const nInJoinDesktopRef = useRef<HTMLSpanElement>(null);
  const rInOurDesktopRef = useRef<HTMLSpanElement>(null);
  const iInCommunityDesktopRef = useRef<HTMLSpanElement>(null);
  const nInJoinMobileRef = useRef<HTMLSpanElement>(null);
  const rInOurMobileRef = useRef<HTMLSpanElement>(null);
  const iInCommunityMobileRef = useRef<HTMLSpanElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Set up GSAP animations when component mounts
    const setupAnimations = () => {
      // Set perspective on parent elements for 3D effect
      const setParentPerspective = (element: HTMLElement | null) => {
        if (element && element.parentElement) {
          gsap.set(element.parentElement, { perspective: 400 });
        }
      };
      
      // Desktop elements
      [nInJoinDesktopRef.current, rInOurDesktopRef.current, iInCommunityDesktopRef.current].forEach(setParentPerspective);
      
      // Mobile elements
      [nInJoinMobileRef.current, rInOurMobileRef.current, iInCommunityMobileRef.current].forEach(setParentPerspective);
      
      // Create Y-axis rotation animation for N in JOIN
      const animateN = (element: HTMLElement | null) => {
        if (!element) return null;
        
        return gsap.timeline({ repeat: -1, repeatDelay: 1.5 })
          .to(element, {
            rotationY: 360,
            duration: 2,
            ease: "power2.inOut"
          });
      };
      
      // Create X-axis rotation animation for R in OUR
      const animateR = (element: HTMLElement | null) => {
        if (!element) return null;
        
        return gsap.timeline({ repeat: -1, repeatDelay: 1.5 })
          .to(element, {
            rotationX: 360,
            duration: 2,
            ease: "power2.inOut"
          });
      };
      
      // Create Z-axis rotation animation for I in COMMUNITY
      const animateI = (element: HTMLElement | null) => {
        if (!element) return null;
        
        return gsap.timeline({ repeat: -1, repeatDelay: 1.5 })
          .to(element, {
            rotation: 360,
            duration: 2,
            ease: "power2.inOut"
          });
      };

      // Set up scroll-triggered animations for images
      if (leftImageRef.current && rightImageRef.current) {
        // Animate left image
        gsap.fromTo(leftImageRef.current,
          {
            x: "-100%",
            opacity: 0
          },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: leftImageRef.current,
              start: "top 80%",
              end: "top 20%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Animate right image
        gsap.fromTo(rightImageRef.current,
          {
            x: "100%",
            opacity: 0
          },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: rightImageRef.current,
              start: "top 80%",
              end: "top 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
      
      // Start letter rotation animations with different delays for staggered effect
      const timelines = [
        // Desktop animations
        animateN(nInJoinDesktopRef.current),
        animateR(rInOurDesktopRef.current),
        animateI(iInCommunityDesktopRef.current),
        
        // Mobile animations
        animateN(nInJoinMobileRef.current),
        animateR(rInOurMobileRef.current),
        animateI(iInCommunityMobileRef.current)
      ];
      
      // Filter out null timelines
      return timelines.filter(Boolean) as gsap.core.Timeline[];
    };
    
    // Initialize animations
    const timelines = setupAnimations();
    
    // Cleanup function
    return () => {
      timelines.forEach(timeline => timeline.kill());
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="pb-10 md:pb-8 absolute min-w-full bg-[#1E003E] text-white max-w-screen-lg overflow-hidden cursor-none">
      <div className='absolute top-0 right-0 overflow-hidden pointer-events-none'>
        <Image
          src={illustration3}
          alt="sjdd"
          className='relative top-0 md:h-20 md:w-20 lg:h-24 lg:w-24 h-16 w-16'
        />
      </div>
      <div className="mt-12 sm:mt-24 flex justify-between">
        <div ref={leftImageRef}>
          <Image
            src={illustration2}
            alt="illustration"
            style={{ objectFit: "cover" }}
            className="relative mt-[5vh] top-[30%] h-[13rem] w-[12rem] md:h-[16rem] md:w-[14.4rem]"
          />
        </div>

        <div className="hidden text-center font-Fixture tracking-wider sm:flex sm:flex-col sm:pt-14 sm:text-5xl md:pt-16 md:text-5xl lg:pt-16 lg:text-7xl xl:pt-14 xl:text-9xl">
          <div className="relative">
            JOI<span ref={nInJoinDesktopRef} className="inline-block rotating-letter">N</span> <span className="text-[#BC18CF]">OU<span ref={iInCommunityDesktopRef} className="inline-block rotating-letter">R</span></span>
          </div>
          <div>
            <span className="gradient-text2"> CO</span>MM<span ref={rInOurDesktopRef} className="inline-block rotating-letter">U</span>
            <span className="gradient-text">NI</span>TY
          </div>
        </div>

        <div ref={rightImageRef}>
          <Image
            src={illustration1}
            alt="illustration"
            style={{ objectFit: "cover" }}
            className="relative mt-[5vh] top-[30%] h-[13rem] w-[12rem] md:h-[16rem] md:w-[14.4rem]]"
          />
        </div>
      </div>

      {/* Rest of the component remains the same */}
      <div className="flex flex-col items-center pt-6 font-Fixture text-5xl leading-[3rem] sm:hidden">
        <div>
          <h1>
            JOI<span ref={nInJoinMobileRef} className="inline-block rotating-letter">N</span> <span className="text-[#BC18CF]"> OU<span ref={iInCommunityMobileRef} className="inline-block rotating-letter">R</span></span>
          </h1>
        </div>
        <div>
          <h1>
            <span className="gradient-text2"> CO</span>MM<span ref={rInOurMobileRef} className="inline-block rotating-letter">R</span>
            <span className="gradient-text">NI</span>TY
          </h1>
        </div>
      </div>

      <div className="flex justify-center pt-7 md:pt-11">
        <ul className="flex gap-10 md:gap-4 lg:gap-6">
          <li>
            <a
              href="https://www.instagram.com/vinnovateit/?utm_source=ig_web_button_share_sheet"
              target="_blank"
              className="group"
            >
              <AiFillInstagram className="h-8 w-8 md:h-9 md:w-9 lg:h-12 lg:w-12 transition-all duration-300 text-white group-hover:text-pink-500 " />

            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/VinnovateIT/" target="_blank" className="group">
              <FaFacebook className="h-7 w-7 md:h-8 md:w-8 lg:h-11 lg:w-11 transition-all duration-300 group-hover:text-blue-500" />
            </a>
          </li>
          <li>
            <a href="https://x.com/v_innovate_it" target="_blank" className="group">
              <FaXTwitter className="h-7 w-7 md:h-8 md:w-8 lg:h-11 lg:w-11 transition-all duration-300 group-hover:text-black" />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/company/v-innovate-it/"
              target="_blank"
              className="group"
            >
              <FaLinkedin className="h-7 w-7 md:h-8 md:w-8 lg:h-11 lg:w-11 transition-all duration-300 group-hover:text-blue-500" />
            </a>
          </li>
          <li>
            <a href="https://github.com/vinnovateit" target="_blank" className="group">
              <FaGithub className="h-7 w-7 md:h-8 md:w-8 lg:h-11 lg:w-11 transition-all duration-300 group-hover:text-blue-800" />
            </a>
          </li>
        </ul>
      </div>

      <style>{`
        .gradient-text {
          background-image: linear-gradient(to bottom right, #BC18CF 58%, #ffffff 50%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .gradient-text2 {
          background-image: linear-gradient(to top right, #BC18CF 56%, #ffffff 50%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .rotating-letter {
          display: inline-block;
          transform-style: preserve-3d;
          min-width: 0.7em;
          text-align: center;
          backface-visibility: visible;
          transform-origin: center center;
        }
        
        /* Fix for gradient text with rotating letter */
        .gradient-text .rotating-letter {
          background-image: none;
          background-clip: initial;
          -webkit-background-clip: initial;
          -webkit-text-fill-color: inherit;
          color: inherit;
        }
      `}</style>
    </section>
  );
};

export default JoinOurCommunity;