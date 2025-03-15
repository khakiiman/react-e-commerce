import React from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer>
      <div className="max-w-6xl px-4 mx-auto mt-20 sm:px-6">
        <div className="py-4 border-t md:flex md:items-center md:justify-between md:py-8 border-grayshade-50">
          {/* Social links */}
          <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0">
            <li className="ml-4">
              <Link
                to="https://github.com/khakiiman/react-e-commerce"
                target="_blank"
                className="flex items-center justify-center transition duration-150 ease-in-out bg-white rounded-full shadow-md text-grayshade-400 hover:text-grayshade-50 hover:bg-white-100"
                aria-label="github"
              >
                <FaGithub  className="w-8 h-8 p-1 fill-current" />
              </Link>
            </li>
          </ul>

          {/* Copyrights note */}
          <div className="mr-4 text-sm text-grayshade-400 dark:text-lightColor-100">
            By{" "}
            <a
              className="text-purpleshade-300 hover:underline"
              href="https://github.com/khakiiman"
            >
              Iman Arvand
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
