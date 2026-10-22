from typing import TypedDict

class AgentState(TypedDict):
    """
    Agent 状态，对应 JS 中的 graphConfig:
      step: { reducer: (_prev, curr) => curr }
      msg: { reducer: (_prev, curr) => curr }
    """
    step: int
    msg: str