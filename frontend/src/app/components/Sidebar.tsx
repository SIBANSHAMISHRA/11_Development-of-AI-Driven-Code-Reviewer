import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Brain, 
  Bot, 
  FileSearch, 
  Play, 
  Sparkles, 
  History, 
  GitBranch, 
  Settings, 
  ChevronLeft 
} from 'lucide-react';

interface SidebarProps {
  onNavigate?: (section: string) => void;
}

const navItems = [
  { icon: Bot, label: 'Agent' },
  { icon: FileSearch, label: 'Code Review' },
  { icon: Play, label: 'Execution' },
  { icon: Sparkles, label: 'AI Insights' },
  { icon: History, label: 'History' },
  { icon: GitBranch, label: 'Git Integration' },
  { icon: Settings, label: 'Settings' },
];

export function Sidebar({ onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <motion.div
      initial={{ width: 280 }}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="h-full bg-gradient-to-b from-[#0a0e27] to-[#0f1729] border-r border-cyan-500/10 relative flex flex-col"
      style={{
        boxShadow: '4px 0 24px rgba(0, 217, 255, 0.05)',
      }}
    >
      {/* Logo */}
      <div className="p-6 flex items-center justify-between border-b border-cyan-500/10">
        {!collapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <Brain className="w-8 h-8 text-cyan-400" strokeWidth={1.5} />
              <div className="absolute inset-0 blur-lg bg-cyan-400/30 rounded-full" />
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              CodeMind AI
            </span>
          </motion.div>
        )}
        {collapsed && (
          <Brain className="w-8 h-8 text-cyan-400 mx-auto" strokeWidth={1.5} />
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeIndex === index;
          
          return (
            <motion.button
              key={item.label}
              onClick={() => {
                setActiveIndex(index);
                if (onNavigate) {
                  onNavigate(item.label);
                }
              }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400'
                  : 'text-gray-400 hover:text-cyan-300 hover:bg-white/5'
              }`}
              style={{
                boxShadow: isActive ? '0 0 20px rgba(0, 217, 255, 0.2)' : 'none',
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl"
                  style={{
                    boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)',
                  }}
                />
              )}
              <Icon className="w-5 h-5 relative z-10" strokeWidth={1.5} />
              {!collapsed && (
                <span className="relative z-10 text-sm">{item.label}</span>
              )}
              {isActive && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 relative z-10" />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Collapse Button */}
      <div className="p-4 border-t border-cyan-500/10">
        <motion.button
          onClick={() => setCollapsed(!collapsed)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-cyan-400 transition-all"
        >
          <motion.div
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.div>
          {!collapsed && <span className="text-xs">Collapse</span>}
        </motion.button>
      </div>
    </motion.div>
  );
}
