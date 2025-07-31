import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import UnifiedBanner from './components/UnifiedBanner';
import FilterSection from './components/FilterSection';
import ResultsTable from './components/ResultsTable';
import { exportToCSV, printResults } from './utils/csvExport';
import { AlertCircle, Loader2, Heart, Mail } from 'lucide-react';

interface CollegeData {
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

  // Load data on component mount
  useEffect(() => {
    loadCollegeData();
  }, []);

  const loadCollegeData = async () => {
    try {
      setDataLoading(true);
      setError(null);
      
      const response = await fetch('/uptac_orcr_full.json');
      if (!response.ok) {
        throw new Error('Failed to load college data');
      }

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
      setFilteredResults(mappedData.sort((a, b) => a.institute.localeCompare(b.institute))); // Initially show all, sorted
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
      // Simulate API call delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filtered = collegeData.filter(college => {
        const instituteMatch = !institute || college.institute === institute;
        const programMatch = !program || college.program === program;
        const categoryMatch = !category || college.category === category;
        const roundMatch = !round || college.round === round;
        const quotaMatch = !quota || college.quota === quota;
        
        return instituteMatch && programMatch && categoryMatch && roundMatch && quotaMatch;
      });

      // Sort by institute, then program
      filtered.sort((a, b) => {
        if (a.institute < b.institute) return -1;
        if (a.institute > b.institute) return 1;
        if (a.program < b.program) return -1;
        if (a.program > b.program) return 1;
        return a.closing_rank - b.closing_rank;
      });

      setFilteredResults(filtered);
    } catch (err) {
      setError('An error occurred while filtering data. Please try again.');
      console.error('Error filtering data:', err);
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
    setFilteredResults(collegeData.sort((a, b) => a.institute.localeCompare(b.institute)));
    setHasSearched(false);
    setError(null);
  };

  const handleExportCSV = () => {
    exportToCSV(filteredResults, `uptac_cutoff_data.csv`);
  };

  const handlePrint = () => {
    printResults();
  };

  if (dataLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-lg text-gray-600 font-medium">Loading UPTAC Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <UnifiedBanner />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

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
          onSearch={handleSearch}
          onReset={handleReset}
          loading={loading}
          collegeData={collegeData}
        />

        <ResultsTable
          results={filteredResults}
          onExportCSV={handleExportCSV}
          onPrint={handlePrint}
          hasSearched={hasSearched}
        />
      </main>

      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 text-xl mb-4">
              <span>Made with</span>
              <Heart className="w-6 h-6 text-red-500 animate-pulse" />
              <span>by</span>
              <span className="font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                TUSHAR BHARDWAJ
              </span>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-gray-300 mb-4">
              <Mail className="w-5 h-5" />
              <a 
                href="mailto:redburg035@gmail.com"
                className="hover:text-blue-400 transition-colors duration-300 text-lg"
              >
                redburg035@gmail.com
              </a>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <div className="text-center space-y-3">
              <p className="text-gray-300 text-lg">
                © 2025 UPTAC B.Tech. Cutoffs.
              </p>
              <p className="text-gray-400 max-w-4xl mx-auto leading-relaxed">
                Disclaimer: This tool displays historical data for informational purposes only. Final admissions and cutoffs for 2025 will depend on various factors. Always refer to official UPTAC notifications for the most accurate information.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
