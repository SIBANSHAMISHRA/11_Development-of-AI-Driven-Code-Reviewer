from pydantic import BaseModel, EmailStr
from typing import Optional, Any, List, Dict

class UserCreate(BaseModel):
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str


class ReviewRequest(BaseModel):
    code: str
    language: Optional[str] = None
    model: Optional[str] = "gpt-4.1-mini"


class ReviewResponse(BaseModel):
    ai_review: Any
    static_issues: List[Dict]
    complexity_analysis: Any
    security_issues: Any
    optimization_suggestions: List[str]
    score: int
