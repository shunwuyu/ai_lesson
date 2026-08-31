from uuid import uuid4
from app.models.schemas import Question, QuizResponse, QuizGenerateRequest


def generate_mock_quiz(request: QuizGenerateRequest) -> QuizResponse:
    questions = []
    for index in range(request.question_count):
        kind = "single" if index % 3 == 0 else "multiple" if index % 3 == 1 else "true_false"
        options = ([{"key": "A", "text": "核心概念"}, {"key": "B", "text": "无关概念"}]
                   if kind != "true_false" else [{"key": "A", "text": "正确"}, {"key": "B", "text": "错误"}])
        questions.append(Question(id=f"q{index + 1}", type=kind, stem=f"关于“{request.user_input}”的基础问题 {index + 1}？", options=options, answer=["A"], explanation="选择 A，因为它符合该主题的核心定义。", knowledge_point=request.user_input[:30], difficulty="easy"))
    return QuizResponse(quiz_id=f"quiz_{uuid4().hex[:12]}", title=f"{request.user_input[:20]} 闯关", summary=f"围绕 {request.user_input[:50]} 生成的学习题库", questions=questions)
