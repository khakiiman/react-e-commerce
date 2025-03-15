import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";

function ThemeSwitcher() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      data-testid="theme-switcher"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 360 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === "dark" ? (
          <FaMoon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        ) : (
          <FaSun className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        )}
      </motion.div>
    </button>
  );
}

export default ThemeSwitcher;
