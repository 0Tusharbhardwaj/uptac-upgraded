import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

interface CollegeData {
  institute: string;
  program: string;
  quota: string;
  category: string;
  round: string;
  opening_rank: number;
  closing_rank: number;
}

interface ChartProps {
  institute: string;
  round: string;
  category: string;
  collegeData: CollegeData[];
}

const BranchComparisonChart: React.FC<ChartProps> = ({ institute, round, category, collegeData }) => {
  const chartData = useMemo(() => {
    if (!institute || !collegeData) return [];
    
    const instData = collegeData.filter(c => 
      c.institute === institute && 
      c.round === (round || 'Round 1') && 
      c.category === (category || 'OPEN')
    );

    const formatted = instData.map(item => ({
      name: item.program.replace('Computer Science and Engineering', 'CSE')
                       .replace('Information Technology', 'IT')
                       .replace('Electronics and Communication Engineering', 'ECE')
                       .substring(0, 15) + (item.program.length > 15 ? '...' : ''),
      closingRank: item.closing_rank,
      fullProgram: item.program
    }));
    return formatted.sort((a, b) => a.closingRank - b.closingRank);
  }, [institute, round, category, collegeData]);

  if (!institute || chartData.length === 0) return null;

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white/50 w-full h-full flex flex-col dark:bg-slate-800 dark:border-slate-700">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Branch Comparison: {institute}</h3>
      <div className="flex-1 w-full min-h-[288px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              labelFormatter={(_, payload: any) => payload[0]?.payload.fullProgram}
            />
            <Legend verticalAlign="top" height={36}/>
            <Bar dataKey="closingRank" name="Closing Rank" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BranchComparisonChart;
