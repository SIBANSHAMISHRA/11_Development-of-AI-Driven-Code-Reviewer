import re


def detect_code_issues(code: str):
    issues = []

    patterns = [
        {
            "pattern": r"\beval\(",
            "type": "Security",
            "severity": "Critical",
            "message": "Use of eval() detected. This can lead to remote code execution."
        },
        {
            "pattern": r"\bexec\(",
            "type": "Security",
            "severity": "Critical",
            "message": "Use of exec() detected. Avoid executing dynamic code."
        },
        {
            "pattern": r"password\s*=\s*[\"'].*?[\"']",
            "type": "Security",
            "severity": "Critical",
            "message": "Hardcoded password detected."
        },
        {
            "pattern": r"api[_-]?key\s*=\s*[\"'].*?[\"']",
            "type": "Security",
            "severity": "Critical",
            "message": "Hardcoded API key detected."
        },
        {
            "pattern": r"for\s+\w+\s+in\s+range\(len\(",
            "type": "Optimization",
            "severity": "Medium",
            "message": "Use enumerate() instead of range(len())."
        },
        {
            "pattern": r"\bprint\(",
            "type": "Code Quality",
            "severity": "Low",
            "message": "Debug print statement found."
        },
        {
            "pattern": r"except\s*:",
            "type": "Code Quality",
            "severity": "High",
            "message": "Bare except detected. Specify exception type."
        }
    ]

    for rule in patterns:
        if re.search(rule["pattern"], code):
            issues.append({
                "type": rule["type"],
                "severity": rule["severity"],
                "message": rule["message"]
            })

    return issues
