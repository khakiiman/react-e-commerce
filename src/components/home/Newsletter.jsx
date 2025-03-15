import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

function Newsletter() {
    useEffect(() => {
       Aos.init(); 
    },[])
  return (
    <section>
      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        <div className="pb-12 md:pb-20">

          <div className="relative px-8 py-10 overflow-hidden bg-white rounded-lg shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] dark:shadow-[0_20px_50px_rgba(66,_135,_245,_0.3)] dark:bg-gray-800 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 md:py-16 md:px-12" data-aos="zoom-y-out">

            {/* Background illustration */}
            <div className="absolute bottom-0 right-0 hidden pointer-events-none lg:block" aria-hidden="true">
              <svg width="428" height="328" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient cx="35.542%" cy="34.553%" fx="35.542%" fy="34.553%" r="96.031%" id="ni-a">
                    <stop stopColor="#e5e7eb" offset="0%" />
                    <stop stopColor="#4b5563" offset="44.317%" />
                    <stop stopColor="#1f2937" offset="100%" />
                  </radialGradient>
                </defs>
                <g fill="none" fillRule="evenodd">
                  <g fill="#4b5563">
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

              {/* CTA content */}
              <div className="text-center lg:text-left lg:max-w-xl">
                <h3 className="mb-2 font-bold text-gray-900 dark:text-gray-100 h3">Powering your business</h3>
                <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">Stay updated with our latest products, exclusive deals, and industry insights delivered straight to your inbox.</p>

                {/* CTA form */}
                <form className="w-full lg:w-auto">
                  <div className="flex flex-col justify-center max-w-xs mx-auto sm:flex-row sm:max-w-md lg:mx-0">
                    <input type="email" className="w-full px-4 py-3 mb-2 text-gray-900 placeholder-gray-500 bg-gray-100 border border-gray-300 rounded-sm appearance-none dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400 focus:outline-none sm:mb-0 sm:mr-2" placeholder="Your email…" aria-label="Your email…" />
                    <a className="text-white bg-gray-900 shadow hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 btn" href="#0">Subscribe</a>
                  </div>
                </form>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Newsletter;
