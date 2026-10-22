import uuid
from typing import Any

from fastapi import FastAPI, HTTPException
from langgraph.types import Command

from graph import graph
from checkpointer import close_connection
from schemas import RunRequest, ResumeRequest, StopRequest

app = FastAPI(title="LangGraph Pause/Resume Demo (Python)")

def _config(thread_id: str) -> dict[str, Any]:
    return {"configurable": {"thread_id": thread_id}}

# @app.get("/")
# def index():
#     return {"message": "Hello World"}

@app.post("/run")
def run_agent(req: RunRequest):
    """
    启动流程。对应 JS 中的:
      await graph.invoke({ step: 0, msg: "" }, config);
    流程会执行 node1 -> node2，然后在 human_review 节点内调用 interrupt() 暂停。
    状态已落盘到 SQLite，进程重启后仍可恢复。
    """
    # uuid 生成一个随机字符串作为 thread_id
    # 如果 req.thread_id 已存在，就使用它
    thread_id = req.thread_id or str(uuid.uuid4())
    config = _config(thread_id)
    initial_state = {"step": 0, "msg": req.task or ""}

    chunks = []
    # LangGraph 拿到 config 里的 thread_id 后 
    # 会自动去 checkpointer（也就是 SqliteSaver）里查有没有这个会话的检查点
    # 有的话就恢复状态，没有就用 initial_state 新建。
    # 边跑边往外吐结果 graph 执行
    # 每完成一个节点/超步就产出一个 chunk
    for chunk in graph.stream(initial_state, config):
        print(chunk)
        chunks.append(chunk)
        if "__interrupt__" in chunk:
            # 发现 interrupt() 调用，返回中断信息
            return {
                "thread_id": thread_id,
                "interrupted": True,
                "interrupt_info": chunk["__interrupt__"],
                "chunks": chunks,
            }
    # 没有 interrupt() 调用，流程执行完成
    state = graph.get_state(config)
    return {
        "thread_id": thread_id,
        "interrupted": False,
        "final_state": state.values,
        "chunks": chunks,
    }

@app.post("/resume")
def resume_agent(req: ResumeRequest):
    config = _config(req.thread_id)
    state = graph.get_state(config)
    if not state.next:
        raise HTTPException(status_code=400, detail="当前流程未处于中断状态")

    if req.decision.strip().lower() == "y":
        # 审核通过，恢复执行
        # 使用 Command(resume="y") 将审核决策注入 interrupt() 的返回值
        chunks = []
        for chunk in graph.stream(Command(resume="y"), config):
            chunks.append(chunk)
            if "__interrupt__" in chunk:
                return {
                    "thread_id": req.thread_id,
                    "interrupted": True,
                    "interrupt_info": chunk["__interrupt__"],
                    "chunks": chunks,
                }

        state = graph.get_state(config)
        return {
            "thread_id": req.thread_id,
            "interrupted": False,
            "final_state": state.values,
            "chunks": chunks,
        }
    else:
        # 审核不通过，不恢复执行，流程终止
        graph.update_state(
            config,
            {"step": -1, "msg": "审核未通过，流程终止"},
            as_node="node2",
        )
        return {
            "thread_id": req.thread_id,
            "interrupted": False,
            "terminated": True,
            "message": "审核未通过，流程已终止",
        }

@app.post("/stop")
def stop_agent(req: StopRequest):
    """主动终止流程。"""
    config = _config(req.thread_id)
    state = graph.get_state(config)
    if state.values is None:
        raise HTTPException(status_code=404, detail="未找到该会话状态")

    graph.update_state(
        config,
        {"step": -1, "msg": "用户主动终止"},
        as_node="node2",
    )
    return {
        "thread_id": req.thread_id,
        "status": "stopped",
        "message": "流程已终止",
    }

@app.get("/state/{thread_id}")
def get_state(thread_id: str):
    """获取当前状态快照。"""
    config = _config(thread_id)
    state = graph.get_state(config)
    if state.values is None:
        raise HTTPException(status_code=404, detail="未找到该会话状态")
    return {
        "thread_id": thread_id,
        "values": state.values,
        "next": state.next,
        "interrupted": bool(state.next),
    }

@app.get("/history/{thread_id}")
def get_history(thread_id: str, limit: int = 10):
    """查看会话的历史 checkpoint。"""
    config = _config(thread_id)
    history = list(graph.get_state_history(config, limit=limit))
    return {
        "thread_id": thread_id,
        "count": len(history),
        "checkpoints": [
            {
                "values": h.values,
                "next": h.next,
                "metadata": h.metadata,
            }
            for h in history
        ],
    }

@app.on_event("shutdown")
def shutdown():
    close_connection()