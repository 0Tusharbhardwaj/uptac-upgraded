import React from 'react';
import { Filter, RotateCcw, Search } from 'lucide-react';

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
  onSearch,
  onReset,
  loading,
  collegeData
}) => {
  // Memoize the creation of unique lists to prevent recalculation on every render
  const uniqueInstitutes = React.useMemo(() => Array.from(new Set(collegeData.map(c => c.institute))).sort(), [collegeData]);
  const uniquePrograms = React.useMemo(() => Array.from(new Set(collegeData.map(c => c.program))).sort(), [collegeData]);
  const uniqueCategories = React.useMemo(() => Array.from(new Set(collegeData.map(c => c.category))).sort(), [collegeData]);
  const uniqueRounds = React.useMemo(() => Array.from(new Set(collegeData.map(c => c.round))).sort(), [collegeData]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <Filter className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Filter Cutoff Data</h2>
          <p className="text-gray-600">Select your preferences to view specific results</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Institute Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Institute
          </label>
          <select
            value={institute}
            onChange={(e) => setInstitute(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-lg font-medium"
          >
            <option value="">--- All Institutes ---</option>
            {uniqueInstitutes.map((inst, idx) => (
              <option key={idx} value={inst}>{inst}</option>
            ))}
          </select>
        </div>

        {/* Program Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Program
          </label>
          <select
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          >
            <option value="">--- All Programs ---</option>
            {uniquePrograms.map((prog, idx) => (
              <option key={idx} value={prog}>{prog}</option>
            ))}
          </select>
        </div>

        {/* Category Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-lg font-medium"
          >
            <option value="">--- All Categories ---</option>
            {uniqueCategories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Round Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Round
          </label>
          <select
            value={round}
            onChange={(e) => setRound(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          >
            <option value="">--- All Rounds ---</option>
            {uniqueRounds.map((rnd, idx) => (
              <option key={idx} value={rnd}>{rnd}</option>
            ))}
          </select>
        </div>
        
        {/* Quota Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Quota
          </label>
          <select
            value={quota}
            onChange={(e) => setQuota(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-lg font-medium"
          >
            <option value="">--- All Quotas ---</option>
            <option value="Home State">Home State</option>
            <option value="All India">All India</option>
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
          className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 border border-gray-200"
        >
          <RotateCcw className="w-5 h-5" />
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
