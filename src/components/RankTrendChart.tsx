import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

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
  collegeData: CollegeData[];
}

const RankTrendChart: React.FC<ChartProps> = ({ institute, collegeData }) => {
  const chartData = useMemo(() => {
    if (!institute || !collegeData) return [];
    
    const instData = collegeData.filter(c => c.institute === institute && c.category === 'OPEN');
    const rounds = Array.from(new Set(instData.map(c => c.round))).sort();
    
    const programRankings = instData
      .filter(c => c.round === 'Round 1')
      .sort((a, b) => a.closing_rank - b.closing_rank);
      
    const topPrograms = programRankings.slice(0, 3).map(c => c.program);
    
    const dataByRound = rounds.map(r => {
      const row: any = { name: r.replace('Round ', 'R') };
      topPrograms.forEach(prog => {
        const entry = instData.find(c => c.round === r && c.program === prog);
        if (entry) {
          row[prog] = entry.closing_rank;
        }
      });
      return row;
    });
    
    return { data: dataByRound, programs: topPrograms };
  }, [institute, collegeData]);

  if (!institute || !chartData || !chartData.programs || chartData.programs.length === 0) return null;

  const colors = ['#6366f1', '#ec4899', '#10b981'];

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white/50 w-full h-full flex flex-col dark:bg-slate-800 dark:border-slate-700">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Rank Trend Across Rounds (OPEN)</h3>
      <div className="flex-1 w-full min-h-[288px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData.data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="name" />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', backgroundColor: '#1e293b', color: '#f8fafc', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="top" height={36}/>
            {chartData.programs.map((prog, index) => (
              <Line 
                key={prog} 
                type="monotone" 
                dataKey={prog} 
                name={prog.length > 25 ? prog.substring(0, 25) + '...' : prog} 
                stroke={colors[index % colors.length]} 
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RankTrendChart;
