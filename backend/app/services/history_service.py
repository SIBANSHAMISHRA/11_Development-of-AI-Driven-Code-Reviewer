from sqlalchemy.orm import Session
from app.models import ReviewHistory


def get_history(db: Session, limit: int = 20):

    reviews = (
        db.query(ReviewHistory)
        .order_by(ReviewHistory.id.desc())
        .limit(limit)
        .all()
    )

    return [
        {
            "id": review.id,
            "code": review.code,
            "result": review.result
        }
        for review in reviews
    ]
