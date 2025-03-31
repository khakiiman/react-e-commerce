import Link from 'next/link';
import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="max-w-6xl px-4 mx-auto mt-20 sm:px-6">
        <div className="flex flex-col-reverse items-center justify-between py-4 border-t sm:flex-row md:py-8 border-silver-lake-blue">
          {}
          <ul className="flex items-center justify-center mt-4 sm:mt-0">
            <li>
              <Link
                href="https://github.com/khakiiman"
                target="_blank"
                className="flex items-center justify-center transition duration-150 ease-in-out bg-white rounded-full shadow-md text-yinmn-blue hover:text-silver-lake-blue hover:bg-white-100"
                aria-label="github"
              >
                <FaGithub className="w-6 h-6 p-1 fill-current sm:w-8 sm:h-8" />
              </Link>
            </li>
          </ul>
          {}
          <div className="text-xs text-center sm:text-sm sm:text-left text-yinmn-blue dark:text-white-smoke">
            By{' '}
            <a className="text-gray-400 hover:underline" href="https://github.com/khakiiman">
              Iman Arvand
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
