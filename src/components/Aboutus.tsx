import React from "react";
import Photo from "../../public/assets/AboutUs.png";
import Graphic from "../../public/assets/8.png";
import Wow from "../../public/assets/Group.png";

type Props = unknown;

const AboutUs = (props: Props) => {
  const image1URL = Photo.src;
  const image2URL = Graphic.src;
  const image3URL = Wow.src;

  return (
    <section
      id="aboutus"
      className="flex h-screen w-full flex-col items-center justify-center font-Fixture "
    >
      <div className="relative">
        {/* ABOUT US TEXT */}
        <div className="ml-9 max-w-[80vw] pt-3 md:pl-8 md:pt-10">
          <div className=" font-outline-2 text-6xl font-bold text-specpurple md:text-7xl">
            ABOUT
          </div>
          <div className="mr-2 pt-3 text-5xl font-bold text-white md:text-7xl">
            VINNOVATEIT
          </div>
        </div>
        {/* ABOUT US GRAPHIC */}
        <div className="relative ">
          <div className="mt-12 flex justify-center px-14">
            {/* Adjust width of image1 */}
            <img src={image1URL} alt="group-photo" className="" />
          </div>
          {/* Image 3 positioned relative to Image 1 */}
          <img
            src={image3URL}
            alt="overlay-image"
            style={{
              position: "absolute",
              top: "-10%",
              right: "8%",
              width: "25%",
              height: "auto",
            }}
          />
        </div>
        {/* ABOUT US PARAGRAPH */}
        <div>
          <p className="text-mono ml-10 mr-10 mt-14 text-center text-sm font-bold text-white md:ml-60 md:mr-60 md:text-lg">
            {
              "VinnovateIT is the official innovation and incubation lab of SITE School, VIT Vellore. To put it simply....we are the answer to the question 'What if Elon Musk and Albert Einstein had a brain child?' We aim to be the one stop destination for all you curious cats and satisfy your hunger in the diverse world of computer science."
            }
          </p>
        </div>
        {/* Image 2 */}
        <div className="mt-12 w-20 md:w-32 md:mt-5">
          <img src={image2URL} alt="star-graphic" />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
