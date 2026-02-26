import { ReviewRequest, ReviewResponse, ExecuteResponse } from "../types/api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export const reviewCode = async (data: ReviewRequest): Promise<ReviewResponse> => {
    const response = await fetch(`${API_BASE_URL}/review/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to review code");
    }

    return response.json();
};

export const executeCode = async (code: string, language: string = "python"): Promise<ExecuteResponse> => {
    const response = await fetch(`${API_BASE_URL}/terminal/execute`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language }),
    });

    if (!response.ok) {
        throw new Error("Failed to execute code");
    }

    return response.json();
};
