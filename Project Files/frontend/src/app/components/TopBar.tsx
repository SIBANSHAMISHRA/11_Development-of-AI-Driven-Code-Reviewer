import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  FolderGit2, 
  GitBranch, 
  ChevronDown, 
  Link2, 
  User 
} from 'lucide-react';

export function TopBar() {

  const [branch, setBranch] = useState("main");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/github/branch")
      .then(res => res.json())
      .then(data => {
        if (data.branch) {
          setBranch(data.branch);
        }
      })
      .catch(() => {
        setBranch("main");
      });
  }, []);

  const connectToGit = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/github/connect", {
        method: "POST"
      });
      const data = await res.json();
      alert(data.message || "Connected to Git");
    } catch (err) {
      alert("Failed to connect to Git");
    }
  };

  return (
    <div 
      className="h-16 border-b border-cyan-500/10 flex items-center justify-between px-6 backdrop-blur-xl relative"
      style={{
        background: 'linear-gradient(135deg, rgba(10, 14, 39, 0.95) 0%, rgba(15, 23, 41, 0.95) 100%)',
        boxShadow: '0 4px 24px rgba(0, 217, 255, 0.05)',
      }}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-all group"
          style={{
            boxShadow: '0 0 20px rgba(0, 217, 255, 0.1)',
          }}
        >
          <FolderGit2 className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-gray-300">AI-Platform-V2</span>
          <ChevronDown className="w-3 h-3 text-gray-500 group-hover:text-cyan-400 transition-colors" />
        </motion.button>

        {/* Git Branch Indicator (Dynamic Now) */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-500/20"
          style={{
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.1)',
          }}
        >
          <GitBranch className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-xs text-purple-300">{branch}</span>
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
        </motion.div>

        {/* Connect to Git (Now Connected to Backend) */}
        <motion.button
          onClick={connectToGit}
          whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0, 217, 255, 0.3)' }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 hover:border-cyan-400/60 transition-all"
        >
          <Link2 className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-xs text-cyan-300">Connect to Git</span>
        </motion.button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 hover:border-indigo-500/40 transition-all group"
          style={{
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.1)',
          }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-sm text-indigo-300">GPT-4 Turbo</span>
          </div>
          <ChevronDown className="w-3 h-3 text-gray-500 group-hover:text-indigo-400 transition-colors" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 p-0.5">
            <div className="w-full h-full rounded-full bg-[#0f1729] flex items-center justify-center">
              <User className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div 
            className="absolute inset-0 rounded-full bg-cyan-400/30 blur-lg"
            style={{ zIndex: -1 }}
          />
        </motion.button>
      </div>
    </div>
  );
}
