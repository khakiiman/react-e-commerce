'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import AOS from 'aos';
import 'aos/dist/aos.css';

const HeroHome = () => {
  useEffect(() => {
    AOS.init({
      once: false,
      duration: 800,
      easing: 'ease-out',
    });
  }, []);

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  };

  const pulseAnimation = {
    scale: [1, 1.03, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'reverse' as const,
    },
  };

  return (
    <section className="relative">
      <div
        className="absolute bottom-0 hidden transform -translate-x-1/2 pointer-events-none xl:left-1/2 lg:left-1/3 lg:block -z-30"
        aria-hidden="true"
      >
        <svg width="1200" height="490" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01">
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
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="pb-12 text-center md:pb-16">
            <h1
              className="mb-4 text-5xl font-extrabold tracking-tighter md:text-6xl leading-tighter"
              data-aos="zoom-y-out"
            >
              This Repo is for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rich-black to-white-smoke dark:from-gray-600">
                Skill Show !&nbsp;&nbsp;&nbsp;
              </span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p
                className="mb-8 text-xl text-silver-lake-blue"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                Our tech stack includes Next.js 14.2 for fast development, along with React Query 5,
                Redux Toolkit, and Axios for data management. We utilize Tailwind CSS 3 and Framer
                Motion 11 for styling and animations.
              </p>
              <div
                className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <div>
                  <motion.div
                    variants={buttonVariants}
                    initial="initial"
                    animate={pulseAnimation}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Link
                      className="w-full mb-4 btn bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-200 dark:hover:bg-white dark:text-gray-900 sm:w-auto sm:mb-0 shadow-md transition-colors duration-300"
                      href="/products"
                      data-testid="shop-button"
                    >
                      Start Shopping
                    </Link>
                  </motion.div>
                </div>
                <div>
                  <motion.div
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Link
                      className="w-full btn bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 sm:w-auto sm:ml-4 shadow-md transition-colors duration-300"
                      href="/about"
                      data-testid="about-button"
                    >
                      Learn more
                    </Link>
                  </motion.div>
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
