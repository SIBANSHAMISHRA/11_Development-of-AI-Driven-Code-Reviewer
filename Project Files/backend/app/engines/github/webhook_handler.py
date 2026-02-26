from fastapi import APIRouter, Request
from app.engines.github.pr_analyzer import analyze_pull_request

router = APIRouter(prefix="/webhook", tags=["GitHub"])

@router.post("/github")
async def github_webhook(request: Request):

    payload = await request.json()

    if payload.get("pull_request"):
        diff_url = payload["pull_request"]["diff_url"]
        return analyze_pull_request(diff_url)

    return {"message": "Event ignored"}
