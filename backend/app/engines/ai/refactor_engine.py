from app.engines.ai.model_selector import call_model

def generate_refactor_diff(code: str):

    prompt = f"""
Refactor this code to clean architecture standards.

Return ONLY unified diff format.

Code:
{code}
"""

    return call_model("gpt-4o", prompt)
