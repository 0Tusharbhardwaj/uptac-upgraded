import React, { useState, useEffect } from 'react';
import { GraduationCap, BookOpen, Search, Moon, Sun } from 'lucide-react';

const Header: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  return (
    <header className="bg-gradient-to-br from-white via-gray-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-b border-gray-200 dark:border-slate-800 shadow-sm relative">
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors shadow-sm"
        aria-label="Toggle Dark Mode"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                UPTAC B.Tech. Counselling Predictor <span className="text-indigo-600 dark:text-indigo-400">2026</span>
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">
                Based on 2025 Data
              </p>
            </div>
          </div>

          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl leading-relaxed">
            Explore the official opening and closing ranks from the UPTAC B.Tech 2025 counselling rounds to understand admission trends.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <span className="flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full border border-purple-200 text-sm font-medium dark:bg-purple-900 dark:text-purple-100 dark:border-purple-700">
              <BookOpen className="w-4 h-4" />
              Based on 2025 Official Data
            </span>
            <span className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200 text-sm font-medium dark:bg-green-900 dark:text-green-100 dark:border-green-700">
              <Search className="w-4 h-4" />
              Filter by Round, Institute, Program & Category
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
