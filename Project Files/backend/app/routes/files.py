from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.file_service import read_uploaded_file, save_file

router = APIRouter(prefix="/files", tags=["Files"])


@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")

    return await read_uploaded_file(file)


@router.post("/save")
async def save_uploaded_file(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")

    return await save_file(file)
# ✅ Needed for FileExplorer frontend
@router.get("")
def get_files():
    return [
        {
            "name": "src",
            "type": "folder",
            "children": [
                {"name": "App.tsx", "type": "file"},
                {"name": "index.tsx", "type": "file"},
            ]
        },
        {
            "name": "package.json",
            "type": "file"
        }
    ]

