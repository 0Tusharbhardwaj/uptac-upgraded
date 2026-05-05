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
  const [instituteSearch, setInstituteSearch] = useState('');
  const [isInstituteDropdownOpen, setIsInstituteDropdownOpen] = useState(false);
  const instituteRef = useRef<HTMLDivElement>(null);

  // Memoize the creation of unique lists to prevent recalculation on every render
  const uniqueInstitutes = React.useMemo(() => Array.from(new Set(collegeData.map(c => c.institute))).sort(), [collegeData]);
  const uniquePrograms = React.useMemo(() => Array.from(new Set(collegeData.map(c => c.program))).sort(), [collegeData]);
  
  const filteredInstitutes = uniqueInstitutes.filter(inst => 
    inst.toLowerCase().includes(instituteSearch.toLowerCase())
  );

  // Effect to handle clicks outside the institute dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (instituteRef.current && !instituteRef.current.contains(event.target as Node)) {
        setIsInstituteDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Update search input when an institute is selected from the main state
  useEffect(() => {
    setInstituteSearch(institute);
  }, [institute]);

  return (
    <div className="rounded-2xl p-4 sm:p-8">
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
        {/* Institute Searchable Input */}
        <div className="space-y-2 relative" ref={instituteRef}>
          <label className="block text-sm font-semibold text-gray-700">
            Institute
          </label>
          <div className="relative">
            <input
              type="text"
              value={instituteSearch}
              onChange={(e) => {
                setInstituteSearch(e.target.value);
                setInstitute(''); // Clear selection when user types
                setIsInstituteDropdownOpen(true);
              }}
              onFocus={() => setIsInstituteDropdownOpen(true)}
              placeholder="Search for an institute..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-lg font-medium"
            />
            {instituteSearch && (
              <button 
                onClick={() => {
                  setInstituteSearch('');
                  setInstitute('');
                }} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          {isInstituteDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredInstitutes.length > 0 ? (
                filteredInstitutes.map((inst, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setInstitute(inst);
                      setInstituteSearch(inst);
                      setIsInstituteDropdownOpen(false);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-indigo-50"
                  >
                    {inst}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">No institutes found</div>
              )}
            </div>
          )}
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
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-lg font-medium"
          >
            <option value="">Select Category</option>
            {[
              "OPEN", "SC", "ST", "BC", "FW", "EWS", "Open(Girl)", 
              "SC(GIRL)", "ST(GIRL)", "EWS(GL)", "BC(GIRL)", 
              "BC(AF)", "OPEN(AF)", "SC(AF)", "ST(AF)"
            ].map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Round Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Round (Optional)
          </label>
          <select
            value={round}
            onChange={(e) => setRound(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          >
            <option value="">All Rounds</option>
            {["Round 1", "Round 2", "Round 3", "Round 4"].map((rnd, idx) => (
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
