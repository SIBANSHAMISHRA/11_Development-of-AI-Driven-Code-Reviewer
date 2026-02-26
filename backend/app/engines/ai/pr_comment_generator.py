from app.engines.ai.model_selector import call_model

def generate_pr_comment(diff: str):

    prompt = f"""
Analyze this Pull Request diff and generate a professional PR review comment:

Include:
- Summary
- Issues found
- Improvement suggestions
- Security risks
- Final approval decision

Diff:
{diff}
"""

    return call_model("gpt-4o-mini", prompt)
