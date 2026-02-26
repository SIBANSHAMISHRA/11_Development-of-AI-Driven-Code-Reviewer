import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ComplexityMeterProps {
  score?: number; // ✅ made optional
}

export function ComplexityMeter({ score = 0 }: ComplexityMeterProps) { // ✅ default value added
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score },
  ];

  const getColor = (score: number) => {
    if (score >= 80) return '#10b981'; // green
    if (score >= 60) return '#fbbf24'; // yellow
    return '#ef4444'; // red
  };

  const color = getColor(score);

  return (
    <div 
      className="backdrop-blur-xl rounded-2xl border border-cyan-500/10 p-6"
      style={{
        background: 'linear-gradient(135deg, rgba(10, 14, 39, 0.4) 0%, rgba(15, 23, 41, 0.4) 100%)',
        boxShadow: '0 8px 32px rgba(0, 217, 255, 0.1)',
      }}
    >
      <div className="text-center">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Code Complexity
        </h3>
        <div className="relative">
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                stroke="none"
              >
                <Cell fill={color} opacity={0.8} />
                <Cell fill="rgba(255, 255, 255, 0.05)" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div 
                className="text-3xl font-bold"
                style={{ color }}
              >
                {score}
              </div>
              <div className="text-xs text-gray-500">Score</div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-gray-400">Low</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-yellow-400" />
            <span className="text-gray-400">Medium</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-400" />
            <span className="text-gray-400">High</span>
          </div>
        </div>
      </div>
    </div>
  );
}
