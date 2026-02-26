from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.github_service import fetch_repo_files

router = APIRouter(prefix="/github", tags=["GitHub"])


class RepoRequest(BaseModel):
    repo_url: str


# ✅ Connect to GitHub (Frontend button uses this)
@router.post("/connect")
def connect_github():
    return {
        "message": "GitHub Connected Successfully"
    }


# ✅ Return current branch (TopBar fetches this)
@router.get("/branch")
def get_branch():
    # You can later make this dynamic
    return {
        "branch": "main"
    }
# ✅ Needed for GitHistoryPanel
@router.get("/history")
def get_history():
    return [
        {
            "hash": "a3f2c1d",
            "message": "feat: Add AI-powered code suggestions",
            "author": "Sibansha",
            "time": "2 hours ago",
            "branch": "main",
        }
    ]



# ✅ Import Repository (Already present — kept intact)
@router.post("/import")
def import_repo(request: RepoRequest):
    result = fetch_repo_files(request.repo_url)

    if isinstance(result, dict) and "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])

    return {
        "message": "Repository fetched successfully",
        "files": result
    }
