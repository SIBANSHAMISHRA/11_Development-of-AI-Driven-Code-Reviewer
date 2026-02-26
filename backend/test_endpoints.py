import requests

try:
    print("Testing /terminal/execute...")
    resp = requests.post("http://127.0.0.1:8000/terminal/execute", json={"code": "print('test')"})
    print(resp.status_code, resp.json())

    print("\nTesting /review/...")
    resp = requests.post("http://127.0.0.1:8000/review/", json={"code": "def foo(): pass", "model": "gpt-4.1-mini"})
    print(resp.status_code)
    # Print only keys to avoid massive output
    if resp.status_code == 200:
        print(resp.json().keys())
    else:
        print(resp.text)

except Exception as e:
    print(e)
