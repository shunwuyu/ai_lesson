from fastapi import APIRouter, HTTPException
from app.models.schemas import ReportGenerateRequest, ReportResponse
from app.services.report_service import generate_report

router = APIRouter()


@router.post("/report/generate", response_model=ReportResponse)
def report(request: ReportGenerateRequest) -> ReportResponse:
    try:
        return generate_report(request)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc
