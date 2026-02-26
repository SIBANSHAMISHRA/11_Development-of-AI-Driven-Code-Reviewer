def calculate_score(ai_review: dict):

    try:
        rating = ai_review.get("overall_rating", 5)

        if isinstance(rating, str):
            rating = int(rating)

        rating = max(1, min(10, rating))

        return rating * 10  # convert 1-10 scale to 0-100

    except Exception:
        return 50
