export interface ReviewRequest {
    code: str;
    language?: str;
    model?: str;
}

export interface ReviewResponse {
    ai_review_parsed: any;
    static_issues: any[];
    explanations: any;
    complexity_analysis: any;
    complexity_score: number;
    security_issues: any[];
    optimization_suggestions: string[];
    score: number;
    metrics: {
        code_quality: number;
        best_practices: number;
        error_handling: number;
        type_safety: number;
        ai_confidence: number;
    };
}

export interface ExecuteResponse {
    stdout: string;
    stderr: string;
    exit_code: number;
}
