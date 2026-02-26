import { useState } from "react";
import { Files, Search, GitBranch, Terminal, Play, Settings, User } from "lucide-react";
import { ModelSelector } from "../ui/ModelSelector";
import { LanguageSelector } from "../ui/LanguageSelector";
interface VSCodeLayoutProps {
    children: React.ReactNode;
    model: string;
    setModel: (model: string) => void;
    onImport?: () => void;
    language: string;
    setLanguage: (lang: string) => void;
}

export function VSCodeLayout({ children, model, setModel, onImport, language, setLanguage }: VSCodeLayoutProps) {
    const [activeActivity, setActiveActivity] = useState("explorer");

    return (
        <div className="flex h-screen w-full bg-black text-[#cccccc] overflow-hidden select-none font-sans">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full animate-pulse decoration-delay-1000" />
            </div>

            {/* Floating Container */}
            <div className="z-10 flex w-full h-full p-4 gap-4">

                {/* Activity Bar (Floating) */}
                <aside className="w-[60px] flex flex-col items-center py-6 glass-panel rounded-2xl z-20 gap-4">
                    <ActivityItem icon={<Files size={24} />} active={activeActivity === "explorer"} onClick={() => setActiveActivity("explorer")} />
                    <ActivityItem icon={<Search size={24} />} active={activeActivity === "search"} onClick={() => setActiveActivity("search")} />
                    <ActivityItem icon={<GitBranch size={24} />} active={activeActivity === "git"} onClick={() => setActiveActivity("git")} />
                    <div className="flex-1" />
                    <ActivityItem icon={<User size={24} />} active={activeActivity === "account"} onClick={() => setActiveActivity("account")} />
                    <ActivityItem icon={<Settings size={24} />} active={activeActivity === "settings"} onClick={() => setActiveActivity("settings")} />
                </aside>

                {/* Main Content Area (Floating) */}
                <div className="flex-1 flex flex-col glass-panel rounded-2xl overflow-hidden relative shadow-2xl border border-white/5">
                    {/* Top Bar */}
                    <div className="h-[50px] flex items-center justify-between px-6 border-b border-white/5 bg-white/5 backdrop-blur-md">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
                                <span className="text-blue-500 glow-text">CodeMind</span>
                                <span className="text-white/80">AI</span>
                            </div>
                            <div className="h-4 w-[1px] bg-white/10 mx-2" />
                            <div className="flex items-center gap-2 text-xs text-white/50 bg-black/20 px-3 py-1.5 rounded-full border border-white/5">
                                <GitBranch size={12} />
                                <span>main</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <LanguageSelector language={language} setLanguage={setLanguage} />
                            <ModelSelector model={model} setModel={setModel} />
                            <button
                                onClick={onImport}
                                className="bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 border border-blue-500/30 text-xs px-4 py-1.5 rounded-full flex items-center gap-2 transition-all hover:scale-105 active:scale-95">
                                <GitBranch size={14} /> Connect Git
                            </button>
                        </div>
                    </div>

                    {/* Editor Content */}
                    <div className="flex-1 overflow-hidden relative">
                        {children}
                    </div>

                    {/* Status Bar */}
                    <div className="h-[28px] bg-black/40 backdrop-blur-md flex items-center justify-between px-4 text-[10px] text-white/40 select-none border-t border-white/5">
                        <div className="flex items-center gap-4">
                            <span className="hover:text-white transition-colors cursor-pointer">Ready</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="hover:text-white transition-colors cursor-pointer">TypeScript React</span>
                            <span className="hover:text-white transition-colors cursor-pointer">UTF-8</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

function ActivityItem({ icon, active, onClick }: { icon: React.ReactNode; active?: boolean; onClick?: () => void }) {
    return (
        <div
            onClick={onClick}
            className={`w-[40px] h-[40px] flex items-center justify-center cursor-pointer transition-all duration-300 rounded-xl
        ${active ? "bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)] text-white scale-110" : "text-white/40 hover:text-white hover:bg-white/10"}`}
        >
            {icon}
        </div>
    );
}
