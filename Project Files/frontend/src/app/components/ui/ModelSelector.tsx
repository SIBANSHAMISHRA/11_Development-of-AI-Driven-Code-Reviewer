import { useState, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

interface ModelSelectorProps {
    model: string;
    setModel: (model: string) => void;
}

const models = [
    { id: "gpt-4.1-mini", name: "GPT-4o Mini" },
    { id: "claude-3-opus", name: "Claude 3 Opus" },
    { id: "gemini-pro", name: "Gemini Pro 1.5" },
    { id: "local-mistral", name: "Local Mistral (7B)" },
];

export function ModelSelector({ model, setModel }: ModelSelectorProps) {
    const selectedModel = models.find((m) => m.id === model) || models[0];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white/80 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full transition-all outline-none backdrop-blur-md">
                <span>{selectedModel.name}</span>
                <ChevronDown className="h-3 w-3 opacity-50" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-[200px] bg-[#1e1e1e]/90 backdrop-blur-xl border-white/10 text-[#cccccc] p-1 shadow-2xl rounded-xl"
            >
                {models.map((m) => (
                    <DropdownMenuItem
                        key={m.id}
                        onClick={() => setModel(m.id)}
                        className={`flex items-center justify-between px-2 py-2 text-xs rounded-lg cursor-pointer outline-none transition-colors
                            ${model === m.id ? "bg-blue-600/20 text-blue-400" : "hover:bg-white/5 hover:text-white"}
                        `}
                    >
                        {m.name}
                        {model === m.id && <Check className="h-3 w-3" />}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
