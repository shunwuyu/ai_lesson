from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_health():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_generate_quiz_mock_returns_valid_questions():
    response = client.post(
        "/api/v1/quiz/generate",
        json={"user_input": "学习 RAG", "question_count": 3, "difficulty": "mixed"},
    )
    assert response.status_code == 200
    body = response.json()
    assert body["quiz_id"].startswith("quiz_")
    assert len(body["questions"]) == 3
    assert {"id", "type", "stem", "options", "answer", "explanation", "knowledge_point", "difficulty"} <= body["questions"][0].keys()


def test_quiz_input_and_count_are_validated():
    assert client.post("/api/v1/quiz/generate", json={"user_input": ""}).status_code == 422
    assert client.post("/api/v1/quiz/generate", json={"user_input": "x", "question_count": 2}).status_code == 422
    assert client.post("/api/v1/quiz/generate", json={"user_input": "x", "question_count": 6}).status_code == 422


def test_generate_report_calculates_statistics():
    response = client.post(
        "/api/v1/report/generate",
        json={
            "quiz_id": "quiz_test",
            "topic": "RAG",
            "questions": [
                {"id": "q1", "type": "single", "stem": "a", "options": [{"key": "A", "text": "a"}], "answer": ["A"], "explanation": "e", "knowledge_point": "定义", "difficulty": "easy"},
                {"id": "q2", "type": "true_false", "stem": "b", "options": [{"key": "A", "text": "对"}], "answer": ["A"], "explanation": "e", "knowledge_point": "边界", "difficulty": "easy"},
            ],
            "answer_records": [
                {"question_id": "q1", "selected_answers": ["A"], "is_correct": True, "duration_ms": 1000},
                {"question_id": "q2", "selected_answers": ["B"], "is_correct": False, "duration_ms": 2000},
            ],
        },
    )
    assert response.status_code == 200
    body = response.json()
    assert body["accuracy"] == 50.0
    assert body["total_questions"] == 2
    assert body["correct_count"] == 1
    assert "边界" in body["weak_points"]
    assert len(body["three_line_summary"]) == 3


def test_report_requires_matching_records():
    response = client.post(
        "/api/v1/report/generate",
        json={"quiz_id": "quiz_test", "topic": "RAG", "questions": [], "answer_records": []},
    )
    assert response.status_code == 422
