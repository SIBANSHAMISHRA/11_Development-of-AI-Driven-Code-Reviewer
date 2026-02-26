def basic_review(code: str):

    review = {
        "bugs": [],
        "quality": [],
        "suggestions": []
    }

    if "print(" in code:
        review["quality"].append("Remove debug print statements in production code.")

    if len(code.splitlines()) > 100:
        review["suggestions"].append("Consider breaking this into smaller modules.")

    if "==" in code and "if" in code:
        review["suggestions"].append("Ensure proper input validation and type checking.")

    if "except:" in code:
        review["bugs"].append("Avoid using bare except statements.")

    return review
