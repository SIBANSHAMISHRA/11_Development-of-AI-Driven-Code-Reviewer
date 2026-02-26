import { useState } from "react";
import { ChevronDown, Check, Code2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

interface LanguageSelectorProps {
    language: string;
    setLanguage: (lang: string) => void;
}

const languages = [
    { id: "python", name: "Python" },
    { id: "javascript", name: "JavaScript" },
    { id: "typescript", name: "TypeScript" },
    { id: "java", name: "Java" },
    { id: "c", name: "C" },
    { id: "cpp", name: "C++" },
];

export function LanguageSelector({ language, setLanguage }: LanguageSelectorProps) {
    const selected = languages.find((l) => l.id === language) || languages[0];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white bg-transparent hover:bg-white/5 border border-transparent hover:border-white/10 rounded-full transition-all outline-none">
                <Code2 size={14} />
                <span>{selected.name}</span>
                <ChevronDown className="h-3 w-3 opacity-50" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-[150px] bg-[#1e1e1e]/90 backdrop-blur-xl border-white/10 text-[#cccccc] p-1 shadow-2xl rounded-xl"
            >
                {languages.map((l) => (
                    <DropdownMenuItem
                        key={l.id}
                        onClick={() => setLanguage(l.id)}
                        className={`flex items-center justify-between px-2 py-2 text-xs rounded-lg cursor-pointer outline-none transition-colors
                            ${language === l.id ? "bg-blue-600/20 text-blue-400" : "hover:bg-white/5 hover:text-white"}
                        `}
                    >
                        {l.name}
                        {language === l.id && <Check className="h-3 w-3" />}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
