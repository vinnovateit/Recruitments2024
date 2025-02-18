import React from "react";
import Image from "next/image";
import Link from "next/link";
import illustration1 from "public/assets/x36.png";
import illustration2 from "public/assets/x34.png";
import illustration3 from "public/assets/Group 414.png";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const Page: React.FC = () => {
  return (
    <section className="pb-10 md:pb-8 absolute min-w-full bg-[#1E003E] text-white">
      <div className='absolute top-0 right-0'>
        <Image
          src={illustration3}
          alt="background"
          className='relative top-0 md:h-16 md:w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24 h-9 w-9'
        />
      </div>
      <div className="mt-12 sm:mt-20 flex justify-between">
        <Image
          src={illustration2}
          alt="illustration"
          style={{ objectFit: "cover" }}
          className="relative mt-[5vh] top-[30%] h-[14rem] w-[12rem] md:h-[16rem] md:w-[14.4rem]"
        />

        <div className="hidden text-center font-Fixture tracking-wider sm:flex sm:flex-col sm:pt-14 sm:text-5xl md:pt-16 md:text-5xl lg:pt-16 lg:text-7xl xl:pt-14 xl:text-9xl">
          <div>
            <span className="gradient-text2">TH</span>ANK <span className="gradient-text"> YOU</span>
          </div>
        </div>

        <Image
          src={illustration1}
          alt="illustration"
          style={{ objectFit: "cover" }}
          className="relative mt-[5vh] top-[30%] h-[14rem] w-[12rem] md:h-[16rem] md:w-[14.4rem]]"
        />
      </div>
      <div className="flex flex-col items-center pt-6 font-Fixture text-5xl leading-[3rem] sm:hidden">
        <div>
          <span className="gradient-text2">TH</span>ANK <span className="gradient-text"> YOU</span>
        </div>
      </div>

      <div className="flex justify-center pt-7 md:pt-11">
        <ul className="flex gap-10 md:gap-4 lg:gap-6">
          <li>
            <a href="https://www.instagram.com/vinnovateit/?utm_source=ig_web_button_share_sheet" target="_blank">
              <AiFillInstagram className="h-8 w-8 cursor-pointer md:h-9 md:w-9 lg:h-12 lg:w-12" />
            </a>
          </li>
          <li>
            <a href="" target="_blank">
              <FaFacebook className="h-7 w-7 cursor-pointer md:h-8 md:w-8 lg:h-11 lg:w-11" />
            </a>
          </li>
          <li>
            <a href="" target="_blank">
              <FaTwitter className="h-7 w-7 cursor-pointer md:h-8 md:w-8 lg:h-11 lg:w-11" />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/company/v-innovate-it/" target="_blank">
              <FaLinkedin className="h-7 w-7 cursor-pointer md:h-8 md:w-8 lg:h-11 lg:w-11" />
            </a>
          </li>
        </ul>
      </div>
      
      {/* Back to Home Button */}
      <div className="flex justify-center mt-10">
        <Link href="/">
          <button className="px-6 py-3 text-lg font-semibold text-white bg-purple-600 rounded-lg shadow-lg hover:bg-purple-700 transition">
            Go Back to Home
          </button>
        </Link>
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