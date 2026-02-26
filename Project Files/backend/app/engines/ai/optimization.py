import re


def optimize_code_suggestions(code: str):

    suggestions = []

    if re.search(r"for\s+\w+\s+in\s+range\(len\(", code):
        suggestions.append("Use enumerate() for cleaner and more efficient iteration.")

    if re.search(r"\blist\(\s*set\(", code):
        suggestions.append("Consider using set comprehension for better performance.")

    if "==" in code and "None" in code:
        suggestions.append("Use 'is None' instead of '== None'.")

    if re.search(r"\btime\.sleep\(", code):
        suggestions.append("Avoid blocking sleep calls in production applications.")

    if "global " in code:
        suggestions.append("Avoid global variables for better maintainability.")

    return suggestions
