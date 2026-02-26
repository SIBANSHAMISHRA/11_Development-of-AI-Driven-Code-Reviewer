import { useState } from "react";
import { CheckCircle, AlertTriangle, XCircle, Activity, Shield, Terminal, MessageSquare } from "lucide-react";
import { ReviewResponse, ExecuteResponse } from "../../types/api";

interface AIAnalysisPanelProps {
  analysis: ReviewResponse | null;
  execution: ExecuteResponse | null;
  loading: boolean;
  activeTab: "review" | "suggestions" | "execution" | "security";
  setActiveTab: (tab: "review" | "suggestions" | "execution" | "security") => void;
}

export function AIAnalysisPanel({ analysis, execution, loading, activeTab, setActiveTab }: AIAnalysisPanelProps) {

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-[#cccccc]">
        <Activity className="animate-spin h-8 w-8 mb-4 text-[#0e639c]" />
        <p>Analyzing code with AI...</p>
      </div>
    );
  }

  if (!analysis && !execution) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-[#666666] p-8 text-center">
        <div className="bg-[#252526] p-4 rounded-full mb-4">
          <Activity className="h-8 w-8 opacity-50" />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-[#cccccc]">Ready to Review</h3>
        <p className="text-sm">Click "Review Code" to generate an AI analysis.</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] text-[#cccccc]">
      {/* TABS */}
      <div className="flex border-b border-[#2b2b2b] bg-[#252526]">
        <TabButton
          active={activeTab === "review"}
          onClick={() => setActiveTab("review")}
          icon={<Activity size={14} />}
          label="AI Review"
        />
        <TabButton
          active={activeTab === "suggestions"}
          onClick={() => setActiveTab("suggestions")}
          icon={<MessageSquare size={14} />}
          label="Suggestions"
        />
        <TabButton
          active={activeTab === "execution"}
          onClick={() => setActiveTab("execution")}
          icon={<Terminal size={14} />}
          label="Execution Output"
        />
        <TabButton
          active={activeTab === "security"}
          onClick={() => setActiveTab("security")}
          icon={<Shield size={14} />}
          label="Security"
        />
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">

        {activeTab === "review" && analysis && (
          <div className="animate-in fade-in duration-300 space-y-8">
            {/* Header Section */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Activity className="text-[#0e639c]" /> AI Code Review
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#0e639c] bg-[#0e639c]/10 px-2 py-0.5 rounded border border-[#0e639c]/20">
                    {analysis.ai_review_parsed.summary?.includes("Java") ? "Java" :
                      analysis.ai_review_parsed.summary?.includes("C++") ? "C++" :
                        analysis.ai_review_parsed.summary?.includes("Python") ? "Python" : "Detected"}
                  </span>
                  <span className="text-xs text-[#888888]">
                    • {new Date().toLocaleTimeString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Dynamic Engine Badge */}
                <div className="px-3 py-1 bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-full text-xs text-blue-200 border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)] flex items-center gap-2">
                  <Activity size={12} className="animate-pulse" />
                  <span>AI Engine Active</span>
                </div>
              </div>
            </div>

            {/* AI Summary Card */}
            <div className="bg-[#252526]/80 backdrop-blur-md p-5 rounded-xl border border-white/5 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#0e639c] to-purple-600"></div>
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full group-hover:bg-blue-500/20 transition-all duration-700"></div>

              <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <MessageSquare size={14} className="text-blue-400" /> Executive Summary
              </h3>

              <p className="text-sm leading-relaxed text-[#d4d4d4] relative z-10">
                {analysis.ai_review_parsed.summary || "Review completed successfully."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Progress Bars */}
              <div className="space-y-6">
                <ProgressBar label="Code Quality" value={analysis.metrics?.code_quality || 0} color="#0e639c" />
                <ProgressBar label="Best Practices" value={analysis.metrics?.best_practices || 0} color="#10b981" />
                <ProgressBar label="Error Handling" value={analysis.metrics?.error_handling || 0} color="#f59e0b" />
                <ProgressBar label="Type Safety" value={analysis.metrics?.type_safety || 0} color="#a855f7" />
              </div>

              {/* Score Cards */}
              <div className="grid grid-cols-2 gap-4">
                <ScoreCard title="Complexity" value={analysis.complexity_score} max={100} color="#f59e0b" />
                <ScoreCard title="AI Confidence" value={analysis.metrics?.ai_confidence || 95} max={100} unit="%" color="#0e639c" />
              </div>
            </div>

            {/* Bugs List */}
            {analysis.ai_review_parsed.bugs && analysis.ai_review_parsed.bugs.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider flex items-center gap-2">
                  <XCircle className="text-red-500" size={16} /> Potential Bugs
                </h3>
                <div className="space-y-2">
                  {analysis.ai_review_parsed.bugs.map((bug: string, i: number) => (
                    <div key={i} className="bg-[#252526] p-3 rounded border-l-2 border-red-500 text-sm">
                      {bug}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {activeTab === "suggestions" && analysis && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h3 className="text-lg font-bold text-white mb-4">Optimization Suggestions</h3>
            {analysis.optimization_suggestions.map((s, i) => (
              <div key={i} className="bg-[#252526] p-4 rounded border border-[#3e3e3e] hover:border-[#0e639c] transition-colors">
                <div className="flex items-start gap-3">
                  <div className="bg-[#0e639c]/20 p-2 rounded text-[#0e639c]">
                    <Activity size={16} />
                  </div>
                  <div>
                    <p className="text-sm text-[#d4d4d4]">{s}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "execution" && (
          <div className="h-full flex flex-col animate-in fade-in duration-300">
            {execution ? (
              <div className="bg-black p-4 rounded font-mono text-sm h-full border border-[#3e3e3e] overflow-auto">
                <div className="text-green-400 mb-2">$ python script.py</div>
                {execution.stdout && <div className="text-white whitespace-pre-wrap">{execution.stdout}</div>}
                {execution.stderr && <div className="text-red-400 whitespace-pre-wrap mt-2">{execution.stderr}</div>}
                <div className="text-[#666666] mt-4 border-t border-[#333333] pt-2">
                  Process exited with code {execution.exit_code}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-[#666666]">
                <Terminal size={48} className="mb-4 opacity-50" />
                <p>Run code to see output here</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "security" && analysis && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h3 className="text-lg font-bold text-white mb-4">Security Analysis</h3>
            {analysis.security_issues.length === 0 ? (
              <div className="bg-[#252526] p-6 rounded border border-green-900/50 flex flex-col items-center text-center">
                <Shield className="text-green-500 mb-2" size={32} />
                <h4 className="text-green-500 font-bold">No Security Issues Found</h4>
                <p className="text-sm text-[#888888] mt-1">Your code passed all security checks.</p>
              </div>
            ) : (
              analysis.security_issues.map((issue: any, i: number) => (
                <div key={i} className="bg-[#3c1f1f] p-4 rounded border border-red-900/50">
                  <h4 className="text-red-400 font-bold text-sm flex items-center gap-2">
                    <AlertTriangle size={14} /> Security Alert
                  </h4>
                  <p className="text-sm text-[#d4d4d4] mt-1">{issue}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 text-xs font-medium border-b-2 transition-colors
                ${active
          ? "border-[#0e639c] text-white bg-[#1e1e1e]"
          : "border-transparent text-[#969696] hover:text-[#cccccc] hover:bg-[#2d2d2d]"
        }`}
    >
      {icon}
      {label}
    </button>
  )
}

function ProgressBar({ label, value, color }: any) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-[#cccccc]">{label}</span>
        <span className="font-bold" style={{ color }}>{value}%</span>
      </div>
      <div className="h-2 bg-[#333333] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

function ScoreCard({ title, value, max, unit = "", color }: any) {
  return (
    <div className="bg-[#252526] p-4 rounded border border-[#3e3e3e] flex flex-col items-center justify-center">
      <span className="text-xs text-[#888888] uppercase tracking-wider mb-2">{title}</span>
      <div className="text-3xl font-bold" style={{ color }}>
        {value}{unit}
      </div>
      {/* Simple radial representation placeholder */}
      <div className="w-full bg-[#333333] h-1 mt-3 rounded-full overflow-hidden">
        <div className="h-full bg-current opacity-50" style={{ width: `${(value / max) * 100}%`, backgroundColor: color }} />
      </div>
    </div>
  )
}
