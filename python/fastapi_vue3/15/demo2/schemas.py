from typing import Optional
from pydantic import BaseModel

class RunRequest(BaseModel):
    task: Optional[str] = None
    thread_id: Optional[str] = None

class ResumeRequest(BaseModel):
    thread_id: str
    decision: str  # "y" 审核通过继续执行，其他则终止

class StopRequest(BaseModel):
    thread_id: str