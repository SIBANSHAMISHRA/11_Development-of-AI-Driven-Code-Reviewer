def build_review_prompt(code: str):
    return f"""
You are a senior software engineer performing a professional enterprise-level code review.

Analyze the provided code and respond strictly in JSON format with this structure:

{{
  "code_quality": [list of issues],
  "security_vulnerabilities": [list of issues],
  "performance_improvements": [list of suggestions],
  "best_practices": [list of suggestions],
  "overall_rating": "1-10",
  "summary": "Short professional summary"
}}

Guidelines:
- Be precise.
- Do not hallucinate.
- If no issues found, return empty list.
- Keep output strictly JSON.

Code:
-----------------
{code}
-----------------
"""
