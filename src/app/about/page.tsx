'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsBoxSeam } from 'react-icons/bs';
import { FaTheaterMasks } from 'react-icons/fa';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdOutlineTransitEnterexit } from 'react-icons/md';
import {
  SiAxios,
  SiEslint,
  SiFormik,
  SiFramer,
  SiNextdotjs,
  SiPrettier,
  SiReact,
  SiReactquery,
  SiReactrouter,
  SiRedux,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import { TbCookie } from 'react-icons/tb';

import { useTheme } from '@/contexts/ThemeContext';
import { colorSystem } from '@/styles/colorSystem';

export default function AboutPage() {
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();

  const getThemeColor = (colorCategory: keyof typeof colorSystem.light, colorType: string) => {
    return colorSystem[theme][colorCategory][
      colorType as keyof (typeof colorSystem.light)[typeof colorCategory]
    ];
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sectionVariants: Variants = {
    hidden: { opacity: isMobile ? 0.7 : 0, y: isMobile ? 20 : 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: isMobile ? 0.7 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const iconVariants: Variants = {
    hidden: { opacity: isMobile ? 0.7 : 0, scale: 0.8, rotate: isMobile ? 0 : -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const socialVariants: Variants = {
    hidden: { opacity: isMobile ? 0.7 : 0, scale: isMobile ? 0.8 : 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    },
    hover: {
      scale: 1.3,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: isMobile ? 0.7 : 0, y: isMobile ? 10 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const getViewportSettings = (threshold = 0.1) => {
    return isMobile
      ? { once: true, amount: threshold, margin: '-50px 0px' }
      : { once: true, amount: threshold };
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`container px-4 py-8 mx-auto sm:px-6 max-w-7xl ${getThemeColor('background', 'primary')}`}
    >
      <motion.div
        initial={{ opacity: isMobile ? 1 : 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col-reverse items-center justify-center pt-20 md:flex-row md:items-start"
      >
        <div className="w-3/4 [&>p]:text-lg [&>p]:lg:text-xl [&>h1]:lg:text-3xl">
          <motion.h1
            initial={isMobile ? 'visible' : 'hidden'}
            animate={isMobile ? 'visible' : undefined}
            whileInView="visible"
            viewport={getViewportSettings()}
            variants={sectionVariants}
            className={`mt-6 mb-3 text-3xl font-extrabold ${getThemeColor('text', 'heading')}`}
          >
            About Developer
          </motion.h1>

          <motion.p
            initial={isMobile ? 'visible' : 'hidden'}
            animate={isMobile ? 'visible' : undefined}
            whileInView="visible"
            viewport={getViewportSettings()}
            variants={textVariants}
            className={getThemeColor('text', 'primary')}
          >
            Hello there! I&apos;m{' '}
            <motion.span
              initial={{ color: '#6b46c1' }}
              animate={{
                color: ['#6b46c1', '#3b82f6', '#10b981', '#6b46c1'],
                transition: { duration: 5, repeat: Infinity, ease: 'linear' },
              }}
              className="font-semibold"
            >
              <Link href="https://imankhaki.vercel.app/">Iman Arvand</Link>
            </motion.span>
            , an enthusiastic developer who created this platform. Driven by a passion for precision
            and dedication to building intuitive digital solutions.
          </motion.p>

          <motion.h1
            initial={isMobile ? 'visible' : 'hidden'}
            animate={isMobile ? 'visible' : undefined}
            whileInView="visible"
            viewport={getViewportSettings()}
            variants={sectionVariants}
            className={`mt-6 mb-3 text-xl font-extrabold ${getThemeColor('text', 'heading')}`}
          >
            Frameworks and Technologies Used
          </motion.h1>

          <motion.p
            initial={isMobile ? 'visible' : 'hidden'}
            animate={isMobile ? 'visible' : undefined}
            whileInView="visible"
            viewport={getViewportSettings()}
            variants={textVariants}
            className={getThemeColor('text', 'primary')}
          >
            In the development of this website, I&apos;ve harnessed the power of the following
            frameworks and technologies to create a modern, single-page application (SPA):
          </motion.p>

          <motion.div
            initial={isMobile ? 'visible' : 'hidden'}
            animate={isMobile ? 'visible' : undefined}
            whileInView="visible"
            viewport={getViewportSettings(0.05)}
            variants={containerVariants}
            className={`grid grid-cols-3 gap-8 my-8 text-4xl md:text-[60px] ${getThemeColor('text', 'secondary')} md:grid-cols-5`}
          >
            <motion.a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              variants={iconVariants}
              whileHover="hover"
              className="flex flex-col items-center"
            >
              <SiNextdotjs className="hover:text-black dark:hover:text-white" />
              <span className="mt-2 text-sm md:text-base">Next.js</span>
            </motion.a>

            <motion.a
              href="https://react.dev"
              target="_blank"
              rel="noopener noreferrer"
              variants={iconVariants}
              whileHover="hover"
              className="flex flex-col items-center"
            >
              <SiReact className="hover:text-[#149ECA]" />
              <span className="mt-2 text-sm md:text-base">React</span>
            </motion.a>

            <motion.a
              href="https://reactrouter.com/"
              target="_blank"
              rel="noopener noreferrer"
              variants={iconVariants}
              whileHover="hover"
              className="flex flex-col items-center"
            >
              <SiReactrouter className="hover:text-[#F44250] dark:hover:text-[#F44250]" />
              <span className="mt-2 text-sm md:text-base">React Router</span>
            </motion.a>

            <motion.a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              variants={iconVariants}
              whileHover="hover"
              className="flex flex-col items-center"
            >
              <SiTailwindcss className="hover:text-[#38BDF8]" />
              <span className="mt-2 text-sm md:text-base">Tailwind</span>
            </motion.a>

            <motion.a
              href="https://redux-toolkit.js.org"
              target="_blank"
              rel="noopener noreferrer"
              variants={iconVariants}
              whileHover="hover"
              className="flex flex-col items-center"
            >
              <SiRedux className="hover:text-[#764ABC]" />
              <span className="mt-2 text-sm md:text-base">Redux</span>
            </motion.a>

            <motion.a
              href="https://axios-http.com"
              target="_blank"
              rel="noopener noreferrer"
              variants={iconVariants}
              whileHover="hover"
              className="flex flex-col items-center"
            >
              <SiAxios className="hover:text-[#5A29E4]" />
              <span className="mt-2 text-sm md:text-base">Axios</span>
            </motion.a>

            <motion.a
              href="https://formik.org"
              target="_blank"
              rel="noopener noreferrer"
              variants={iconVariants}
              whileHover="hover"
              className="flex flex-col items-center"
            >
              <SiFormik className="hover:text-[#0EABF5]" />
              <span className="mt-2 text-sm md:text-base">Formik</span>
            </motion.a>

            <motion.a
              href="https://tanstack.com/query"
              target="_blank"
              rel="noopener noreferrer"
              variants={iconVariants}
              whileHover="hover"
              className="flex flex-col items-center"
            >
              <SiReactquery className="hover:text-[#FF4154]" />
              <span className="mt-2 text-sm md:text-base">React Query</span>
            </motion.a>

            <motion.a
              href="https://www.framer.com/motion"
              target="_blank"
              rel="noopener noreferrer"
              variants={iconVariants}
              whileHover="hover"
              whileTap={{ scale: 0.9, rotate: -5 }}
              className="flex flex-col items-center"
            >
              <SiFramer className="hover:text-[#0055FF]" />
              <span className="mt-2 text-sm md:text-base">Framer Motion</span>
            </motion.a>

            <motion.a
              href="https://michalsnik.github.io/aos"
              target="_blank"
              rel="noopener noreferrer"
              variants={iconVariants}
              whileHover="hover"
              className="flex flex-col items-center"
            >
              <motion.span
                className="font-bold hover:text-[#2D8CF0]"
                whileHover={{ textShadow: '0 0 8px rgb(45, 140, 240, 0.5)' }}
              >
                AOS
              </motion.span>
              <span className="mt-2 text-sm md:text-base">Animate On Scroll</span>
            </motion.a>

            <motion.a
              href="https://sonner.emilkowal.ski"
              target="_blank"
              rel="noopener noreferrer"
              variants={iconVariants}
              whileHover="hover"
              className="flex flex-col items-center"
            >
              <SiShadcnui className="hover:text-[#F97316]" />
              <span className="mt-2 text-sm md:text-base">Sonner</span>
            </motion.a>

            <motion.a
              href="https://github.com/reactivestack/cookies/tree/master/packages/react-cookie"
              target="_blank"
              rel="noopener noreferrer"
              variants={iconVariants}
              whileHover="hover"
              className="flex flex-col items-center"
            >
              <TbCookie className="hover:text-[#D4AA00]" />
              <span className="mt-2 text-sm md:text-base">React Cookie</span>
            </motion.a>

            <motion.a
              href="https://reactcommunity.org/react-transition-group"
              target="_blank"
              rel="noopener noreferrer"
              variants={iconVariants}
              whileHover="hover"
              className="flex flex-col items-center"
            >
              <MdOutlineTransitEnterexit className="hover:text-[#00C8FF]" />
              <span className="mt-2 text-sm md:text-base">Transition Group</span>
            </motion.a>

            <motion.a
              href="https://mhnpd.github.io/react-loader-spinner"
              target="_blank"
              rel="noopener noreferrer"
              variants={iconVariants}
              whileHover="hover"
              className="flex flex-col items-center"
            >
              <BsBoxSeam className="hover:text-[#7E57C2]" />
              <span className="mt-2 text-sm md:text-base">Loader Spinner</span>
            </motion.a>

            <motion.a
              href="https://www.typescriptlang.org"
              target="_blank"
              rel="noopener noreferrer"
              variants={iconVariants}
              whileHover="hover"
              className="flex flex-col items-center"
            >
              <SiTypescript className="hover:text-[#3178C6]" />
              <span className="mt-2 text-sm md:text-base">TypeScript</span>
            </motion.a>

            <motion.a
              href="https://playwright.dev"
              target="_blank"
              rel="noopener noreferrer"
              variants={iconVariants}
              whileHover="hover"
              className="flex flex-col items-center"
            >
              <FaTheaterMasks className="hover:text-[#2EAD33]" />
              <span className="mt-2 text-sm md:text-base">Playwright</span>
            </motion.a>

            <motion.a
              href="https://eslint.org"
              target="_blank"
              rel="noopener noreferrer"
              variants={iconVariants}
              whileHover="hover"
              className="flex flex-col items-center"
            >
              <SiEslint className="hover:text-[#4B32C3]" />
              <span className="mt-2 text-sm md:text-base">ESLint</span>
            </motion.a>

            <motion.a
              href="https://prettier.io"
              target="_blank"
              rel="noopener noreferrer"
              variants={iconVariants}
              whileHover="hover"
              className="flex flex-col items-center"
            >
              <SiPrettier className="hover:text-[#F7B93E]" />
              <span className="mt-2 text-sm md:text-base">Prettier</span>
            </motion.a>
          </motion.div>

          <motion.h1
            initial={isMobile ? 'visible' : 'hidden'}
            animate={isMobile ? 'visible' : undefined}
            whileInView="visible"
            viewport={getViewportSettings()}
            variants={sectionVariants}
            className={`mt-6 mb-3 text-xl font-extrabold ${getThemeColor('text', 'heading')}`}
          >
            Let&apos;s Connect
          </motion.h1>

          <motion.p
            initial={isMobile ? 'visible' : 'hidden'}
            animate={isMobile ? 'visible' : undefined}
            whileInView="visible"
            viewport={getViewportSettings()}
            variants={textVariants}
            className={getThemeColor('text', 'primary')}
          >
            Feel free to browse through the site and explore all the features. I welcome any
            feedback or questions you may have - your experience and satisfaction are my top
            priorities. I hope you enjoy discovering everything this platform has to offer. Have a
            great shopping experience!
          </motion.p>

          <motion.div
            initial={isMobile ? 'visible' : 'hidden'}
            animate={isMobile ? 'visible' : undefined}
            whileInView="visible"
            viewport={getViewportSettings()}
            variants={containerVariants}
            className={`flex text-4xl md:text-[60px] justify-evenly my-8 ${getThemeColor('text', 'primary')}`}
          >
            <motion.div
              variants={socialVariants}
              whileHover="hover"
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center"
            >
              <Link
                href="https://linkedin.com/in/imankhaki"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="hover:text-[#0077b5]" />
              </Link>
              <span className="mt-2 text-sm md:text-base">LinkedIn</span>
            </motion.div>

            <motion.div
              variants={socialVariants}
              whileHover="hover"
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center"
            >
              <Link href="https://github.com/khakiiman" target="_blank" rel="noopener noreferrer">
                <FaGithub className="hover:text-black dark:hover:text-white" />
              </Link>
              <span className="mt-2 text-sm md:text-base">GitHub</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className={`fixed bottom-10 right-10 w-16 h-16 rounded-full ${getThemeColor('button', 'primary')} flex items-center justify-center text-white`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        drag
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        dragElastic={0.8}
      >
        <motion.div
          animate={{
            rotate: 360,
            transition: { duration: 8, repeat: Infinity, ease: 'linear' },
          }}
        >
          <SiFramer className="text-2xl" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
