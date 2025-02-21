"use client";

import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Graphic from "../../public/assets/8.png";

const DomainsPage: React.FC = () => {
  const imageURL = Graphic.src;
  const ourTextRef = useRef(null);
  const domainsTextRef = useRef(null);
  const thunderRef = useRef(null);
  const starGraphicRef = useRef(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const addToCardsRef = useCallback((el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
    const initAnimations = () => {
      // Initial setup for star
      gsap.set(starGraphicRef.current, {
        scale: 0,
        opacity: 0,
        rotation: -180
      });

      // Star animation
      if (starGraphicRef.current) {
        gsap.to(starGraphicRef.current, {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: starGraphicRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }

      if (ourTextRef.current) {
        gsap.fromTo(
          ourTextRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: ourTextRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (domainsTextRef.current) {
        gsap.fromTo(
          domainsTextRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            delay: 0.2,
            scrollTrigger: {
              trigger: domainsTextRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (thunderRef.current) {
        const thunderTl = gsap.timeline({
          scrollTrigger: {
            trigger: thunderRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });

        thunderTl
          .fromTo(
            thunderRef.current, 
            { opacity: 0 },
            { opacity: 1, duration: 0.1 }
          )
          .to(thunderRef.current, { opacity: 0.3, duration: 0.08 })
          .to(thunderRef.current, { opacity: 1, duration: 0.08 })
          .to(thunderRef.current, { opacity: 0.5, duration: 0.08 })
          .to(thunderRef.current, { opacity: 1, duration: 0.08 })
          .to(thunderRef.current, { opacity: 0.3, duration: 0.06 })
          .to(thunderRef.current, { opacity: 1, duration: 0.08 })
          .to(thunderRef.current, { opacity: 0.4, duration: 0.08 })
          .to(thunderRef.current, { opacity: 1, duration: 0.06 })
          .to(thunderRef.current, { opacity: 1, duration: 0.01 });
      }

      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.1 * index,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      ScrollTrigger.refresh();
    };

    const timer = setTimeout(initAnimations, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="font-Fixture">
      <div className="mt-16 md:mt-40 min-h-screen bg-[#1E003E] flex flex-col relative">
        {/* Star positioned at the corner */}
        <div 
          ref={starGraphicRef}
          className="absolute top-0 left-0 w-20 md:w-32 mt-4 md:mt-8 opacity-0"
        >
          <img src={imageURL} alt="star-graphic" />
        </div>

        <div className="w-full py-4 md:py-6 lg:py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative">
            <div className="flex items-start ml-9 max-w-[80vw] pt-3 md:pl-8 md:pt-10">
              <div className="ml-4">
                <div
                  ref={ourTextRef}
                  className="font-outline-2 text-6xl font-bold text-specpurple md:text-7xl opacity-0"
                >
                  OUR
                </div>
                <div
                  ref={domainsTextRef}
                  className="mr-2 pt-3 text-5xl font-bold text-white md:text-7xl opacity-0"
                >
                  DOMAINS
                </div>
              </div>
            </div>

            <div className="absolute right-0">
              <img
                ref={thunderRef}
                src="/thundericon.png"
                alt="Thunder Icon"
                className="w-20 md:w-32 opacity-0"
              />
            </div>
          </div>
        </div>

        <div className="flex-grow w-full px-4 md:px-8 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            <div
              ref={addToCardsRef}
              className="transform transition-transform hover:scale-105 opacity-0"
            >
              <img
                src="/managementcard.png"
                alt="Management"
                className="w-full max-w-[280px] lg:max-w-[320px] hover:scale-105"
              />
            </div>

            <div
              ref={addToCardsRef}
              className="transform transition-transform hover:scale-105 opacity-0"
            >
              <img
                src="/techcard.png"
                alt="Technical"
                className="w-full max-w-[280px] lg:max-w-[320px] hover:scale-105"
              />
            </div>

            <div
              ref={addToCardsRef}
              className="transform transition-transform md:col-span-2 lg:col-span-1 opacity-0"
            >
              <img
                src="/designcard.png"
                alt="Design"
                className="w-full max-w-[280px] lg:max-w-[320px] hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainsPage;