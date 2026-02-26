import os
import json
from openai import OpenAI
from app.engines.gpt.prompt_builder import build_review_prompt

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def review_code_with_gpt(code: str):
    prompt = build_review_prompt(code)

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a strict professional AI code reviewer."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.2,
        max_tokens=1000
    )

    content = response.choices[0].message.content

    # Try to parse JSON safely
    try:
        return json.loads(content)
    except json.JSONDecodeError:
        return {
            "raw_response": content,
            "warning": "Response not valid JSON"
        }
