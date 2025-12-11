from fastapi import APIRouter
from app.schemas.ai_schemas import AIRequest, AIResponse
from app.services.ai_service import gemini_call

router = APIRouter(prefix="/ai", tags=["ai"])

@router.post("/ask", response_model=AIResponse)
async def ask_ai(payload: AIRequest):
    answer = await gemini_call(payload.prompt)
    return AIResponse(response=answer)
