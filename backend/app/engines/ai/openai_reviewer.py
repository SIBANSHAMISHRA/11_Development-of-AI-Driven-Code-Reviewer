from openai import OpenAI
from app.config import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY)


def review_code(code: str):

    try:
        prompt = f"""
You are a senior principal software architect.

Perform a professional structured code review.

Return response in JSON format with:
- bugs
- security_issues
- performance_issues
- optimization_suggestions
- best_practices
- overall_rating

Analyze this code:

{code}
"""

        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {"role": "system", "content": "You are an elite software architect."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3
        )

        return response.choices[0].message.content

    except Exception as e:
        print("OPENAI ERROR:", str(e))
        raise Exception(str(e))
