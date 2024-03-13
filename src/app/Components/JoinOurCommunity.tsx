import React from 'react';
import Image from 'next/image';
import illustration1 from 'public/assets/x36.png';
import illustration2 from 'public/assets/x34.png';
import illustration3 from 'public/assets/Group 414.png'
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const JoinOurCommunity: React.FC = () => {
    return (
        <section className='bg-[#1E003E] text-white'>
            {/*<div className='absolute top-0 right-0'>
                <Image
                src={illustration3}
                alt="sjdd"
                className='relative top-0 md:h-16 md:w-16 h-10 w-10'/>
    </div>*/}
            <div className='flex xl:gap-[2.2rem] lg:gap-[1.9rem] md:gap-[1.4rem] gap-[1.9rem] justify-center'>
                <Image
                    src={illustration2}
                    alt="illustration"
                    style={{ objectFit: 'cover' }}
                    className="relative top-[30%] xl:h-[22.1rem] xl:w-[18.7rem] lg:h-[18rem] lg:w-[18.5rem] md:h-[15rem] md:w-[13.9rem] h-[11rem] w-[9.9rem] "
                />

                <div className='font-Fixture xl:text-8xl lg:text-7xl md:text-5xl text-center xl:pt-14 lg:pt-16 hidden md:flex md:flex-col md:pt-16 tracking-wider'>
                    <div>
                    JOIN <span className='text-[#BC18CF]'>OUR </span>
                    </div>
                    <div>
                    <span className='gradient-text2'> CO</span>MMU<span className='gradient-text'>NI</span>TY
                    </div>
                    
                </div>

                <Image
                    src={illustration1}
                    alt="illustration"
                    style={{ objectFit: 'cover' }}
                    className="relative top-[30%] xl:h-[22.5rem] xl:w-[17.9rem] lg:h-[18.4rem] lg:w-[15rem] md:h-[14.8rem] md:w-[10.9rem] h-[10.9rem] w-[8.5rem]"
                />
            </div>

            <div className='font-Fixture text-5xl flex flex-col items-center md:hidden pt-6 leading-[3rem]'>
                <div>
                <h1>JOIN <span className='text-[#BC18CF]'>OUR</span></h1>
                </div>
                <div>
                    <h1><span className='gradient-text2'> CO</span>MMU<span className='gradient-text'>NI</span>TY</h1>
                    </div>
            </div>

            <div className='flex justify-center md:pt-11 pt-7'>
                <ul className='flex gap-10 md:gap-4 lg:gap-6'>
                    <li><a href="https://www.instagram.com/vinnovateit/?utm_source=ig_web_button_share_sheet" target="_blank"><AiFillInstagram className='cursor-pointer h-8 w-8 lg:h-12 lg:w-12 md:h-9 md:w-9' /></a></li>
                    <li><a href="" target="_blank"><FaFacebook className='cursor-pointer h-7 w-7 lg:h-11 lg:w-11 md:h-8 md:w-8' /></a></li>
                    <li><a href="" target="_blank"><FaTwitter size={48} className='cursor-pointer h-7 w-7 lg:h-11 lg:w-11 md:h-8 md:w-8' /></a></li>
                    <li><a href="https://www.linkedin.com/company/v-innovate-it/" target="_blank"><FaLinkedin size={48} className='cursor-pointer h-7 w-7 lg:h-11 lg:w-11 md:h-8 md:w-8' /></a></li>
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
}

export default JoinOurCommunity;
