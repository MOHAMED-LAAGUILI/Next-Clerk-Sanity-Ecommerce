"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@sanity/icons";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Effect to set the theme based on local storage
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const darkMode = theme === "dark";
    setIsDarkMode(darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, []);

  // Toggles the dark mode and saves to local storage
  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <>
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleTheme}
        className="text-gray-800 dark:text-gray-200 hover:text-blue-600 transition p-1 border shadow-2xl rounded-full"
        aria-label="Toggle Dark Mode"
      >
        {isDarkMode ? ( <> <SunIcon className="w-9 h-9" /> </> ) : ( <> <MoonIcon className="w-9 h-9" /> </> )}
      </button>
    </>
  );
};

export default ThemeToggle;
