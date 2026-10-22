# Python 的静态类型提示，只在 IDE 和 mypy 里生效，运行时不强制校验。
# TypedDict 用来给字典规定固定的键和类型
# Literal 用来限定变量只能取几个指定值
from typing import TypedDict, Literal
from fastapi import FastAPI
# StateGraph 定义状态图，添加节点和边的构建器
# START 和 END 分别代表图执行的虚拟入口和出口
from langgraph.graph import StateGraph, START, END
# MemorySaver 是 LangGraph 提供的内存版检查点保存器，能在进程内存中按 
# thread_id 保存和恢复图状态，适合开发调试，但服务重启后状态会丢失。
# checkpoint 检查点保存器
# 要存的：当前状态值、执行到哪步、线程ID、中断位置。下次恢复直接接着跑，不用重头来。
from langgraph.checkpoint.memory import MemorySaver
# LangGraph 的多用途指令对象，既能更新状态、动态跳转节点，也能配合 
# interrupt() 注入恢复值让人机交互继续执行。
from langgraph.types import Command
from pydantic import BaseModel

# 定义状态图的状态类型 
# TypedDict 基类 作用是给字典规定固定的键和类型
# 相当于 Annotation.Root
class WorkflowState(TypedDict):
    step: int
    msg: str

# 节点函数
def node1(state: WorkflowState) -> dict:
    print("✅ 执行节点1")
    return {"step": 1, "msg": "节点1完成"}

def node2(state: WorkflowState) -> dict:
    print("✅ 执行节点2")
    return {"step": 2, "msg": "节点2完成，等待人工审核"}

def human_review(state: WorkflowState) -> dict:
    print("✅ 人工审核通过，进入节点3")
    return {"step": 3, "msg": "审核完成"}

def node4(state: WorkflowState) -> dict:
    print("✅ 执行节点4，流程结束")
    return {"step": 4, "msg": "全部完成"}

builder = StateGraph(WorkflowState)
builder.add_node("node1", node1)
builder.add_node("node2", node2)
builder.add_node("human_review", human_review)
builder.add_node("node4", node4)

builder.add_edge(START, "node1")
builder.add_edge("node1", "node2")
builder.add_edge("node2", "human_review")
builder.add_edge("human_review", "node4")
builder.add_edge("node4", END)

# 内存检查点存储器
checkpointer = MemorySaver()

# interrupt_before=["human_review"] → 执行到 human_review 之前暂停
graph = builder.compile(
    checkpointer=checkpointer,
    interrupt_before=["human_review"],
)

# 4. FastAPI 接口
app = FastAPI(title="LangGraph Human-in-the-Loop Demo")

# 自动校验请求体里的 JSON 字段类型和必填项，
# 并把校验通过的数据转成 Python 对象传给路由函数。
class ResumeRequest(BaseModel):
    approved: bool  # 人工是否审核通过
# 快速构造 LangGraph 运行配置，里面带上 thread_id，
# 用来绑定同一条会话线程、实现中断恢复。
def make_config(thread_id: str) -> dict:
    return {"configurable": {"thread_id": thread_id}}

@app.get("/start")
def start_workflow(thread_id: str = "demo-thread-001"):
    """第一次启动：从 START 跑到 human_review 前中断"""
    # thread_id 就是 LangGraph 里一次独立会话的唯一标识
    # 生成带 thread_id 的运行配置
    config = make_config(thread_id)
    # 初始状态启动图 带上配置
    result = graph.invoke({"step": 0, "msg": ""}, config)
    # 读取当前 thread_id 对应的最新状态快照
    snapshot = graph.get_state(config)
    return {
        "status": "interrupted",
        "thread_id": thread_id,
        "current_state": result,
        #  LangGraph 支持并行节点，下一步可能同时跑多个节点 
        # list() 就是把任何能遍历的东西拿来，挨个抄一份，装进一个新列表里。
        "next_nodes": list(snapshot.next),  # 下一个待执行节点，前端据此弹审核框
        "message": "流程已暂停，等待人工审核",
    }

@app.post("/resume")
def resume_workflow(req: ResumeRequest, thread_id: str = "demo-thread-001"):
    """人工审核后恢复：approved=true 继续，false 终止"""
    config = make_config(thread_id)

    if not req.approved:
        return {
            "status": "rejected",
            "thread_id": thread_id,
            "message": "❌ 审核未通过，流程终止",
        }

    # Command(resume=True) → 从断点处继续往下跑
    final_result = graph.invoke(Command(resume=True), config)

    snapshot = graph.get_state(config)
    return {
        "status": "completed" if len(snapshot.next) == 0 else "interrupted",
        "thread_id": thread_id,
        "final_state": final_result,
        "next_nodes": list(snapshot.next),
        "message": "✅ 审核通过，流程继续执行",
    }

@app.get("/state")
def get_state(thread_id: str = "demo-thread-001"):
    """查看当前快照（调试用）"""
    # 生成带 thread_id 的运行配置
    config = make_config(thread_id)
    # 读取当前 thread_id 对应的最新状态快照
    snapshot = graph.get_state(config)
    return {
        "thread_id": thread_id,
        "values": snapshot.values,
        "next_nodes": list(snapshot.next),
        "config": snapshot.config,
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)