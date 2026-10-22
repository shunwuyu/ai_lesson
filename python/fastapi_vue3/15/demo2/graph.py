from langgraph.graph import StateGraph, START, END
from checkpointer import get_checkpointer
from state import AgentState
from nodes import node1, node2, human_review, node4

def build_graph():
    builder = StateGraph(AgentState)
    builder.add_node("node1", node1)
    builder.add_node("node2", node2)
    builder.add_node("human_review", human_review)
    builder.add_node("node4", node4)

    builder.add_edge(START, "node1")
    builder.add_edge("node1", "node2")
    builder.add_edge("node2", "human_review")
    builder.add_edge("human_review", "node4")
    builder.add_edge("node4", END)

    checkpointer = get_checkpointer()
    return builder.compile(checkpointer=checkpointer)

# 模块级单例
graph = build_graph()