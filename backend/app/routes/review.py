from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas import ReviewRequest
from app.database import get_db
from app.models import ReviewHistory
import json

# Engines
from app.engines.ai.ai_provider import run_ai_review
from app.engines.ai.detection import detect_code_issues
from app.engines.ai.explainer import explain_issues
from app.engines.ast.analyzer import analyze_complexity
from app.engines.security.vulnerability_scanner import scan_security
from app.engines.ai.optimization import optimize_code_suggestions

# Services
from app.services.scoring_service import calculate_score

router = APIRouter(prefix="/review", tags=["Review"])


@router.post("/")
def review_code(request: ReviewRequest, db: Session = Depends(get_db)):

    try:
        code = request.code

        if not code or not code.strip():
            raise HTTPException(status_code=400, detail="Code cannot be empty")

        # 1️⃣ Static Detection
        static_issues = detect_code_issues(code)

        # 2️⃣ Explanation Layer
        explanations = explain_issues(static_issues)

        # 3️⃣ GPT / AI Review (RAW STRING)
        ai_review_raw = run_ai_review(code, model=request.model)

        # 🔥 PARSE GPT RESPONSE SAFELY
        try:
            ai_review = json.loads(ai_review_raw)
        except Exception:
            # Fallback to local reviewer if JSON parsing fails or if ai_review_raw was an error message
            from app.engines.ai.local_reviewer import basic_review
            ai_review = basic_review(code)

        # 4️⃣ AST Analysis
        complexity = analyze_complexity(code)
        complexity_score = complexity.get("score", 50)

        # 5️⃣ Security Scan (Custom Scanner)
        security = scan_security(code)

        # 6️⃣ Optimization Suggestions (Local)
        optimization = optimize_code_suggestions(code)
        
        # 🚨 MERGE FALLBACK DATA IF SCANNERS FAIL
        if not optimization and isinstance(ai_review, dict):
            optimization = ai_review.get("optimization_suggestions", [])

        # 7️⃣ Score Calculation
        score = calculate_score(ai_review_raw)

        # 8️⃣ Save To Database
        history = ReviewHistory(
            code=code,
            result=str(ai_review),
            score=score
        )

        db.add(history)
        db.commit()

        # ✅ FINAL RESPONSE FOR FRONTEND
        # Get security issues from scanner OR fallback
        security_issues = security.get("issues", [])
        if not security_issues and isinstance(ai_review, dict):
             security_issues = ai_review.get("security_issues", [])

        return {
            "ai_review_parsed": ai_review,
            "static_issues": static_issues,
            "explanations": explanations,
            "complexity_analysis": complexity,
            "complexity_score": complexity_score,
            "security_issues": security_issues,
            "optimization_suggestions": optimization,
            "score": score,
            # 📊 NEW METRICS FOR DASHBOARD
            "metrics": {
                "code_quality": score,
                "best_practices": max(0, 100 - (len(ai_review.get("best_practices", [])) * 5)),
                "error_handling": max(0, 100 - (len(ai_review.get("bugs", [])) * 10)),
                "type_safety": 95 if "type" not in str(static_issues) else 70, # Simple heuristic
                "ai_confidence": 94 # Mock confidence for now
            }
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


# ✅ Summary endpoint for dashboard metrics
@router.get("/summary")
def get_review_summary(db: Session = Depends(get_db)):

    latest_review = db.query(ReviewHistory).order_by(ReviewHistory.id.desc()).first()

    if not latest_review:
        return {
            "complexity_score": 0,
            "score": 0
        }

    return {
        "complexity_score": latest_review.score,
        "score": latest_review.score
    }
