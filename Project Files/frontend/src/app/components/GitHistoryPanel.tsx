import { motion } from 'motion/react';
import { GitCommit, User, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Commit {
  hash: string;
  message: string;
  author: string;
  time: string;
  branch: string;
}

export function GitHistoryPanel() {
  const [commits, setCommits] = useState<Commit[]>([]); // ✅ dynamic state

  useEffect(() => {
    fetch("http://127.0.0.1:8000/github/history") // ✅ connect to backend
      .then(res => res.json())
      .then(data => setCommits(data))
      .catch(err => console.error("Failed to fetch commits:", err));
  }, []);

  return (
    <div 
      className="backdrop-blur-xl rounded-2xl border border-cyan-500/10 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(10, 14, 39, 0.4) 0%, rgba(15, 23, 41, 0.4) 100%)',
        boxShadow: '0 8px 32px rgba(0, 217, 255, 0.1)',
      }}
    >
      <div className="px-4 py-3 border-b border-cyan-500/10 flex items-center justify-between">
        <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
          <GitCommit className="w-4 h-4" />
          Recent Commits
        </h3>
        <button className="text-xs text-gray-400 hover:text-cyan-400 transition-colors">
          View All
        </button>
      </div>
      
      <div className="p-3 space-y-2 max-h-96 overflow-y-auto">
        {commits.map((commit, index) => (
          <motion.div
            key={commit.hash}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.01, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
            className="p-3 rounded-lg border border-gray-700/50 hover:border-cyan-500/30 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <code className="text-xs text-cyan-400 font-mono bg-cyan-500/10 px-2 py-0.5 rounded">
                  {commit.hash}
                </code>
                <span className="text-xs text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                  {commit.branch}
                </span>
              </div>
            </div>
            
            <p className="text-xs text-gray-300 mb-2">{commit.message}</p>
            
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{commit.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{commit.time}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
