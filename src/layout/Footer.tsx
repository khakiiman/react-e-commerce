import React from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="max-w-6xl px-4 mx-auto mt-20 sm:px-6">
        <div className="flex flex-col-reverse items-center justify-between py-4 border-t sm:flex-row md:py-8 border-grayshade-50">
          {/* Social links */}
          <ul className="flex items-center justify-center mt-4 sm:mt-0">
            <li>
              <Link
                to="https://github.com/khakiiman/react-e-commerce"
                target="_blank"
                className="flex items-center justify-center transition duration-150 ease-in-out bg-white rounded-full shadow-md text-grayshade-400 hover:text-grayshade-50 hover:bg-white-100"
                aria-label="github"
              >
                <FaGithub className="w-6 h-6 p-1 fill-current sm:w-8 sm:h-8" />
              </Link>
            </li>
          </ul>

          {/* Copyrights note */}
          <div className="text-xs text-center sm:text-sm sm:text-left text-grayshade-400 dark:text-lightColor-100">
            By{" "}
            <a
              className="text-gray-400 hover:underline"
              href="https://github.com/khakiiman"
            >
              Iman Arvand
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 