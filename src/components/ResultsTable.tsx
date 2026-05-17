import React from 'react';
import {
  Download, GraduationCap, MapPin, Users, Trophy, Building2, BookOpen
} from 'lucide-react';

interface CollegeData {
  institute: string;
  program: string;
  quota: string;
  category: string;
  round: string;
  opening_rank: number;
  closing_rank: number;
}

interface ResultsTableProps {
  results: CollegeData[];
  onExportCSV: () => void;
  onExportPDF: () => void;
  onPrint: () => void;
  onAddChoice: (college: CollegeData) => void;
  onSelectInstitute: (institute: string) => void;
  hasSearched: boolean;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results, onExportCSV, onExportPDF, onAddChoice, onSelectInstitute }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 50;

  React.useEffect(() => {
    setCurrentPage(1);
  }, [results]);

  const totalPages = Math.ceil(results.length / itemsPerPage);
  const currentData = results.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  if (results.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-12 text-center border border-gray-100 dark:border-slate-700">
        <div className="w-24 h-24 bg-gray-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <GraduationCap className="w-12 h-12 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-300 mb-4">No Results Found</h3>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
          Try adjusting your filters or rank to discover more options.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden relative">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-8 border-b border-gray-200/50 dark:border-slate-700/50 bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4 lg:mb-0">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-xl">
            <Trophy className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Eligible Colleges</h2>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              {results.length} colleges match your criteria
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onExportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
          >
            <Download className="w-4 h-4" />
            CSV
          </button>
          <button
            onClick={onExportPDF}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 text-sm"
          >
            <Download className="w-4 h-4" />
            PDF
          </button>
        </div>
      </div>

      <div className="overflow-x-auto relative">
        <table className="w-full relative z-10">
          <thead className="bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-300 uppercase">Rank</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-300 uppercase">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Institute
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-300 uppercase">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Program
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-300 uppercase">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Quota
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-300 uppercase">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Category
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-300 uppercase">
                Round
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-300 uppercase">Opening Rank</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-300 uppercase">Closing Rank</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-300 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-900 divide-y divide-gray-200 dark:divide-slate-800">
            {currentData.map((college, index) => (
              <React.Fragment key={index}>
                <tr
                  className={`hover:bg-gray-50 dark:hover:bg-slate-800/80 transition-colors duration-200 ${
                    index % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-gray-50/50 dark:bg-slate-800/40'
                  }`}
                >
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-lg font-bold text-sm">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-900 dark:text-gray-100">
                    <div className="font-semibold max-w-xs" title={college.institute}>
                      {college.institute.length > 50
                        ? `${college.institute.substring(0, 50)}...`
                        : college.institute}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-900 dark:text-gray-100">
                    <div className="font-medium max-w-xs" title={college.program}>
                      {college.program.length > 40
                        ? `${college.program.substring(0, 40)}...`
                        : college.program}
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                        college.quota === 'Home State'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-green-100 text-green-800 border border-green-200'
                      }`}
                    >
                      {college.quota}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                        college.category === 'OPEN'
                          ? 'bg-purple-100 text-purple-800 border border-purple-200'
                          : 'bg-orange-100 text-orange-800 border border-orange-200'
                      }`}
                    >
                      {college.category}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">
                      {college.round}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-gray-100">
                    {college.opening_rank.toLocaleString()}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-indigo-600 dark:text-indigo-400">
                    {college.closing_rank.toLocaleString()}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <button onClick={() => onAddChoice(college)} className="text-white bg-indigo-500 hover:bg-indigo-600 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-colors">
                        Add to List
                      </button>
                      <button onClick={() => onSelectInstitute(college.institute)} className="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-colors">
                        Compare
                      </button>
                    </div>
                  </td>
                </tr>

                {/* ✅ Watermark row every 10 rows */}
                {(index + 1) % 10 === 0 && (
                  <tr>
                    <td colSpan={9}>
                      <div className="text-center py-6 text-gray-300 dark:text-slate-700 text-xl italic rotate-[-2deg]">
                        Made by Tushar Bhardwaj
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 dark:bg-slate-800 px-8 py-4 border-t border-gray-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, results.length)} to {Math.min(currentPage * itemsPerPage, results.length)} of {results.length} eligible colleges
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1 || results.length === 0}
            className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || results.length === 0}
            className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsTable;