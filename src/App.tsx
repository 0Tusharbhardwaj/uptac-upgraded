import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import UnifiedBanner from './components/UnifiedBanner';
import FilterSection from './components/FilterSection';
import ResultsTable from './components/ResultsTable';
import CounselingSidebar from './components/CounselingSidebar';
import BranchComparisonChart from './components/BranchComparisonChart';
import RankTrendChart from './components/RankTrendChart';
import { exportToCSV, exportToPDF, printResults } from './utils/csvExport';
import { AlertCircle, Loader2, Heart, Mail, ListPlus, X } from 'lucide-react';
import axios from 'axios';

interface CollegeData {
  id?: string;
  institute: string;
  program: string;
  quota: string;
  category: string;
  round: string;
  opening_rank: number;
  closing_rank: number;
}

function App() {
  const [collegeData, setCollegeData] = useState<CollegeData[]>([]);
  const [filteredResults, setFilteredResults] = useState<CollegeData[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Filter states
  const [category, setCategory] = useState('');
  const [quota, setQuota] = useState('');
  const [institute, setInstitute] = useState('');
  const [program, setProgram] = useState('');
  const [round, setRound] = useState('');
  const [rank, setRank] = useState('');

  // Counseling Flow States
  const [choices, setChoices] = useState<any[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedInstitute, setSelectedInstitute] = useState('');

  useEffect(() => {
    loadCollegeData();
    // Load choices from local storage or backend if a user system was fully in place
    // For now we simulate user choices state
  }, []);

  const loadCollegeData = async () => {
    try {
      setDataLoading(true);
      setError(null);
      const response = await fetch('/uptac_orcr_full.json');
      if (!response.ok) throw new Error('Failed to load college data');
      const data = await response.json();
      const mappedData = data.map((item: any) => ({
        institute: item.Institute,
        program: item.Program,
        quota: item.Quota,
        category: item.Category,
        round: item.Round,
        opening_rank: item["Opening Rank"],
        closing_rank: item["Closing Rank"],
      }));
      setCollegeData(mappedData);
      setFilteredResults(mappedData.sort((a: any, b: any) => a.institute.localeCompare(b.institute)));
    } catch (err) {
      setError('Failed to load college data. Please refresh the page and try again.');
      console.error('Error loading college data:', err);
    } finally {
      setDataLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      let filtered = collegeData.filter(college => {
        const instituteMatch = !institute || college.institute === institute;
        const programMatch = !program || college.program.toLowerCase().includes(program.toLowerCase());
        const categoryMatch = !category || college.category === category;
        const roundMatch = !round || college.round === round;
        const quotaMatch = !quota || college.quota === quota;
        const rankMatch = !rank || (college.closing_rank >= parseInt(rank));
        return instituteMatch && programMatch && categoryMatch && roundMatch && quotaMatch && rankMatch;
      });
      filtered.sort((a, b) => a.closing_rank - b.closing_rank);
      setFilteredResults(filtered);
    } catch (err) {
      setError('An error occurred while filtering data.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCategory('');
    setQuota('');
    setInstitute('');
    setProgram('');
    setRound('');
    setRank('');
    setFilteredResults(collegeData.sort((a, b) => a.institute.localeCompare(b.institute)));
    setHasSearched(false);
    setError(null);
    setSelectedInstitute('');
  };

  const handleExportCSV = () => exportToCSV(filteredResults, `uptac_cutoff_data.csv`);
  const handleExportPDF = () => exportToPDF(filteredResults, `uptac_cutoff_data.pdf`);
  const handlePrint = () => printResults();

  const handleAddChoice = (college: CollegeData) => {
    const newChoice = {
      id: Math.random().toString(36).substr(2, 9),
      institute: college.institute,
      program: college.program,
      category: college.category,
      closing_rank: college.closing_rank
    };
    setChoices(prev => [...prev, newChoice]);
    setSidebarOpen(true);
  };

  if (dataLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center bg-white/60 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/40">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-lg text-indigo-900 font-medium">Loading UPTAC Full-Stack Platform...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9ff] via-[#f0f4ff] to-[#f5f3ff] dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 font-sans relative overflow-x-hidden text-gray-900 dark:text-gray-100">
      <Header />
      <UnifiedBanner />
      
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col xl:flex-row gap-8">
          <div className={`flex-1 transition-all duration-500 ease-in-out`}>
            {error && (
              <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl p-5 shadow-sm mb-6">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              </div>
            )}

            <div className="bg-white/40 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-indigo-100/50 dark:shadow-none border border-white/60 dark:border-slate-700 p-6 mb-8">
              <FilterSection
                category={category}
                setCategory={setCategory}
                quota={quota}
                setQuota={setQuota}
                institute={institute}
                setInstitute={setInstitute}
                program={program}
                setProgram={setProgram}
                round={round}
                setRound={setRound}
                rank={rank}
                setRank={setRank}
                onSearch={handleSearch}
                onReset={handleReset}
                loading={loading}
                collegeData={collegeData}
              />
            </div>

            {selectedInstitute && (
              <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative bg-white/40 dark:bg-slate-800/50 backdrop-blur-md rounded-3xl p-6 border border-white/60 dark:border-slate-700">
                <div className="flex justify-between items-center mb-6 px-2">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">Institute Analysis</h2>
                  <button onClick={() => setSelectedInstitute('')} className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <BranchComparisonChart institute={selectedInstitute} round={round || 'Round 1'} category={category || 'OPEN'} collegeData={collegeData} />
                  <RankTrendChart institute={selectedInstitute} collegeData={collegeData} />
                </div>
              </div>
            )}

            <div className="bg-white/40 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-indigo-100/50 dark:shadow-none border border-white/60 dark:border-slate-700 p-1">
              <ResultsTable
                results={filteredResults}
                onExportCSV={handleExportCSV}
                onExportPDF={handleExportPDF}
                onPrint={handlePrint}
                hasSearched={hasSearched}
                onAddChoice={handleAddChoice}
                onSelectInstitute={setSelectedInstitute}
              />
            </div>
          </div>
        </div>
      </main>

      <button 
        onClick={() => setSidebarOpen(true)}
        className="fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-2xl hover:bg-indigo-700 hover:scale-110 transition-all z-40 flex items-center gap-2 font-semibold"
      >
        <ListPlus />
        {choices.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
            {choices.length}
          </span>
        )}
      </button>

      <CounselingSidebar choices={choices} setChoices={setChoices} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-t border-indigo-100 dark:border-slate-800 py-12 mt-16 shadow-inner">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 text-xl mb-4 font-medium text-gray-800">
              <span>Made with</span>
              <Heart className="w-6 h-6 text-red-500 animate-pulse" />
              <span>by</span>
              <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                TUSHAR BHARDWAJ
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-500 mb-4">
              <Mail className="w-5 h-5" />
              <a href="mailto:redburg035@gmail.com" className="hover:text-indigo-600 transition-colors duration-300">
                redburg035@gmail.com
              </a>
            </div>
          </div>
          <div className="border-t border-gray-200/60 dark:border-slate-800/60 pt-6 text-center space-y-2">
            <p className="text-gray-600 dark:text-gray-400 font-medium">© 2026 UPTAC Full-Stack Platform.</p>
            <p className="text-gray-500 dark:text-gray-500 text-sm max-w-4xl mx-auto leading-relaxed">
              Disclaimer: This tool displays historical data for informational purposes only. Final admissions and cutoffs for 2025 will depend on various factors. Always refer to official UPTAC notifications for the most accurate information.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
