from langgraph.types import interrupt
from state import AgentState

def node1(state: AgentState):
    print("[node1] 执行节点1")
    return {"step": 1, "msg": "节点1完成"}

def node2(state: AgentState):
    print("[node2] 执行节点2")
    return {"step": 2, "msg": "节点2完成，等待人工审核"}

def human_review(state: AgentState):
    """
    对应 JS 的 humanReview 节点。
    调用 interrupt() 暂停执行，等待外部通过 /resume 接口传入审核决策。
    interrupt() 的返回值就是 Command(resume=value) 中传入的 value。
    """
    
    decision = interrupt({
        "kind": "human_review",
        "message": "是否审核通过？输入 y 继续，其他任意内容则终止",
    })

    decision_str = str(decision).strip().lower()
    if decision_str == "y":
        print("[human_review] 人工审核通过，进入节点4")
        return {"step": 3, "msg": "审核完成"}
    else:
        print(f"[human_review] 审核未通过（decision={decision}），流程终止")
        return {"step": -1, "msg": "审核未通过，流程终止"}

def node4(state: AgentState):
    print("[node4] 执行节点4，流程结束")
    return {"step": 4, "msg": "全部完成"}