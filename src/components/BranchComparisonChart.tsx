import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

interface ChartProps {
  institute: string;
  round: string;
  category: string;
}

const BranchComparisonChart: React.FC<ChartProps> = ({ institute, round, category }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!institute) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/colleges/compare`, {
          params: { institute, round, category }
        });
        // Group and format for chart
        const formatted = res.data.map((item: any) => ({
          name: item.program.replace('Computer Science and Engineering', 'CSE')
                           .replace('Information Technology', 'IT')
                           .replace('Electronics and Communication Engineering', 'ECE')
                           .substring(0, 15) + (item.program.length > 15 ? '...' : ''),
          closingRank: item.closingRank,
          fullProgram: item.program
        }));
        setData(formatted);
      } catch (err) {
        console.error('Failed to fetch chart data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [institute, round, category]);

  if (!institute) return null;

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white/50 w-full mt-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Branch Comparison: {institute}</h3>
      {loading ? (
        <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-indigo-500" /></div>
      ) : (
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
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
      )}
    </div>
  );
};

export default BranchComparisonChart;
