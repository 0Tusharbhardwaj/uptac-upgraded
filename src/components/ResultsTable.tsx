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
  onPrint: () => void;
  onAddChoice: (college: CollegeData) => void;
  onSelectInstitute: (institute: string) => void;
  hasSearched: boolean;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results, onExportCSV, onAddChoice, onSelectInstitute }) => {
  if (results.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
        <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <GraduationCap className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-600 mb-4">No Results Found</h3>
        <p className="text-gray-500 text-lg max-w-md mx-auto leading-relaxed">
          Try adjusting your filters or rank to discover more options.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden relative">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-8 border-b border-gray-200/50 bg-white/30 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4 lg:mb-0">
          <div className="p-3 bg-indigo-100 rounded-xl">
            <Trophy className="w-8 h-8 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Eligible Colleges</h2>
            <p className="text-gray-600 font-medium">
              {results.length} colleges match your criteria
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onExportCSV}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Download className="w-5 h-5" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto relative">
        <table className="w-full relative z-10">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Rank</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Institute
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Program
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Quota
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Category
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">
                Round
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Opening Rank</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Closing Rank</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {results.map((college, index) => (
              <React.Fragment key={index}>
                <tr
                  className={`hover:bg-gray-50 transition-colors duration-200 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                  }`}
                >
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg font-bold text-sm">
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-900">
                    <div className="font-semibold max-w-xs" title={college.institute}>
                      {college.institute.length > 50
                        ? `${college.institute.substring(0, 50)}...`
                        : college.institute}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-900">
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
                  <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-gray-900">
                    {college.opening_rank.toLocaleString()}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-indigo-600">
                    {college.closing_rank.toLocaleString()}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <button onClick={() => onAddChoice(college)} className="text-white bg-indigo-500 hover:bg-indigo-600 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-colors">
                        Add to List
                      </button>
                      <button onClick={() => onSelectInstitute(college.institute)} className="text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-colors">
                        Compare
                      </button>
                    </div>
                  </td>
                </tr>

                {/* ✅ Watermark row every 10 rows */}
                {(index + 1) % 10 === 0 && (
                  <tr>
                    <td colSpan={9}>
                      <div className="text-center py-6 text-gray-300 text-xl italic rotate-[-2deg]">
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

      <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 text-center">
          Showing {results.length} eligible colleges sorted by closing rank (ascending)
        </p>
      </div>
    </div>
  );
};

export default ResultsTable;