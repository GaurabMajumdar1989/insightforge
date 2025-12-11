import httpx
from app.config.settings import settings

API_KEY = settings.GEMINI_API_KEY
URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"

async def gemini_call(prompt: str) -> str:
    body = {
        "contents": [
            {"parts": [{"text": prompt}]}
        ]
    }

    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(f"{URL}?key={API_KEY}", json=body)

        resp.raise_for_status()
        data = resp.json()

    return data["candidates"][0]["content"]["parts"][0]["text"]
