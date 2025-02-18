import React from "react";
import Image from "next/image";
import illustration1 from "public/assets/x36.png";
import illustration2 from "public/assets/x34.png";
import illustration3 from "public/assets/Group 414.png";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const JoinOurCommunity: React.FC = () => {
  return (
    <section className="pb-10 md:pb-8 absolute min-w-full bg-[#1E003E] text-white max-w-screen-lg">
      <div className='absolute top-0 right-0'>
                <Image
                src={illustration3}
                alt="sjdd"
                className='relative top-0 md:h-16 md:w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24 h-9 w-9'/>
  </div>
      <div className="mt-12 sm:mt-24 flex justify-between">
        <Image
          src={illustration2}
          alt="illustration"
          style={{ objectFit: "cover" }}
          className="relative mt-[5vh] top-[30%] h-[13rem] w-[12rem] md:h-[16rem] md:w-[14.4rem]"
        />

        <div className="hidden text-center font-Fixture tracking-wider sm:flex sm:flex-col sm:pt-14 sm:text-5xl md:pt-16 md:text-5xl lg:pt-16 lg:text-7xl xl:pt-14 xl:text-9xl">
          <div>
            JOIN <span className="text-[#BC18CF]">OUR </span>
          </div>
          <div>
            <span className="gradient-text2"> CO</span>MMU
            <span className="gradient-text">NI</span>TY
          </div>
        </div>

        <Image
          src={illustration1}
          alt="illustration"
          style={{ objectFit: "cover" }}
          className="relative mt-[5vh] top-[30%] h-[13rem] w-[12rem] md:h-[16rem] md:w-[14.4rem]]"
        />
      </div>
      <div className="flex flex-col items-center pt-6 font-Fixture text-5xl leading-[3rem] sm:hidden">
        <div>
          <h1>
            JOIN <span className="text-[#BC18CF]">OUR</span>
          </h1>
        </div>
        <div>
          <h1>
            <span className="gradient-text2"> CO</span>MMU
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
            >
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
              <FaTwitter
                size={48}
                className="h-7 w-7 cursor-pointer md:h-8 md:w-8 lg:h-11 lg:w-11"
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/company/v-innovate-it/"
              target="_blank"
            >
              <FaLinkedin
                size={48}
                className="h-7 w-7 cursor-pointer md:h-8 md:w-8 lg:h-11 lg:w-11"
              />
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
            `}</style>
    </section>
  );
};

export default JoinOurCommunity;
