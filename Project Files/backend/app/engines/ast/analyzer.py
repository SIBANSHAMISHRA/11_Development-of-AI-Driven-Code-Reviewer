import ast


class ComplexityVisitor(ast.NodeVisitor):
    def __init__(self):
        self.functions = []
        self.classes = []
        self.imports = 0
        self.cyclomatic_complexity = 1
        self.max_nested_loops = 0
        self.current_loop_depth = 0

    def visit_FunctionDef(self, node):
        lines = len(node.body)
        self.functions.append({
            "name": node.name,
            "lines": lines
        })
        self.generic_visit(node)

    def visit_ClassDef(self, node):
        self.classes.append(node.name)
        self.generic_visit(node)

    def visit_If(self, node):
        self.cyclomatic_complexity += 1
        self.generic_visit(node)

    def visit_For(self, node):
        self.cyclomatic_complexity += 1
        self.current_loop_depth += 1
        self.max_nested_loops = max(self.max_nested_loops, self.current_loop_depth)
        self.generic_visit(node)
        self.current_loop_depth -= 1

    def visit_While(self, node):
        self.cyclomatic_complexity += 1
        self.current_loop_depth += 1
        self.max_nested_loops = max(self.max_nested_loops, self.current_loop_depth)
        self.generic_visit(node)
        self.current_loop_depth -= 1

    def visit_Try(self, node):
        self.cyclomatic_complexity += 1
        self.generic_visit(node)

    def visit_Import(self, node):
        self.imports += 1

    def visit_ImportFrom(self, node):
        self.imports += 1


def analyze_complexity(code: str):
    try:
        tree = ast.parse(code)
        visitor = ComplexityVisitor()
        visitor.visit(tree)

        total_lines = len(code.splitlines())

        return {
            "status": "success",
            "total_lines": total_lines,
            "function_count": len(visitor.functions),
            "functions": visitor.functions,
            "class_count": len(visitor.classes),
            "classes": visitor.classes,
            "import_count": visitor.imports,
            "cyclomatic_complexity": visitor.cyclomatic_complexity,
            "max_nested_loops": visitor.max_nested_loops,
            "complexity_level": get_complexity_level(visitor.cyclomatic_complexity)
        }

    except Exception as e:
        return {
            "status": "error",
            "message": "Invalid Python code",
            "details": str(e)
        }


def get_complexity_level(score: int):
    if score <= 5:
        return "Low"
    elif score <= 10:
        return "Moderate"
    elif score <= 20:
        return "High"
    else:
        return "Very High"
