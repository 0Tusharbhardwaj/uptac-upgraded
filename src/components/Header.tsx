import React from 'react';
import { GraduationCap, BookOpen, Search } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-br from-white via-gray-50 to-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                UPTAC B.Tech. Counselling Predictor <span className="text-indigo-600">2026</span>
              </h1>
              <p className="text-sm text-gray-600 font-medium mt-1">
                Based on 2025 Data
              </p>
            </div>
          </div>

          <p className="text-lg text-gray-700 max-w-3xl leading-relaxed">
            Explore the official opening and closing ranks from the UPTAC B.Tech 2025 counselling rounds to understand admission trends.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <span className="flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full border border-purple-200 text-sm font-medium">
              <BookOpen className="w-4 h-4" />
              Based on 2025 Official Data
            </span>
            <span className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200 text-sm font-medium">
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
