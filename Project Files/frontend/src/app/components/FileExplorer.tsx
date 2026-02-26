import { motion } from 'motion/react';
import { ChevronRight, File, Folder } from 'lucide-react';
import { useState, useEffect } from 'react';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
}

interface FileTreeItemProps {
  node: FileNode;
  level: number;
}

function FileTreeItem({ node, level }: FileTreeItemProps) {
  const [isOpen, setIsOpen] = useState(level === 0);
  const isFolder = node.type === 'folder';

  return (
    <div>
      <motion.div
        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
        onClick={() => isFolder && setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 cursor-pointer rounded-md transition-colors group"
        style={{ paddingLeft: `${level * 16 + 12}px` }}
      >
        {isFolder ? (
          <>
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="w-3 h-3 text-gray-500" />
            </motion.div>
            <Folder className="w-4 h-4 text-cyan-400" />
          </>
        ) : (
          <>
            <div className="w-3 h-3" />
            <File className="w-4 h-4 text-gray-400" />
          </>
        )}
        <span className="text-xs text-gray-300 group-hover:text-white transition-colors">
          {node.name}
        </span>
      </motion.div>

      {isFolder && isOpen && node.children && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          {node.children.map((child, index) => (
            <FileTreeItem key={index} node={child} level={level + 1} />
          ))}
        </motion.div>
      )}
    </div>
  );
}

export function FileExplorer() {
  const [fileTree, setFileTree] = useState<FileNode[]>([]); // ✅ dynamic state

  useEffect(() => {
    fetch("http://127.0.0.1:8000/files") // ✅ connect to backend
      .then(res => res.json())
      .then(data => setFileTree(data))
      .catch(err => console.error("Failed to fetch files:", err));
  }, []);

  return (
    <div 
      className="h-full backdrop-blur-xl rounded-2xl border border-cyan-500/10 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(10, 14, 39, 0.4) 0%, rgba(15, 23, 41, 0.4) 100%)',
        boxShadow: '0 8px 32px rgba(0, 217, 255, 0.1)',
      }}
    >
      <div className="px-4 py-3 border-b border-cyan-500/10">
        <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
          Explorer
        </h3>
      </div>
      <div className="p-2 overflow-y-auto" style={{ maxHeight: 'calc(100% - 48px)' }}>
        {fileTree.map((node, index) => (
          <FileTreeItem key={index} node={node} level={0} />
        ))}
      </div>
    </div>
  );
}
