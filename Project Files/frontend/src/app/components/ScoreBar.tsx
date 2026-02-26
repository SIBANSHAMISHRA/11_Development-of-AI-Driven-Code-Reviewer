import { motion } from 'motion/react';

interface ScoreBarProps {
  label: string;
  score: number;
  color: 'green' | 'yellow' | 'red' | 'cyan' | 'purple';
}

const colorMap = {
  green: {
    bg: 'from-emerald-500/20 to-green-500/20',
    bar: 'from-emerald-400 to-green-500',
    text: 'text-emerald-400',
    glow: 'rgba(16, 185, 129, 0.3)',
  },
  yellow: {
    bg: 'from-yellow-500/20 to-amber-500/20',
    bar: 'from-yellow-400 to-amber-500',
    text: 'text-yellow-400',
    glow: 'rgba(251, 191, 36, 0.3)',
  },
  red: {
    bg: 'from-red-500/20 to-rose-500/20',
    bar: 'from-red-400 to-rose-500',
    text: 'text-red-400',
    glow: 'rgba(239, 68, 68, 0.3)',
  },
  cyan: {
    bg: 'from-cyan-500/20 to-blue-500/20',
    bar: 'from-cyan-400 to-blue-500',
    text: 'text-cyan-400',
    glow: 'rgba(0, 217, 255, 0.3)',
  },
  purple: {
    bg: 'from-purple-500/20 to-fuchsia-500/20',
    bar: 'from-purple-400 to-fuchsia-500',
    text: 'text-purple-400',
    glow: 'rgba(168, 85, 247, 0.3)',
  },
};

export function ScoreBar({ label, score, color }: ScoreBarProps) {
  const colors = colorMap[color];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">{label}</span>
        <span className={`text-sm font-semibold ${colors.text}`}>{score}%</span>
      </div>
      <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${colors.bar} rounded-full`}
          style={{
            boxShadow: `0 0 20px ${colors.glow}`,
          }}
        />
      </div>
    </div>
  );
}
