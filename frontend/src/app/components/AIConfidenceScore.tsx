import { motion } from 'motion/react';
import { Brain, TrendingUp } from 'lucide-react';

interface Props {
  confidence: number;
}

export function AIConfidenceScore({ confidence }: Props) {

  return (
    <div 
      className="backdrop-blur-xl rounded-2xl border border-cyan-500/10 p-6"
      style={{
        background: 'linear-gradient(135deg, rgba(10, 14, 39, 0.4) 0%, rgba(15, 23, 41, 0.4) 100%)',
        boxShadow: '0 8px 32px rgba(0, 217, 255, 0.1)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
          <Brain className="w-4 h-4 text-purple-400" />
          AI Confidence
        </h3>
        <TrendingUp className="w-4 h-4 text-emerald-400" />
      </div>

      <div className="relative mb-4">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            {confidence}%
          </motion.div>
          <p className="text-xs text-gray-500 mt-1">Analysis Confidence</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-gray-400">
            {confidence >= 80 ? "High Confidence" : confidence >= 60 ? "Medium Confidence" : "Low Confidence"}
          </span>
        </div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-cyan-400"
        />
      </div>
    </div>
  );
}
