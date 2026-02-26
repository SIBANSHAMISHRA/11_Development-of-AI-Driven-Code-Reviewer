from fastapi import APIRouter
from pydantic import BaseModel
import subprocess

router = APIRouter(prefix="/terminal", tags=["Terminal"])

class ExecuteRequest(BaseModel):
    code: str
    language: str = "python"  # Default to python

@router.post("/execute")
def execute_code(request: ExecuteRequest):
    try:
        # Determine command based on language
        if request.language in ["javascript", "typescript", "js", "ts"]:
            command = ["node", "-e", request.code]
        elif request.language in ["c", "cpp"]:
            # Basic C/C++ handling: write to temp file, compile, run
            import os, uuid
            filename = f"temp_{uuid.uuid4().hex}.{'c' if request.language == 'c' else 'cpp'}"
            exe = filename + ".exe"
            with open(filename, "w") as f: f.write(request.code)
            
            compiler = "gcc" if request.language == "c" else "g++"
            compile_res = subprocess.run([compiler, filename, "-o", exe], capture_output=True, text=True)
            
            if compile_res.returncode != 0:
                os.remove(filename)
                return {"stdout": "", "stderr": f"Compilation Failed:\n{compile_res.stderr}", "exit_code": 1}
            
            # Run compiled exe
            command = [os.path.abspath(exe)]
            # Clean up handled in finally block in real app, here we just run
        elif request.language == "java":
             # Basic Java handling
             import os, uuid
             # Extract class name or use generic
             class_match = re.search(r"public\s+class\s+(\w+)", request.code)
             class_name = class_match.group(1) if class_match else "Main"
             filename = f"{class_name}.java"
             
             with open(filename, "w") as f: f.write(request.code)
             
             compile_res = subprocess.run(["javac", filename], capture_output=True, text=True)
             if compile_res.returncode != 0:
                 if os.path.exists(filename): os.remove(filename)
                 return {"stdout": "", "stderr": f"Compilation Failed:\n{compile_res.stderr}", "exit_code": 1}
                 
             command = ["java", class_name]
        else:
            # Default to Python
            command = ["python", "-c", request.code]

        # ⚠️ This is a basic implementation.
        result = subprocess.run(
            command,
            capture_output=True,
            text=True,
            timeout=5
        )
        
        # Cleanup temp files (best effort)
        if request.language in ["c", "cpp"] and 'exe' in locals() and os.path.exists(exe):
            try: os.remove(exe); os.remove(filename)
            except: pass
        if request.language == "java" and 'class_name' in locals():
            try: 
                os.remove(f"{class_name}.java")
                os.remove(f"{class_name}.class")
            except: pass

        return {
            "stdout": result.stdout,
            "stderr": result.stderr,
            "exit_code": result.returncode
        }
    except subprocess.TimeoutExpired:
        return {"stdout": "", "stderr": "Execution timed out (5s limit)", "exit_code": -1}
    except FileNotFoundError:
        return {"stdout": "", "stderr": f"Error: Runtime for {request.language} not found. Ensure python/node is installed.", "exit_code": 1}
    except Exception as e:
        return {"stdout": "", "stderr": str(e), "exit_code": -1}

@router.get("/logs")
def get_terminal_logs():
    return {
        "logs": [
            "→ Initializing CodeMind AI...",
            "✓ GPT-4 connected",
            "✓ Code analysis engine ready",
            "⚠ 2 warnings found"
        ]
    }
