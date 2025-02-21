"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Photo from "../../public/assets/AboutUs.png";
import Graphic from "../../public/assets/8.png";
import Wow from "../../public/assets/Group.png";

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = unknown;

const AboutUs = (props: Props) => {
  const image1URL = Photo.src;
  const image2URL = Graphic.src;
  const image3URL = Wow.src;
  
  // Create refs for all animated elements
  const imageRef = useRef(null);
  const overlayImageRef = useRef(null);
  const sectionRef = useRef(null);
  const titleAboutRef = useRef(null);
  const titleVinnovateRef = useRef(null);
  const paragraphRef = useRef(null);
  const starGraphicRef = useRef(null);
  
  useEffect(() => {
    // Make sure GSAP is only run on client-side
    if (typeof window === "undefined") return;
    
    // Initial states
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
    
    // Create a master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        toggleActions: "play none none none"
      }
    });
    
    // Animation sequence with faster durations
    tl
      // 1. First animate the "ABOUT" title - reduced from 0.4 to 0.3
      .to(titleAboutRef.current, {y: 0, opacity: 1, duration: 0.3, ease: "power2.out"})
      
      // 2. Then animate the "VINNOVATEIT" title - reduced from 0.4 to 0.3
      .to(titleVinnovateRef.current, {y: 0, opacity: 1, duration: 0.3, ease: "power2.out"}, "-=0.4")
      
      // 3. Horizontal unfurling animation - reduced from 2.2 to 1.6
      .to(imageRef.current, {
        duration: 1.6,
        scaleX: 1,
        opacity: 1,
        ease: "power2.out",
      }, "-=0.2")
      // Reduced from 1.0 to 0.7
      .to(imageRef.current, {
        filter: "brightness(1) contrast(1)",
        duration: 0.7,
        ease: "power1.out",
      }, "-=0.8")
      // Reduced from 0.3 to 0.2
      .to(imageRef.current, {
        scaleX: 1.02,
        duration: 0.2,
        ease: "power1.in",
      }, "-=0.1")
      // Reduced from 0.2 to 0.15
      .to(imageRef.current, {
        scaleX: 1,
        duration: 0.15,
        ease: "elastic.out(1, 0.5)",
      })
      
      // 4. Stamp effect - reduced from 0.4 to 0.3
      .to(overlayImageRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "back.out(2)",
        onStart: () => {
          gsap.to(imageRef.current, {
            x: 5,
            duration: 0.08, // Reduced from 0.1 to 0.08
            repeat: 1,
            yoyo: true,
            ease: "none"
          });
        }
      }, "-=0.1")
      
      // 5. Paragraph text reveal - reduced from 1.0 to 0.7
      .to(paragraphRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power2.out"
      }, "-=0.2")
      
      // 6. Star graphic animation - reduced from 0.8 to 0.6
      .to(starGraphicRef.current, {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, "-=0.4");
    
    // Cleanup function
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
      className="flex h-screen w-full flex-col items-center justify-center font-Fixture "
    >
      <div className="block h-[10vh] w-full bg-blue-300 md:mt-10"/>
      <div className="relative">
        <div className="ml-9 max-w-[80vw] pt-3 md:pl-8 md:pt-10 md:mt-[3.5rem] ">
          <div 
            ref={titleAboutRef}
            className="font-outline-2 text-6xl font-bold text-specpurple md:text-7xl"
          >
            ABOUT
          </div>
          <div 
            ref={titleVinnovateRef}
            className="mr-2 pt-3 text-5xl font-bold text-white md:text-7xl"
          >
            VINNOVATEIT
          </div>
        </div>
        
        <div className="relative">
          <div className="mt-12 flex justify-center px-14 overflow-hidden">
            <img 
              ref={imageRef}
              src={image1URL} 
              alt="group-photo" 
              className="transform-gpu will-change-transform"
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
            className="text-mono ml-10 mr-10 mt-14 text-center text-sm font-bold text-white md:ml-60 md:mr-60 md:text-lg"
          >
            {
              "VinnovateIT is the official innovation and incubation lab of SITE School, VIT Vellore. To put it simply....we are the answer to the question 'What if Elon Musk and Albert Einstein had a brain child?' We aim to be the one stop destination for all you curious cats and satisfy your hunger in the diverse world of computer science."
            }
          </p>
        </div>
        
        {/* <div 
          ref={starGraphicRef}
          className="mt-12 w-20 md:w-32 md:mt-5"
        >
          <img src={image2URL} alt="star-graphic" />
        </div> */}
      </div>
    </section>
  );
};

export default AboutUs;