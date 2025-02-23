"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import illustration1 from "public/assets/x36.png";
import illustration2 from "public/assets/x34.png";
import illustration3 from "public/assets/Group 414.png";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import CustomCursor from "~/components/CursorAnimation";
import gsap from 'gsap';

const translations = [
  { language: 'English', text: 'THANK YOU' },
  { language: 'Hindi', text: 'धन्यवाद' },
  { language: 'Tamil', text: 'நன்றி' },
  { language: 'Telugu', text: 'ధన్యవాదాలు' },
  { language: 'Malayalam', text: 'നന്ദി' },
  { language: 'French', text: 'MERCI' },
  { language: 'Spanish', text: 'GRACIAS' },
  { language: 'Japanese', text: 'ありがとう' }
];

const Page: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [translationsStarted, setTranslationsStarted] = useState(false);
  
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);
  const textRef = useRef(null);
  const socialsRef = useRef(null);
  const buttonRef = useRef(null);

  // Initial animations
  useEffect(() => {
    // Reset initial positions
    gsap.set(leftImageRef.current, { x: '-100%' });
    gsap.set(rightImageRef.current, { x: '100%' });
    gsap.set(textRef.current, { opacity: 0, y: 50 });
    gsap.set(socialsRef.current, { opacity: 0, y: 20 });
    gsap.set(buttonRef.current, { opacity: 0, y: 20 });

    // Animate elements in sequence
    const tl = gsap.timeline();
    tl.to(leftImageRef.current, {
      x: 0,
      duration: 1,
      ease: "power3.out"
    })
    .to(rightImageRef.current, {
      x: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.8")
    .to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    })
    .to([socialsRef.current, buttonRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out"
    });
  }, []);

  // Handle text click to start translations
  const handleTextClick = () => {
    if (!translationsStarted) {
      setTranslationsStarted(true);
      
      // Start the translation animations
      const interval = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % translations.length);
          setIsAnimating(false);
        }, 500);
      }, 2000);

      return () => clearInterval(interval);
    }
  };

  return (
    <section className="pb-10 md:pb-8 min-h-screen relative min-w-full bg-[#1E003E] text-white cursor-none overflow-hidden">
      <CustomCursor/>
      <div className='absolute top-0 right-0 cursor-none'>
        <Image
          src={illustration3}
          alt="background"
          className='relative top-0 md:h-16 md:w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24 h-9 w-9'
        />
      </div>
      
      {/* Left Image */}
      <div 
        ref={leftImageRef}
        className="fixed left-0 top-1/2 -translate-y-1/2 hidden sm:block"
      >
        <Image
          src={illustration2}
          alt="illustration"
          style={{ objectFit: "cover" }}
          className="h-[14rem] w-[12rem] md:h-[16rem] md:w-[14.4rem]"
        />
      </div>

      {/* Right Image */}
      <div 
        ref={rightImageRef}
        className="fixed right-0 top-1/2 -translate-y-1/2 hidden sm:block"
      >
        <Image
          src={illustration1}
          alt="illustration"
          style={{ objectFit: "cover" }}
          className="h-[14rem] w-[12rem] md:h-[16rem] md:w-[14.4rem]"
        />
      </div>

      {/* Centered Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div 
          ref={textRef}
          onClick={handleTextClick}
          className="text-center font-Fixture tracking-wider text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl mb-8 sm:mb-0 select-none"
        >
          <div className={`transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            {!translationsStarted ? (
              <><span className="gradient-text2">TH</span>ANK <span className="gradient-text">YOU</span></>
            ) : (
              <span className="gradient-text">{translations[currentIndex].text}</span>
            )}
          </div>
        </div>

        <div 
          ref={socialsRef}
          className="mt-10"
        >
          <ul className="flex gap-6 md:gap-8 lg:gap-10">
            <li>
              <Link
                href="https://www.instagram.com/vinnovateit/"
                target="_blank"
                className="group"
              >
                <AiFillInstagram className="h-6 w-6 sm:h-8 sm:w-8 lg:h-12 lg:w-12 transition-all duration-300 text-white group-hover:text-pink-500" />
              </Link>
            </li>
            <li>
              <Link href="https://www.facebook.com/VinnovateIT/" target="_blank" className="group">
                <FaFacebook className="h-6 w-6 sm:h-7 sm:w-7 lg:h-11 lg:w-11 transition-all duration-300 group-hover:text-blue-500" />
              </Link>
            </li>
            <li>
              <Link href="https://x.com/v_innovate_it" target="_blank" className="group">
                <FaXTwitter className="h-6 w-6 sm:h-7 sm:w-7 lg:h-11 lg:w-11 transition-all duration-300 group-hover:text-black" />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.linkedin.com/company/v-innovate-it/"
                target="_blank"
                className="group"
              >
                <FaLinkedin className="h-6 w-6 sm:h-7 sm:w-7 lg:h-11 lg:w-11 transition-all duration-300 group-hover:text-blue-500" />
              </Link>
            </li>
            <li>
              <Link href="https://github.com/vinnovateit" target="_blank" className="group">
                <FaGithub className="h-6 w-6 sm:h-7 sm:w-7 lg:h-11 lg:w-11 transition-all duration-300 group-hover:text-blue-800" />
              </Link>
            </li>
          </ul>
        </div>

        <div 
          ref={buttonRef}
          className="mt-10"
        >
          <Link href="/">
            <button className="px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg font-semibold text-white bg-purple-600 rounded-lg shadow-lg hover:bg-purple-700 transition">
              Go Back to Home
            </button>
          </Link>
        </div>
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
      `}</style>
    </section>
  );
};

export default Page;