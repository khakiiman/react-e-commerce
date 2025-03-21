import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const HeroHome: React.FC = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section className="relative">
      <div
        className="absolute bottom-0 hidden transform -translate-x-1/2 pointer-events-none xl:left-1/2 lg:left-1/3 lg:block -z-30"
        aria-hidden="true"
      >
        <svg
          width="1200"
          height="490"
          viewBox="0 0 1360 578"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-01"
            >
              <stop stopColor="#e5e7eb" offset="0%" />
              <stop stopColor="#4b5563" offset="77.402%" />
              <stop stopColor="#1f2937" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-16">
            <h1
              className="mb-4 text-5xl font-extrabold tracking-tighter md:text-6xl leading-tighter"
              data-aos="zoom-y-out"
            >
              This Repo is for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purpleshade-400 to-lightColor-300 dark:from-gray-600">
                Skill Show !
              </span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p
                className="mb-8 text-xl text-grayshade-50"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                Our tech stack includes React 19 with Vite for fast development,
                along with React Query, Axios, and React Router for data
                management and routing. We utilize Tailwind CSS and Framer
                Motion for styling and animations.
              </p>
              <div
                className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <div>
                  <Link
                    className="w-full mb-4 text-white btn bg-purpleshade-400 hover:bg-purpleshade-300 sm:w-auto sm:mb-0"
                    to={"/products"}
                  >
                    Start Shopping
                  </Link>
                </div>
                <div>
                  <Link
                    className="w-full text-white btn bg-grayshade-300 hover:bg-grayshade-200 sm:w-auto sm:ml-4"
                    to={"/about"}
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroHome; 