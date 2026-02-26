import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def call_model(model_name: str, prompt: str):

    response = client.chat.completions.create(
        model=model_name,
        messages=[
            {"role": "system", "content": "You are an elite senior software architect."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.2
    )

    return response.choices[0].message.content


def select_model(code_length: int):

    if code_length < 1000:
        return "gpt-4o-mini"

    return "gpt-4o"
