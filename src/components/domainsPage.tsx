"use client";

import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
      gsap.set(starGraphicRef.current, {
        scale: 0,
        opacity: 0,
        rotation: -180
      });

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

      // Store event handlers for cleanup
      const hoverHandlers = cardsRef.current.map(card => {
        const enterHandler = () => {
          gsap.to(card, {
            scale: 1.05,
            y: -10,
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            duration: 0.4,
            ease: "power2.out"
          });
        };

        const leaveHandler = () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            boxShadow: "0 0px 0px rgba(0, 0, 0, 0)",
            duration: 0.5,
            ease: "power3.out"
          });
        };

        card.addEventListener("mouseenter", enterHandler);
        card.addEventListener("mouseleave", leaveHandler);

        return { card, enterHandler, leaveHandler };
      });

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

      // Return cleanup function with handlers
      return hoverHandlers;
    };

    const timer = setTimeout(initAnimations, 100);
    let hoverHandlers: Array<{card: HTMLDivElement, enterHandler: () => void, leaveHandler: () => void}> = [];

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      
      // Clean up event listeners
      hoverHandlers.forEach(({ card, enterHandler, leaveHandler }) => {
        card.removeEventListener("mouseenter", enterHandler);
        card.removeEventListener("mouseleave", leaveHandler);
      });
    };
  }, []);

  return (
    <div className="font-Fixture">
      <div className="mt-0 min-h-screen bg-[#1E003E] flex flex-col relative">
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
                  className="font-outline-2 text-4xl md:text-6xl lg:text-7xl font-bold text-specpurple opacity-0"
                >
                  OUR
                </div>
                <div
                  ref={domainsTextRef}
                  className="mr-2 pt-3 text-4xl md:text-6xl lg:text-7xl font-bold text-white opacity-0"
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

        <div className="flex-grow w-full px-4 md:px-8 lg:px-20 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            <div
              ref={addToCardsRef}
              className="opacity-0 card-container"
            >
              <img
                src="/managementcard.png"
                alt="Management"
                className="w-full max-w-[200px] md:max-w-[320px]"
              />
            </div>

            <div
              ref={addToCardsRef}
              className="opacity-0 card-container"
            >
              <img
                src="/techcard.png"
                alt="Technical"
                className="w-full max-w-[200px] md:max-w-[320px]"
              />
            </div>

            <div
              ref={addToCardsRef}
              className="md:col-span-2 lg:col-span-1 opacity-0 card-container"
            >
              <img
                src="/designcard.png"
                alt="Design"
                className="w-full max-w-[200px] md:max-w-[320px]"
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .card-container {
          transform: perspective(1000px);
          transition-property: transform, box-shadow;
          will-change: transform;
          transform-style: preserve-3d;
          border-radius: 12px;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default DomainsPage;