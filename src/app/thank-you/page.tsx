"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook, FaXTwitter, FaLinkedin, FaGithub } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import gsap from "gsap";

import illustration1 from "public/assets/x36.png";
import illustration2 from "public/assets/x34.png";
import CustomCursor3 from "~/components/CursorAnimation3";
import ThankYou from "~/components/ThankYou";

const Page: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  // Create refs for the illustrations
  const illustration1Ref = useRef(null);
  const illustration2Ref = useRef(null);

 useLayoutEffect(() => {
  if (typeof window !== "undefined") {
    gsap.from(illustration1Ref.current, {
      x: 300,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(illustration2Ref.current, {
      x: -300,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }
}, []);

  return (
    <section className="relative flex items-center justify-center min-h-screen min-w-full bg-[#1E003E] text-white overflow-hidden">
      <CustomCursor3 color={isHovered ? "#F472B6" : "#C1FF44"} />
      <div className="absolute top-0 left-0">
        <svg
          className="w-16 md:w-32 lg:w-40 ml-[-1.2vw]"
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
      </div>

      <div className="absolute top-0 right-0">
        <img 
          src="/thundericon.png" 
          alt="Thunder Icon" 
          className="w-20 md:w-32"
        />
      </div>
      <div className="font-Fixture pt-20">
        {/* Top Left Illustration animated from left */}
        <div
          className="opacity-0 md:opacity-100 absolute top-0 left-3 pt-6 md:pt-24"
        >
          <Image
            src={illustration2}
            alt="illustration"
            className="h-32 w-32 lg:h-40 lg:w-40"
          />
        </div>

        <div className="md:mt-8 lg:mt-12 flex justify-center">
          <ThankYou setIsHovered={setIsHovered} />
          
        </div>
        <p className="mt-5 text-center">Forms are Closed Now. See You Soon !!</p>

        {/* Bottom Right Illustration animated from right */}
        <div
          className="opacity-0 md:opacity-100 absolute bottom-0 right-0 m-6"
        >
          <Image
            src={illustration1}
            alt="illustration"
            className="h-32 w-32 lg:h-40 lg:w-40"
          />
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center pt-10 md:pt-11">
          <ul className="flex gap-10 md:gap-4 lg:gap-6">
            <li>
              <a
                href="https://www.instagram.com/vinnovateit/?utm_source=ig_web_button_share_sheet"
                target="_blank"
                className="group"
              >
                <AiFillInstagram className="h-8 w-8 md:h-9 md:w-9 lg:h-12 lg:w-12 transition-all duration-300 text-white group-hover:text-pink-500" />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/VinnovateIT/"
                target="_blank"
                className="group"
              >
                <FaFacebook className="h-7 w-7 md:h-8 md:w-8 lg:h-11 lg:w-11 transition-all duration-300 group-hover:text-blue-500" />
              </a>
            </li>
            <li>
              <a
                href="https://x.com/v_innovate_it"
                target="_blank"
                className="group"
              >
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
              <a
                href="https://github.com/vinnovateit"
                target="_blank"
                className="group"
              >
                <FaGithub className="h-7 w-7 md:h-8 md:w-8 lg:h-11 lg:w-11 transition-all duration-300 group-hover:text-blue-800" />
              </a>
            </li>
          </ul>
        </div>

        {/* Go Back Button */}
        <div className="flex justify-center pt-8">
          <button
            onClick={() => router.push("/")}
            className="bg-pink-500 text-white hover:text-black px-6 py-3 text-lg font-semibold transition duration-300 hover:bg-[#9FFF47]"
          >
            Go Back
          </button>
        </div>
      </div>
    </section>
  );
};

export default Page;
