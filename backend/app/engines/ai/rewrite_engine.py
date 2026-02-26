from app.engines.ai.model_selector import call_model, select_model


def rewrite_code(code: str):

    prompt = f"""
Rewrite the following code to:

- Improve readability
- Follow best practices
- Remove code smells
- Improve performance
- Improve security

Return ONLY the rewritten code.

Code:
{code}
"""

    model = select_model(len(code))
    return call_model(model, prompt)
