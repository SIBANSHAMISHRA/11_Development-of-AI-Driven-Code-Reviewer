from app.engines.gpt.reviewer import review_code_with_gpt
from app.engines.ai.local_reviewer import basic_review


def run_ai_review(code: str):
    """
    Runs GPT-based AI review.
    Falls back to local rule-based review if GPT fails.
    """

    try:
        gpt_result = review_code_with_gpt(code)

        return {
            "source": "gpt",
            "review": gpt_result
        }

    except Exception as e:
        # fallback system
        local_result = basic_review(code)

        return {
            "source": "local_fallback",
            "review": local_result,
            "error": str(e)
        }
