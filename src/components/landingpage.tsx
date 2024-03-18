"use client";
import React from "react";
import Image from "next/image";
import profilePic from "public/lp_img.png";
import "../styles/landingpage/landingpage.css";
export const Landingpage = () => {
  return (
    <div className="total_component">
      <div className="topleft_svg">
        <svg
          className="w-1/4 md:w-1/4 lg:w-1/6"
          width="129"
          height="95"
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
          <defs>
            <filter
              id="filter0_d_56_3802"
              x="-15.2115"
              y="-11.7312"
              width="144.185"
              height="102.297"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="5" dy="5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.592157 0 0 0 0 0.572549 0 0 0 0 0.564706 0 0 0 1 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_56_3802"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_56_3802"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
      <div className="hidden h-auto w-full max-w-full  md:block md:w-3/4 lg:w-1/2">
        <Image
          className="lpimage w-full md:w-3/4 lg:w-1/2"
          src={profilePic}
          alt="Description of your image"
          height={500}
          width={750}
        />
      </div>
      <div className="vrn">
        <div className="v sm:3xl text-4xl md:text-6xl lg:text-7xl">
          VINNOVATEIT
        </div>
        <div className="r sm:3xl text-2xl md:text-4xl lg:text-7xl">
          RECRUITING
        </div>
        <div className="n sm:3xl text-2xl md:text-4xl lg:text-7xl">NOW</div>
      </div>
      <div className="ml-5 md:hidden md:w-3/4 lg:w-1/2">
        <Image
          className="lpimage2 md:w-3/4 lg:w-1/2"
          src={profilePic}
          alt="Description of your image"
          height={500}
          width={750}
        />
      </div>
      <div className="text-sm md:mt-8 md:text-base lg:mt-12 lg:text-lg">
        <div className="tagline">
          VinnovateIT, because everybody needs a family in college!
        </div>
      </div>
      <button className="button mt-4 px-6 py-3 md:mt-2 lg:mt-12">
        REGISTER NOW
      </button>
    </div>
  );
};
