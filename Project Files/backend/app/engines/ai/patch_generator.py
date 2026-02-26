from app.engines.ai.model_selector import call_model

def generate_patch(code: str):

    prompt = f"""
Fix all bugs in the following code.

Return output in unified diff format.

Code:
{code}
"""

    return call_model("gpt-4o", prompt)
