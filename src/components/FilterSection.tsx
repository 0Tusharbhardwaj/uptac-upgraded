import React, { useState, useEffect, useRef } from 'react';
import { Filter, RotateCcw, Search, X } from 'lucide-react';

interface FilterSectionProps {
  category: string;
  setCategory: (category: string) => void;
  quota: string;
  setQuota: (quota: string) => void;
  institute: string;
  setInstitute: (institute: string) => void;
  program: string;
  setProgram: (program: string) => void;
  round: string;
  setRound: (round: string) => void;
  rank: string;
  setRank: (rank: string) => void;
  onSearch: () => void;
  onReset: () => void;
  loading: boolean;
  collegeData: {
    institute: string;
    program: string;
    quota: string;
    category: string;
    round: string;
  }[];
}

const FilterSection: React.FC<FilterSectionProps> = ({
  category,
  setCategory,
  quota,
  setQuota,
  institute,
  setInstitute,
  program,
  setProgram,
  round,
  setRound,
  rank,
  setRank,
  onSearch,
  onReset,
  loading,
  collegeData
}) => {
  const uniqueInstitutes = React.useMemo(() => Array.from(new Set(collegeData.map(c => c.institute).filter(Boolean))).sort(), [collegeData]);
  const uniqueCategories = React.useMemo(() => Array.from(new Set(collegeData.map(c => c.category).filter(Boolean))).sort(), [collegeData]);
  const uniqueQuotas = React.useMemo(() => Array.from(new Set(collegeData.map(c => c.quota).filter(Boolean))).sort(), [collegeData]);
  const uniqueRounds = React.useMemo(() => Array.from(new Set(collegeData.map(c => c.round).filter(Boolean))).sort(), [collegeData]);

  React.useEffect(() => {
    if (quota === 'All India') {
      setCategory('OPEN');
    }
  }, [quota, setCategory]);

  return (
    <div className="rounded-2xl p-4 sm:p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <Filter className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Filter Cutoff Data</h2>
          <p className="text-gray-600 dark:text-gray-400">Select your preferences to view specific results</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        
        {/* ROW 1 */}
        {/* JEE Rank Input */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Your JEE Rank <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            placeholder="Enter your rank"
            className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-lg font-medium bg-white dark:bg-slate-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>

        {/* Category Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-lg font-medium bg-white dark:bg-slate-800 dark:text-white"
          >
            <option value="">Select Category</option>
            {uniqueCategories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Quota Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Quota <span className="text-red-500">*</span>
          </label>
          <select
            value={quota}
            onChange={(e) => setQuota(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-lg font-medium bg-white dark:bg-slate-800 dark:text-white"
          >
            <option value="">Select Quota</option>
            {uniqueQuotas.map((q, idx) => (
              <option key={idx} value={q}>{q}</option>
            ))}
          </select>
        </div>

        {/* ROW 2 */}
        {/* Institute Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Institute (Optional)
          </label>
          <select
            value={institute}
            onChange={(e) => setInstitute(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-lg font-medium bg-white dark:bg-slate-800 dark:text-white"
          >
            <option value="">All Institutes</option>
            {uniqueInstitutes.map((inst, idx) => (
              <option key={idx} value={inst}>{inst}</option>
            ))}
          </select>
        </div>

        {/* Program Input */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Program (Optional)
          </label>
          <input
            type="text"
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            placeholder="Filter by program name"
            className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-lg font-medium bg-white dark:bg-slate-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>

        {/* Round Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Round (Optional)
          </label>
          <select
            value={round}
            onChange={(e) => setRound(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-lg font-medium bg-white dark:bg-slate-800 dark:text-white"
          >
            <option value="">All Rounds</option>
            {uniqueRounds.map((rnd, idx) => (
              <option key={idx} value={rnd}>{rnd}</option>
            ))}
          </select>
        </div>

      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onSearch}
          disabled={loading}
          className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Searching...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Search Cutoffs
            </>
          )}
        </button>

        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-slate-600 transition-all duration-200 border border-gray-200 dark:border-slate-600"
        >
          <RotateCcw className="w-5 h-5" />
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
