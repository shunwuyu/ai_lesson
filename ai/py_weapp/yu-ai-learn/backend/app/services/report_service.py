from collections import defaultdict
from app.models.schemas import ReportGenerateRequest, ReportResponse


def generate_report(request: ReportGenerateRequest) -> ReportResponse:
    if not request.answer_records or len(request.answer_records) != len(request.questions):
        raise ValueError("答题记录必须与题目数量一致且不能为空")
    question_map = {question.id: question for question in request.questions}
    if set(question_map) != {record.question_id for record in request.answer_records}:
        raise ValueError("答题记录与题目不匹配")
    correct = sum(record.is_correct for record in request.answer_records)
    accuracy = round(correct / len(request.questions) * 100, 2)
    mastered, weak = [], []
    for record in request.answer_records:
        point = question_map[record.question_id].knowledge_point
        (mastered if record.is_correct else weak).append(point)
    return ReportResponse(accuracy=accuracy, total_questions=len(request.questions), correct_count=correct,
        mastered_points=list(dict.fromkeys(mastered)), weak_points=list(dict.fromkeys(weak)),
        three_line_summary=[f"本次学习主题：{request.topic}", f"共完成 {len(request.questions)} 道题，答对 {correct} 道。", f"正确率为 {accuracy}%。"],
        advice=["复习薄弱知识点并尝试用自己的话解释。", "完成一轮间隔复习，巩固记忆。"], share_quote="把知识做成关卡，记忆会更深。")
