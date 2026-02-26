import requests


def fetch_repo_files(repo_url: str):

    if "github.com" not in repo_url:
        return {"error": "Invalid GitHub URL"}

    try:
        api_url = repo_url.replace("github.com", "api.github.com/repos") + "/contents"
        response = requests.get(api_url)

        if response.status_code != 200:
            return {"error": "Repository not found or private"}

        return _process_files(response.json())

    except Exception as e:
        return {"error": str(e)}


def _process_files(files):
    result = []

    for file in files:
        if file["type"] == "file":
            raw = requests.get(file["download_url"]).text
            result.append({
                "name": file["name"],
                "path": file["path"],
                "content": raw
            })

        elif file["type"] == "dir":
            nested = requests.get(file["url"]).json()
            result.extend(_process_files(nested))

    return result
