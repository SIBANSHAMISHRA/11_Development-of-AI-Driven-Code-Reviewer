import requests
from app.engines.ai.pr_comment_generator import generate_pr_comment

def analyze_pull_request(diff_url: str):

    diff = requests.get(diff_url).text
    review_comment = generate_pr_comment(diff)

    return {
        "pr_review": review_comment
    }
