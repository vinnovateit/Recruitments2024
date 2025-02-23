"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Photo from "../../public/assets/AboutUs.png";
import Graphic from "../../public/assets/8.png";
import Wow from "../../public/assets/Group.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = unknown;

const AboutUs = (props: Props) => {
  const image1URL = Photo.src;
  const image2URL = Graphic.src;
  const image3URL = Wow.src;
  
  const imageRef = useRef(null);
  const overlayImageRef = useRef(null);
  const sectionRef = useRef(null);
  const titleAboutRef = useRef(null);
  const titleVinnovateRef = useRef(null);
  const paragraphRef = useRef(null);
  const starGraphicRef = useRef(null);
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    gsap.set(imageRef.current, {
      scaleX: 0,
      transformOrigin: "center left",
      opacity: 0.8,
      filter: "brightness(1.2) contrast(0.8)"
    });
    
    gsap.set(overlayImageRef.current, {
      opacity: 0,
      scale: 1.5,
      rotation: -5
    });
    
    gsap.set([titleAboutRef.current, titleVinnovateRef.current], {
      y: 50,
      opacity: 0
    });
    
    gsap.set(paragraphRef.current, {
      y: 30,
      opacity: 0
    });
    
    gsap.set(starGraphicRef.current, {
      scale: 0,
      opacity: 0,
      rotation: -180
    });
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        toggleActions: "play none none none"
      }
    });
    
    tl
      .to(titleAboutRef.current, {y: 0, opacity: 1, duration: 0.3, ease: "power2.out"})
      .to(titleVinnovateRef.current, {y: 0, opacity: 1, duration: 0.3, ease: "power2.out"})
      .to(imageRef.current, {
        duration: 1.6,
        scaleX: 1,
        opacity: 1,
        ease: "power2.out",
      }, "-=0.2")
      .to(imageRef.current, {
        filter: "brightness(1) contrast(1)",
        duration: 0.7,
        ease: "power1.out",
      }, "-=0.8")
      .to(imageRef.current, {
        scaleX: 1.02,
        duration: 0.2,
        ease: "power1.in",
      }, "-=0.1")
      .to(imageRef.current, {
        scaleX: 1,
        duration: 0.15,
        ease: "elastic.out(1, 0.5)",
      })
      .to(overlayImageRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "back.out(2)",
        onStart: () => {
          gsap.to(imageRef.current, {
            x: 5,
            duration: 0.08,
            repeat: 1,
            yoyo: true,
            ease: "none"
          });
        }
      }, "-=0.1")
      .to(paragraphRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power2.out"
      }, "-=0.2");
    
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, []);

  return (
    <section
      id="aboutus"
      ref={sectionRef}
      className="flex w-full flex-col items-center justify-start font-Fixture pb-16 md:pb-24" // Added bottom padding
    >
      <div className="relative w-full">
        <div className="ml-9 pt-3 md:pl-8">
          <div 
            ref={titleAboutRef}
            className="font-outline-2 text-4xl md:text-6xl lg:text-7xl font-bold text-specpurple"
          >
            ABOUT
          </div>
          <div 
            ref={titleVinnovateRef}
            className="mr-2 pt-3 text-4xl md:text-6xl lg:text-7xl font-bold text-white"
          >
            VINNOVATEIT
          </div>
        </div>
        
        <div className="relative">
          <div className="mt-8 flex justify-center px-14 overflow-hidden">
            <img 
              ref={imageRef}
              src={image1URL} 
              alt="group-photo" 
              className="transform-gpu will-change-transform max-w-full md:max-w-[70%]" // Added max-width control
            />
          </div>
          
          <img
            ref={overlayImageRef}
            src={image3URL}
            alt="overlay-image"
            style={{
              position: "absolute",
              top: "-10%",
              right: "8%",
              width: "25%",
              height: "auto",
              transformOrigin: "center center",
              filter: "drop-shadow(0 4px 4px rgba(0,0,0,0.5))"
            }}
            className="transform-gpu"
          />
        </div>
        
        <div>
          <p 
            ref={paragraphRef}
            className="text-mono ml-10 mr-10 mt-8 text-center text-sm font-bold text-white md:ml-60 md:mr-60 md:text-lg"
          >
            {
              "VinnovateIT is the official innovation and incubation lab of SITE School, VIT Vellore. To put it simply....we are the answer to the question 'What if Elon Musk and Albert Einstein had a brain child?' We aim to be the one stop destination for all you curious cats and satisfy your hunger in the diverse world of computer science."
            }
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;