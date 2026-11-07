from openai import OpenAI
import json
# 数据类装饰器 
# `@dataclass` 自动为数据类生成 `__init__ 构造函数`、`__repr__对象被打印时的字符串` 等样板方法，简化纯数据载体类的定义。
from dataclasses import dataclass, asdict
from typing import List, Dict, Optional

# ===================== 配置区 =====================
# 换成你自己的key、接口地址，ollama示例：base_url="http://localhost:11434/v1"
client = OpenAI(
    api_key="sk-2ffb50ad65724fac9e528d1d7982abbc",
    base_url="https://api.deepseek.com/v1"
)
MODEL_NAME = "deepseek-v4-flash"

# 预设业务意图池
INTENT_LIST = ["产品咨询", "市场份额查询", "方案对比", "报价查询", "故障咨询", "配置推荐", "unknown"]

# 古怪样本存储（生产环境替换成数据库，对应流程图里的数据库）
weird_case_storage: List[Dict] = []

# ===================== 数据结构 =====================
@dataclass
class PreprocessResult:
    raw_input: str
    normalized_input: str
    reference_map: Dict[str, str]
    need_clarify: bool
    clarify_reason: str
    need_search: bool
    remark: str

@dataclass
class IntentResult:
    intent: str
    entity: Dict
    confidence: float
    remark: str

# ===================== 1. 输入预处理模块（意图识别前） =====================
PREPROCESS_SYSTEM_PROMPT = """
你是【输入归一化预处理模块】，只做输入清洗，严格遵守边界：
✅ 允许：指代消解、省略句补全、病句修正、术语标准化、多义词消歧、判断是否需要澄清、判断是否需要后续搜索
❌ 禁止：直接回答问题、判断业务意图、调用工具、生成方案、做推荐、擅自补充未知事实、伪造实时信息

输出必须是严格JSON，不能有额外解释。JSON schema：
{
  "raw_input": "用户原始输入",
  "normalized_input": "归一化后完整无歧义问句",
  "reference_map": {"代词/简称":"对应实体"},
  "need_clarify": true/false,
  "clarify_reason": "需要澄清的原因，不需要填空字符串",
  "need_search": true/false,
  "remark": "备注"
}

Few-shot示例：
历史上下文：用户上一问：良信互联这家公司产品如何？
用户输入：全屋智能市场占有率如何？
输出：
{
  "raw_input": "全屋智能市场占有率如何？",
  "normalized_input": "良信互联的全屋智能业务市场占有率如何？",
  "reference_map": {},
  "need_clarify": false,
  "clarify_reason": "",
  "need_search": true,
  "remark": ""
}

历史上下文：上一轮提到两个方案：方案A（总线方案）、方案B（无线方案）
用户输入：第二个适合生产吗？
输出：
{
  "raw_input": "第二个适合生产吗？",
  "normalized_input": "方案B适合生产环境使用吗？",
  "reference_map": {"第二个": "方案B（无线方案）"},
  "need_clarify": false,
  "clarify_reason": "",
  "need_search": false,
  "remark": ""
}

用户输入：帮我优化一下
输出：
{
  "raw_input": "帮我优化一下",
  "normalized_input": "帮我优化【目标对象未知】",
  "reference_map": {},
  "need_clarify": true,
  "clarify_reason": "缺少需要优化的对象、优化方向约束",
  "need_search": false,
  "remark": ""
}
"""

def preprocess_user_input(user_input: str, history_context: str = "") -> PreprocessResult:
    resp = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {"role": "system", "content": PREPROCESS_SYSTEM_PROMPT},
            {"role": "user", "content": f"历史上下文：{history_context}\n用户输入：{user_input}"}
        ],
        temperature=0.1
    )
    # 字符串 
    content = resp.choices[0].message.content.strip()
    # 解析 JSON 字符串
    data = json.loads(content)
    # 转换为数据类实例 `**` 是**字典解包运算符**
    return PreprocessResult(**data)

# ===================== 2. 意图识别模块（接收预处理输出） =====================
INTENT_SYSTEM_PROMPT = f"""
你是【意图识别器】，输入是已经归一化的用户请求 + 指代映射表。
任务：
1. 从预设意图列表选择意图：{INTENT_LIST}，匹配不上选 unknown
2. 抽取业务实体：产品、维度、场景
3. 输出置信度0~1
禁止回答用户问题、禁止调用工具。
输出严格JSON：
{{
  "intent": "意图标识",
  "entity": {{"产品": "", "维度": "", "场景": ""}},
  "confidence": 0.0~1.0,
  "remark": ""
}}
"""
# 意图识别模块
def recognize_intent(pre_result: PreprocessResult) -> IntentResult:
    user_msg = f"""
归一化问句：{pre_result.normalized_input}
指代映射表：{json.dumps(pre_result.reference_map, ensure_ascii=False)}
"""
    resp = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {"role": "system", "content": INTENT_SYSTEM_PROMPT},
            {"role": "user", "content": user_msg}
        ],
        temperature=0.1
    )
    content = resp.choices[0].message.content.strip()
    data = json.loads(content)
    return IntentResult(**data)

# ===================== 3. 案例回流模块（对应你流程图：古怪输入 -> reviewer -> 入库） =====================
def collect_weird_case(pre_result: PreprocessResult, intent_result: IntentResult):
    """
    当预处理标记 need_clarify / 意图为unknown，判定为古怪输入，送入reviewer待审核
    审核通过后存入存储，后续用于few-shot检索
    """
    if pre_result.need_clarify or intent_result.intent == "unknown":
        case = {
            "raw": pre_result.raw_input,
            "normalized": pre_result.normalized_input,
            "ref_map": pre_result.reference_map,
            "intent": intent_result.intent,
            "review_status": "pending" # pending / accept / reject
        }
        weird_case_storage.append(case)
        print(f"✅ 古怪案例已入库待reviewer审核：{case['raw']}")

# ===================== 主入口 Demo =====================
def agent_pipeline(user_input: str, history_context: str = ""):
    print("===== [1] 输入预处理 =====")
    pre_res = preprocess_user_input(user_input, history_context)
    # 打印预处理结果 asdict 将数据类实例转换为字典，再转换为 JSON 字符串
    print(json.dumps(asdict(pre_res), ensure_ascii=False, indent=2))

    print("\n===== [2] 意图识别 =====")
    intent_res = recognize_intent(pre_res)
    print(json.dumps(asdict(intent_res), ensure_ascii=False, indent=2))

    # 回流古怪样本
    collect_weird_case(pre_res, intent_res)

    # 如果需要澄清：直接返回澄清话术给用户
    if pre_res.need_clarify:
        return f"【需要澄清】{pre_res.clarify_reason}"
    return f"识别完成，意图：{intent_res.intent}，实体：{intent_res.entity}"

if __name__ == "__main__":
    # 测试用例1：良信互联上下文
    history = "用户上一问：良信互联这家公司产品如何？"
    test_input = "全屋智能市场占有率如何？"
    ret = agent_pipeline(test_input, history)
    print("\n===== 最终返回给用户 =====")
    print(ret)

    # print("\n===== 分割线，第二个测试 =====")
    # # 测试用例2：缺主语
    # ret2 = agent_pipeline("帮我优化一下", "")
    # print(ret2)
