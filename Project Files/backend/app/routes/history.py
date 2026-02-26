from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import ReviewHistory

router = APIRouter(prefix="/history", tags=["History"])


@router.get("/")
def get_review_history(
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):
    try:
        reviews = (
            db.query(ReviewHistory)
            .order_by(ReviewHistory.id.desc())
            .limit(limit)
            .all()
        )

        if not reviews:
            return {"message": "No review history found", "data": []}

        result = []

        for review in reviews:
            result.append({
                "id": review.id,
                "code": review.code,
                "result": review.result
            })

        return {
            "total": len(result),
            "data": result
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
