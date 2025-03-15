import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

import { SiReactrouter } from "react-icons/si";
import { SiTailwindcss } from "react-icons/si";
import { SiReact } from "react-icons/si";
import { FaNode } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

function About() {
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
        <div className="flex text-4xl md:text-[60px] justify-evenly my-8 text-grayshade-50 ">
          <span data-aos="zoom-in">
            <SiReact
              className="hover:text-[#149ECA]  transition-all ease duration-300"
            />
          </span>
          <span data-aos="zoom-in">
            <SiReactrouter
              className="hover:text-[#F44250] transition-all ease duration-300"
            />
          </span>
          <span data-aos="zoom-in">
            <SiTailwindcss
              className="hover:text-[#38BDF8] transition-all ease duration-300"
            />
          </span>
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
            <FaLinkedin className="hover:text-[#0077b5]  transition-all ease duration-300" />
          </Link>
          <Link to={"https://github.com/khakiiman"} target="_blank" data-aos="zoom-in">
            <FaGithub className="transition-all duration-300 hover:text-black dark:hover:text-white ease" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
