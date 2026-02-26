import { motion } from 'motion/react';

interface Props {
  loading: boolean;
}

export function AILoadingIndicator({ loading }: Props) {

  if (!loading) return null;

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-2 h-2 rounded-full bg-cyan-400"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.2,
            }}
            style={{
              boxShadow: '0 0 10px rgba(0, 217, 255, 0.5)',
            }}
          />
        ))}
      </div>
      <span className="text-xs text-cyan-400">AI Analyzing...</span>
    </div>
  );
}
