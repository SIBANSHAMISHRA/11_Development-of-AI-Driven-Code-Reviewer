import { Upload, Download, Play, Bug, Search } from "lucide-react";

interface ActionBarProps {
    onReview: () => void;
    onRun: () => void;
    loading: boolean;
    onUpload: () => void;
    onImport: () => void;
}

export function ActionBar({ onReview, onRun, loading, onUpload, onImport }: ActionBarProps) {
    return (
        <div className="flex items-center gap-2 p-2">
            <ActionButton icon={<Upload size={14} />} label="Upload File" secondary onClick={onUpload} />
            <ActionButton icon={<Download size={14} />} label="Import from GitHub" secondary onClick={onImport} />

            <div className="h-4 w-[1px] bg-[#3e3e3e] mx-1" />

            <ActionButton
                icon={<Search size={14} />}
                label={loading ? "Analyzing..." : "Review"}
                onClick={onReview}
                disabled={loading}
            />
            <ActionButton icon={<Bug size={14} />} label="Debug" secondary />
            <ActionButton
                icon={<Play size={14} />}
                label="Run"
                color="#10b981"
                onClick={onRun}
            />
        </div>
    )
}

function ActionButton({ icon, label, onClick, disabled, secondary, color }: any) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300
                ${secondary
                    ? "bg-white/5 text-[#cccccc] hover:bg-white/10 border border-white/5 hover:border-white/20"
                    : "text-white shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(14,99,156,0.5)] transform hover:scale-105 active:scale-95"
                }
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
            style={!secondary ? { backgroundColor: color || "#252526", border: `1px solid ${color ? color + '44' : "#3e3e3e"}` } : {}}
        >
            {icon}
            {label}
        </button>
    )
}
