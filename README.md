# 11_Development-of-AI-Driven-Code-Reviewer
# AI-Driven Code Reviewer (Individual Project)

## Overview
This project is an individual implementation of an AI-driven code reviewer designed
to analyze Python programs and provide automated feedback. The system reviews code
structure without executing it, making the analysis safe and suitable for academic use.

The project is divided into three individual components:
- Model Research
- Python Task
- SQL Task

---

## Model Research
The model research focuses on understanding static code analysis techniques.
Python’s Abstract Syntax Tree (AST) is used to analyze program structure and detect
common programming issues. A rule-based approach is followed to generate feedback.
AI-based enhancements are considered as future scope.

---

## Python Task
The Python module analyzes student-written Python code using AST. It identifies:
- Defined functions
- Structural issues such as long functions
- Basic syntax problems

The analysis is performed without running the code.

### How to Run Python Task
```bash
python python_task.py
