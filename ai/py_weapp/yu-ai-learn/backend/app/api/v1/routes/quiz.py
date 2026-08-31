from fastapi import APIRouter
from app.models.schemas import QuizGenerateRequest, QuizResponse
from app.services.quiz_service import generate_mock_quiz

router = APIRouter()


@router.post("/quiz/generate", response_model=QuizResponse)
def generate_quiz(request: QuizGenerateRequest) -> QuizResponse:
    return generate_mock_quiz(request)
