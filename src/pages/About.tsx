import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

import { SiReactrouter, SiTailwindcss, SiReact, SiRedux, SiReactquery, SiAxios, SiFormik, SiFramer, SiSonar } from "react-icons/si";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { TbCookie } from "react-icons/tb";
import { MdOutlineTransitEnterexit } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { Link } from "react-router-dom";

const About: React.FC = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className="flex flex-col-reverse items-center justify-center pt-20 wrapper md:flex-row md:items-start ">
      <div className="w-3/4 [&>p]:text-lg [&>p]:lg:text-xl [&>h1]:lg:text-3xl">
        <h1 className="mt-6 mb-3 text-3xl font-extrabold text-purpleshade-300">
          About Developer
        </h1>
        <p className=" text-grayshade-200 dark:text-lightColor-300">
          Hello there! I'm{" "}
          <span className="font-semibold text-purpleshade-300">
            Iman Arvand
          </span>
          , an enthusiastic developer who created this platform. Driven by a passion for
          precision and dedication to building intuitive digital solutions.
        </p>
        <h1 className="mt-6 mb-3 text-xl font-extrabold text-purpleshade-300">
          Frameworks and Technologies Used
        </h1>
        <p className="text-grayshade-200 dark:text-lightColor-300">
          In the development of this website, I've harnessed the power of the
          following frameworks and technologies to create a modern, single-page
          application (SPA):
        </p>
        <div className="grid grid-cols-3 gap-8 my-8 text-4xl md:text-[60px] text-grayshade-50 md:grid-cols-5">
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer" data-aos="zoom-in" className="flex justify-center transition-all duration-300 transform hover:scale-110">
            <SiReact className="hover:text-[#149ECA] transition-all ease duration-300" />
          </a>
          <a href="https://reactrouter.com" target="_blank" rel="noopener noreferrer" data-aos="zoom-in" className="flex justify-center transition-all duration-300 transform hover:scale-110">
            <SiReactrouter className="hover:text-[#F44250] transition-all ease duration-300" />
          </a>
          <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" data-aos="zoom-in" className="flex justify-center transition-all duration-300 transform hover:scale-110">
            <SiTailwindcss className="hover:text-[#38BDF8] transition-all ease duration-300" />
          </a>
          <a href="https://redux-toolkit.js.org" target="_blank" rel="noopener noreferrer" data-aos="zoom-in" className="flex justify-center transition-all duration-300 transform hover:scale-110">
            <SiRedux className="hover:text-[#764ABC] transition-all ease duration-300" />
          </a>
          <a href="https://tanstack.com/query" target="_blank" rel="noopener noreferrer" data-aos="zoom-in" className="flex justify-center transition-all duration-300 transform hover:scale-110">
            <SiReactquery className="hover:text-[#FF4154] transition-all ease duration-300" />
          </a>
          <a href="https://axios-http.com" target="_blank" rel="noopener noreferrer" data-aos="zoom-in" className="flex justify-center transition-all duration-300 transform hover:scale-110">
            <SiAxios className="hover:text-[#5A29E4] transition-all ease duration-300" />
          </a>
          <a href="https://formik.org" target="_blank" rel="noopener noreferrer" data-aos="zoom-in" className="flex justify-center transition-all duration-300 transform hover:scale-110">
            <SiFormik className="hover:text-[#0EABF5] transition-all ease duration-300" />
          </a>
          <a href="https://www.framer.com/motion" target="_blank" rel="noopener noreferrer" data-aos="zoom-in" className="flex justify-center transition-all duration-300 transform hover:scale-110">
            <SiFramer className="hover:text-[#0055FF] transition-all ease duration-300" />
          </a>
          <a href="https://michaelabrahamsen.com/posts/getting-started-with-aos-animations/" target="_blank" rel="noopener noreferrer" data-aos="zoom-in" className="flex justify-center transition-all duration-300 transform hover:scale-110">
            <span className="font-bold hover:text-[#2D8CF0] transition-all ease duration-300">AOS</span>
          </a>
          <a href="https://sonner.emilkowal.ski" target="_blank" rel="noopener noreferrer" data-aos="zoom-in" className="flex justify-center transition-all duration-300 transform hover:scale-110">
            <SiSonar className="hover:text-[#F97316] transition-all ease duration-300" />
          </a>
          <a href="https://www.npmjs.com/package/react-cookie" target="_blank" rel="noopener noreferrer" data-aos="zoom-in" className="flex justify-center transition-all duration-300 transform hover:scale-110">
            <TbCookie className="hover:text-[#D4AA00] transition-all ease duration-300" />
          </a>
          <a href="https://reactcommunity.org/react-transition-group/" target="_blank" rel="noopener noreferrer" data-aos="zoom-in" className="flex justify-center transition-all duration-300 transform hover:scale-110">
            <MdOutlineTransitEnterexit className="hover:text-[#00C8FF] transition-all ease duration-300" />
          </a>
          <a href="https://www.npmjs.com/package/redux-persist" target="_blank" rel="noopener noreferrer" data-aos="zoom-in" className="flex justify-center transition-all duration-300 transform hover:scale-110">
            <BsBoxSeam className="hover:text-[#7E57C2] transition-all ease duration-300" />
          </a>
        </div>
        <h1 className="mt-6 mb-3 text-xl font-extrabold text-purpleshade-300">
          Let's Connect
        </h1>
        <p className="text-grayshade-200 dark:text-lightColor-300">
          Feel free to browse through the site and explore all the features. I welcome any
          feedback or questions you may have - your experience and satisfaction are my top
          priorities. I hope you enjoy discovering everything this platform has to offer.
          Have a great shopping experience!
        </p>
        <div className="flex text-4xl md:text-[60px] justify-evenly my-8 text-grayshade-50">
          <Link to={"https://www.linkedin.com/in/imankhaki"} target="_blank" data-aos="zoom-in">
            <FaLinkedin className="hover:text-[#0077b5] transition-all ease duration-300" />
          </Link>
          <Link to={"https://github.com/khakiiman"} target="_blank" data-aos="zoom-in">
            <FaGithub className="transition-all duration-300 hover:text-black dark:hover:text-white ease" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About; 