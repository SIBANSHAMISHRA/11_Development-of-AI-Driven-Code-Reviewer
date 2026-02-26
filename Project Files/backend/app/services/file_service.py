import os
from fastapi import UploadFile, HTTPException

MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB


async def read_uploaded_file(file: UploadFile):
    content = await file.read()

    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File too large")

    return {
        "filename": file.filename,
        "size": len(content),
        "content": content.decode("utf-8", errors="ignore")
    }


async def save_file(file: UploadFile, folder: str = "uploads"):
    content = await file.read()

    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File too large")

    os.makedirs(folder, exist_ok=True)

    safe_filename = file.filename.replace("..", "")
    file_path = os.path.join(folder, safe_filename)

    with open(file_path, "wb") as f:
        f.write(content)

    return {
        "message": "File saved successfully",
        "file_path": file_path,
        "size": len(content)
    }
