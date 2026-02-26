import { useState } from "react";
import "../styles/vscode-theme.css";
import { CodeEditor } from "./components/CodeEditor";
import { AIAnalysisPanel } from "./components/AIAnalysisPanel";
import { VSCodeLayout } from "./components/layout/VSCodeLayout";
import { ActionBar } from "./components/ui/ActionBar";
import { LanguageSelector } from "./components/ui/LanguageSelector";
import { reviewCode, executeCode } from "../services/api";
import { ReviewResponse, ExecuteResponse } from "../types/api";
import { Toaster, toast } from "sonner";

export default function App() {

  const [code, setCode] = useState(`def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n-1)

print(factorial(5))`);

  const [analysis, setAnalysis] = useState<ReviewResponse | null>(null);
  const [execution, setExecution] = useState<ExecuteResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState("gpt-4.1-mini");
  const [activeTab, setActiveTab] = useState<"review" | "suggestions" | "execution" | "security">("review");
  const [language, setLanguage] = useState("python");

  const detectLanguage = (filename: string) => {
    if (filename.endsWith(".js") || filename.endsWith(".jsx")) return "javascript";
    if (filename.endsWith(".ts") || filename.endsWith(".tsx")) return "typescript";
    return "python";
  };

  const handleReview = async () => {
    setLoading(true);
    try {
      const data = await reviewCode({ code, model });
      setAnalysis(data);
      setActiveTab("review");
      toast.success("Code review completed!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to review code. Check backend connection.");
    }
    setLoading(false);
  };

  const handleRun = async () => {
    try {
      setLoading(true);
      const res = await executeCode(code, language);
      setExecution(res);
      setActiveTab("execution");
      toast.success(`Executed with ${language}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to execute code.");
    }
    setLoading(false);
  };

  const handleUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".py,.js,.ts,.tsx,.json";
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setCode(e.target.result as string);
            setLanguage(detectLanguage(file.name));
            toast.success(`Loaded ${file.name}`);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleImport = async () => {
    let repoUrl = prompt("Enter GitHub File URL (e.g. https://github.com/user/repo/blob/main/main.py):");

    if (repoUrl) {
      // Convert blob URL to raw URL
      // From: https://github.com/user/repo/blob/main/file.py
      // To:   https://raw.githubusercontent.com/user/repo/main/file.py
      const rawUrl = repoUrl.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/");

      setLoading(true);
      try {
        const res = await fetch(rawUrl);
        if (!res.ok) throw new Error("Failed to fetch file");
        const text = await res.text();
        setCode(text);
        setLanguage(detectLanguage(repoUrl));
        toast.success("Imported from GitHub!");
      } catch (err) {
        toast.error("Failed to import. Ensure repository is public and URL is correct.");
        // Fallback for demo if fetch fails (e.g. CORS)
        console.error(err);
      }
      setLoading(false);
    }
  };

  return (
    <VSCodeLayout model={model} setModel={setModel} onImport={handleImport} language={language} setLanguage={setLanguage}>
      <Toaster position="bottom-right" theme="dark" />
      <div style={{ display: "flex", height: "100%", width: "100%", flexDirection: "column" }}>

        {/* ACTION BAR AREA */}
        <div className="border-b border-[#2b2b2b] bg-[#1e1e1e] p-2">
          <ActionBar
            onReview={handleReview}
            onRun={handleRun}
            loading={loading}
            onUpload={handleUpload}
            onImport={handleImport}
          />
        </div>

        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* LEFT SIDE — EDITOR */}
          <div style={{ width: "60%", height: "100%" }}>
            <CodeEditor
              code={code}
              setCode={setCode}
            />
          </div>

          {/* RIGHT SIDE — AI PANEL */}
          <div style={{ width: "40%", height: "100%", borderLeft: "1px solid rgba(255,255,255,0.05)" }}>
            <AIAnalysisPanel
              analysis={analysis}
              execution={execution}
              loading={loading}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
        </div>

      </div>
    </VSCodeLayout>
  );
}
