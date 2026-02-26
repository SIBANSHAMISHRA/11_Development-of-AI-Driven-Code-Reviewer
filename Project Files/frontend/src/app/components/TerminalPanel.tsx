import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, X, Minimize2, Maximize2 } from 'lucide-react';

export function TerminalPanel() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/terminal/logs")
      .then(res => res.json())
      .then(data => {
        if (data.logs) {
          setLogs(data.logs);
        }
      })
      .catch(() => {
        setLogs(["⚠ Unable to connect to backend terminal"]);
      });
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 300, opacity: 0 }}
        className={`backdrop-blur-xl rounded-t-2xl border border-cyan-500/10 overflow-hidden transition-all ${
          isMinimized ? 'h-12' : 'h-64'
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(10, 14, 39, 0.95) 0%, rgba(15, 23, 41, 0.95) 100%)',
          boxShadow: '0 -4px 24px rgba(0, 217, 255, 0.1)',
        }}
      >
        {/* Header */}
        <div className="h-12 px-4 flex items-center justify-between border-b border-cyan-500/10 bg-black/20">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">
              Terminal
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 rounded hover:bg-white/10 transition-colors"
            >
              {isMinimized ? (
                <Maximize2 className="w-3.5 h-3.5 text-gray-400 hover:text-white" />
              ) : (
                <Minimize2 className="w-3.5 h-3.5 text-gray-400 hover:text-white" />
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsVisible(false)}
              className="p-1 rounded hover:bg-white/10 transition-colors"
            >
              <X className="w-3.5 h-3.5 text-gray-400 hover:text-red-400" />
            </motion.button>
          </div>
        </div>

        {/* Terminal Content */}
        {!isMinimized && (
          <div className="p-4 h-52 overflow-y-auto font-mono text-xs">
            <div className="space-y-1">
              {logs.map((log, index) => (
                <div key={index} className="text-gray-300">
                  {log}
                </div>
              ))}
              <div className="mt-4 flex items-center">
                <span className="text-purple-400">codedev@ai</span>
                <span className="text-gray-500">:</span>
                <span className="text-cyan-400">~/project</span>
                <span className="text-gray-500 ml-1">$</span>
                <span className="ml-2 text-white animate-pulse">_</span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
