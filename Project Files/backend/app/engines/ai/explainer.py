def explain_issues(issues):

    explanations = []

    for issue in issues:
        recommendation = generate_recommendation(issue)

        explanation = {
            "type": issue["type"],
            "severity": issue["severity"],
            "description": issue["message"],
            "recommendation": recommendation
        }

        explanations.append(explanation)

    return explanations


def generate_recommendation(issue):

    if issue["type"] == "Security":
        return "Refactor this code immediately. Avoid hardcoding secrets and executing dynamic code."

    if issue["type"] == "Optimization":
        return "Rewrite logic using more Pythonic and efficient patterns."

    if issue["type"] == "Code Quality":
        return "Improve maintainability and follow clean code principles."

    return "Review and refactor this section."
