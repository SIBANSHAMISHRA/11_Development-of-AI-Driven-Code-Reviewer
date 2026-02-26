import re

def basic_review(code: str):
    issues = {
        "bugs": [],
        "security_issues": [],
        "performance_issues": [],
        "optimization_suggestions": [],
        "best_practices": [],
        "overall_rating": "8",
        "summary": "Basic analysis complete. (Local Mode)"
    }

    def add(category, message):
        if message not in issues[category]:
            issues[category].append(message)

    # DETECT LANGUAGE (SIMPLE HEURISTIC)
    language = "Unknown"
    if "def " in code or "import " in code: language = "Python"
    elif "function" in code or "const " in code or "let " in code or "console.log" in code: language = "JavaScript/TypeScript"
    elif "public class" in code or "System.out.println" in code: language = "Java"
    elif "#include" in code or "int main" in code or "printf" in code: language = "C/C++"
    else: language = "Python" # Default fallback

    # --- PYTHON CHECKS ---
    if language == "Python":
        if "def " in code and ":" not in code: add("bugs", "Syntax Error: Function definition missing colon ':'")
        if "eval(" in code: add("security_issues", "CRITICAL: Avoid use of eval() due to RCE risks.")
        if "print(" in code: add("best_practices", "Remove debug print statements in production.")
        if not issues["optimization_suggestions"]:
             add("optimization_suggestions", "Use list comprehensions for cleaner loops.")
             add("optimization_suggestions", "Consider using generators for large data sets.")

    # --- JS/TS CHECKS ---
    if language == "JavaScript/TypeScript":
        if "console.log" in code: add("best_practices", "Remove console.log statements.")
        if "var " in code: add("best_practices", "Use 'let' or 'const' instead of 'var'.")
        if "eval(" in code: add("security_issues", "Avoid eval() in JavaScript.")
        if "any" in code and ("interface" in code or "type" in code): add("best_practices", "Avoid using 'any' type in TypeScript; be more specific.")
        if not issues["optimization_suggestions"]:
             add("optimization_suggestions", "Use 'const' for variables that don't change.")
             add("optimization_suggestions", "Use arrow functions for concise callbacks.")

    # --- JAVA CHECKS ---
    if language == "Java":
        if "System.out.println" in code: add("best_practices", "Use a logger instead of System.out.println.")
        if "catch (Exception e)" in code: add("best_practices", "Avoid catching generic Exception. Catch specific exceptions.")
        if "==" in code and "String" in code: add("bugs", "Strings comparison using '==' checks reference. Use .equals().")
        if not issues["optimization_suggestions"]:
             add("optimization_suggestions", "Use StringBuilder for string concatenation in loops.")
             add("optimization_suggestions", "Use primitive types (int, double) over wrappers (Integer, Double) where possible.")

    # --- C/C++ CHECKS ---
    if language == "C/C++":
        if "gets(" in code: add("security_issues", "CRITICAL: 'gets' is unsafe/deprecated. Use 'fgets'.")
        if "malloc" in code and "free" not in code: add("performance_issues", "Potential Memory Leak: 'malloc' used without 'free'.")
        if "printf" in code: add("best_practices", "Use proper logging or streams in C++ instead of printf.")
        if "goto" in code: add("best_practices", "Avoid using 'goto'; it makes code harder to maintain.")
        if not issues["optimization_suggestions"]:
             add("optimization_suggestions", "Pass large objects by reference (const &) to avoid copying.")
             add("optimization_suggestions", "Use 'std::vector' instead of raw arrays for safety.")

    # --- GENERIC CHECKS ---
    if "TODO" in code: add("best_practices", "Resolve TODO comments.")
    if "password" in code.lower() and "=" in code: add("security_issues", "Potential hardcoded password detected.")

    # Artificial "AI Thinking" Delay
    import time, random
    time.sleep(random.uniform(1.0, 2.0)) # Slightly faster

    # Fallback rating with slight variation to feel "alive"
    base_rating = 10 - len(issues["bugs"]) - len(issues["security_issues"])
    final_rating = max(5, min(10, base_rating + random.uniform(-0.5, 0.5)))
    issues["overall_rating"] = f"{final_rating:.1f}"
    
    issues["language"] = language # EXPLICIT FIELD
    
    if not any(issues.values()):
        issues["summary"] = f"Code analysis complete for {language}. Structure appears sound."
    else:
         issues["summary"] = f"{language} Analysis: Found {len(issues['bugs'])} bugs and {len(issues['best_practices'])} improvements. (Confidence: {int(final_rating*9.5)}%)"

    return issues
