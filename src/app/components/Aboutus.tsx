import React from 'react';
import Photo from "../assests/AboutUs.png";
import Graphic from "../assests/8.png";
import Wow from "../assests/Group.png";

type Props = {}

const AboutUs = (props: Props) => {

  const image1URL = Photo.src;
  const image2URL = Graphic.src;
  const image3URL = Wow.src;

  return (
    <section id='aboutus' className='bg-specpurple h-screen w-full flex flex-col justify-center items-center'>
      <div className='relative'>
        {/* ABOUT US TEXT */}
        <div className='ml-9 pt-3 md:pt-10 md:pl-8 max-w-[80vw]'>
          <div className=' text-specpurple font-bold font-outline-2 font-mono text-6xl md:text-7xl'>
            ABOUT
          </div>
          <div className='text-white font-bold font-mono text-5xl pt-3 mr-2 md:text-7xl'>
            VINNOVATEIT
          </div>
        </div>
        {/* ABOUT US GRAPHIC */}
        <div className='relative '>
          <div className='px-14 mt-12 flex justify-center'>
            {/* Adjust width of image1 */}
            <img src={image1URL} alt='group-photo' className='' />
          </div>
          {/* Image 3 positioned relative to Image 1 */}
          <img src={image3URL} alt='overlay-image' style={{ position: 'absolute', top: '-10%', right: '8%', width: '25%', height: 'auto' }} />
        </div>
        {/* ABOUT US PARAGRAPH */}
        <div>
          <p className='text-white text-mono ml-10 text-center mr-10 mt-14 font-bold text-sm md:text-lg md:ml-60 md:mr-60'>
              VinnovateIT is the official innovation and incubation lab of SITE School, 
              VIT Vellore. To put it simply....we are the answer to the question "What 
              if Elon Musk and Albert Einstein had a brain child?" We aim to be the 
              one stop destination for all you curious cats and satisfy your hunger 
              in the diverse world of computer science.
          </p>
        </div>
        {/* Image 2 */}
        <div className='size-24 md:mt-5 mt-12'>
          <img src={image2URL} alt='star-graphic' />
        </div>
      </div>
    </section>
  )
}

export default AboutUs;
