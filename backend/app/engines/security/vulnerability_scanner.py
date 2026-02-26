import re


def scan_security(code: str):

    issues = []

    rules = [
        {
            "pattern": r"\beval\(",
            "severity": "Critical",
            "category": "Remote Code Execution",
            "message": "Use of eval() detected. This can execute arbitrary code."
        },
        {
            "pattern": r"\bexec\(",
            "severity": "Critical",
            "category": "Remote Code Execution",
            "message": "Use of exec() detected. Avoid dynamic code execution."
        },
        {
            "pattern": r"password\s*=\s*[\"'].*?[\"']",
            "severity": "Critical",
            "category": "Hardcoded Secrets",
            "message": "Hardcoded password detected."
        },
        {
            "pattern": r"api[_-]?key\s*=\s*[\"'].*?[\"']",
            "severity": "Critical",
            "category": "Hardcoded Secrets",
            "message": "Hardcoded API key detected."
        },
        {
            "pattern": r"except\s*:",
            "severity": "High",
            "category": "Error Handling",
            "message": "Bare except detected. Catch specific exceptions."
        },
        {
            "pattern": r"subprocess\.Popen\(",
            "severity": "High",
            "category": "Command Injection",
            "message": "Potential command execution vulnerability."
        },
        {
            "pattern": r"os\.system\(",
            "severity": "High",
            "category": "Command Injection",
            "message": "Use of os.system() detected. This may lead to command injection."
        },
        {
            "pattern": r"pickle\.loads\(",
            "severity": "High",
            "category": "Insecure Deserialization",
            "message": "Untrusted pickle.loads() can lead to code execution."
        },
        {
            "pattern": r"input\(",
            "severity": "Medium",
            "category": "Input Validation",
            "message": "Ensure user input is validated and sanitized."
        }
    ]

    for rule in rules:
        if re.search(rule["pattern"], code):
            issues.append({
                "severity": rule["severity"],
                "category": rule["category"],
                "message": rule["message"]
            })

    return {
        "total_issues": len(issues),
        "critical": sum(1 for i in issues if i["severity"] == "Critical"),
        "high": sum(1 for i in issues if i["severity"] == "High"),
        "medium": sum(1 for i in issues if i["severity"] == "Medium"),
        "issues": issues
    }
