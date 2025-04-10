'use client';

import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import colorSystem from '@/styles/colorSystem';

const Newsletter: React.FC = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <section>
      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        <div className="pb-12 md:pb-20">
          <div
            className={`relative px-8 py-10 overflow-hidden ${colorSystem.light.background.card.replace('shadow-sm', '')} backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 md:py-16 md:px-12 shadow-[0_20px_50px_rgba(51,_73,_112,_0.3)] dark:shadow-[0_20px_50px_rgba(13,_27,_42,_0.7)]`}
            data-aos="zoom-y-out"
          >
            <div
              className="absolute bottom-0 right-0 hidden pointer-events-none lg:block"
              aria-hidden="true"
            >
              <svg width="428" height="328" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient
                    cx="35.542%"
                    cy="34.553%"
                    fx="35.542%"
                    fy="34.553%"
                    r="96.031%"
                    id="ni-a"
                  >
                    <stop stopColor="#f5f5f4" offset="0%" />
                    <stop stopColor="#778da9" offset="44.317%" />
                    <stop stopColor="#334970" offset="100%" />
                  </radialGradient>
                </defs>
                <g fill="none" fillRule="evenodd">
                  <g fill="#57789e">
                    <ellipse fillOpacity=".04" cx="185" cy="15.576" rx="16" ry="15.576" />
                    <ellipse fillOpacity=".24" cx="100" cy="68.402" rx="24" ry="23.364" />
                    <ellipse fillOpacity=".12" cx="29" cy="251.231" rx="29" ry="28.231" />
                    <ellipse fillOpacity=".64" cx="29" cy="251.231" rx="8" ry="7.788" />
                    <ellipse fillOpacity=".12" cx="342" cy="31.303" rx="8" ry="7.788" />
                    <ellipse fillOpacity=".48" cx="62" cy="126.811" rx="2" ry="1.947" />
                    <ellipse fillOpacity=".12" cx="78" cy="7.072" rx="2" ry="1.947" />
                    <ellipse fillOpacity=".64" cx="185" cy="15.576" rx="6" ry="5.841" />
                  </g>
                  <circle fill="url(#ni-a)" cx="276" cy="237" r="200" />
                </g>
              </svg>
            </div>
            <div className="relative flex flex-col items-center justify-between lg:flex-row">
              <div className="text-center lg:text-left lg:max-w-xl">
                <h3 className={`mb-2 font-bold ${colorSystem.light.text.primary} h3`}>
                  Powering your business
                </h3>
                <p className={`mb-6 text-lg ${colorSystem.light.text.secondary}`}>
                  Stay updated with our latest products, exclusive deals, and industry insights
                  delivered straight to your inbox.
                </p>
                <form className="w-full lg:w-auto">
                  <div className="flex flex-col justify-center max-w-xs mx-auto sm:flex-row sm:max-w-md lg:mx-0">
                    <input
                      type="email"
                      className={`w-full px-4 py-3 mb-2 ${colorSystem.light.text.primary} placeholder-silver-lake-blue ${colorSystem.light.background.input} appearance-none sm:mb-0 sm:mr-2`}
                      placeholder="Your email…"
                      aria-label="Your email…"
                    />
                    <a className={`${colorSystem.light.button.primary} btn`} href="#0">
                      Subscribe
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
