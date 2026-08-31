from typing import Literal
from pydantic import BaseModel, Field, ConfigDict, field_validator


class Option(BaseModel):
    key: str
    text: str


class Question(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    type: Literal["single", "multiple", "true_false"]
    stem: str
    options: list[Option]
    answer: list[str] = Field(min_length=1)
    explanation: str
    knowledge_point: str
    difficulty: Literal["easy", "medium", "hard"]


class QuizGenerateRequest(BaseModel):
    user_input: str = Field(min_length=1, max_length=5000)
    question_count: int = Field(default=5, ge=3, le=5)
    difficulty: Literal["easy", "medium", "hard", "mixed"] = "mixed"

    @field_validator("user_input")
    @classmethod
    def strip_input(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("user_input 不能为空")
        return value


class QuizResponse(BaseModel):
    quiz_id: str
    title: str
    summary: str
    questions: list[Question]


class AnswerRecord(BaseModel):
    question_id: str
    selected_answers: list[str]
    is_correct: bool
    duration_ms: int = Field(ge=0)


class ReportGenerateRequest(BaseModel):
    quiz_id: str
    topic: str = Field(min_length=1)
    questions: list[Question]
    answer_records: list[AnswerRecord]


class ReportResponse(BaseModel):
    accuracy: float
    total_questions: int
    correct_count: int
    mastered_points: list[str]
    weak_points: list[str]
    three_line_summary: list[str]
    advice: list[str]
    share_quote: str
