import { useState } from "react";
import { reviewCode } from "../../services/api";

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
}

export function CodeEditor({ code, setCode }: CodeEditorProps) {



  return (

    <div className="h-full flex flex-col bg-transparent">

      <textarea

        value={code}

        onChange={(e) => setCode(e.target.value)}

        placeholder="Write your code here..."

        className="flex-1 w-full bg-transparent text-[#d4d4d4] p-4 resize-none outline-none font-mono text-sm leading-relaxed"

        spellCheck={false}

      />



    </div>

  );

}
