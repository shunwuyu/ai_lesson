import json
from ollama import chat

class FinancialProductFSM:
    def __init__(self):
        self.states = {
            'START': 'START',
            'YOUNG': 'YOUNG',
            'OLD': 'OLD',
            'LOW_RISK': 'LOW_RISK',
            'HIGH_RISK': 'HIGH_RISK',
            'HIGH_INCOME': 'HIGH_INCOME',
            'LOW_INCOME': 'LOW_INCOME'
        }
        self.current_state = self.states['START']

        self.transitions = {
            (self.states['START'], 'young'): self.states['YOUNG'],
            (self.states['START'], 'old'): self.states['OLD'],
            (self.states['YOUNG'], 'low_risk'): self.states['LOW_RISK'],
            (self.states['YOUNG'], 'high_risk'): self.states['HIGH_RISK'],
            (self.states['OLD'], 'low_risk'): self.states['LOW_RISK'],
            (self.states['OLD'], 'high_risk'): self.states['HIGH_RISK'],
        }

        self.product_recommendations = {
            (self.states['LOW_RISK'], self.states['HIGH_INCOME']): '高收益储蓄账户',
            (self.states['HIGH_RISK'], self.states['HIGH_INCOME']): '股票和共同基金',
            (self.states['LOW_RISK'], self.states['LOW_INCOME']): '定期存款（CD）',
            (self.states['HIGH_RISK'], self.states['LOW_INCOME']): '高风险投资基金',
        }

    def process_input(self, user_info):
        age = user_info.get('age')
        risk = user_info.get('risk')
        income = user_info.get('income')

        new_state = self.update_state(age, risk)
        if new_state is None:
            return '输入无效'

        self.current_state = new_state
        return self.get_recommendation(income)

    def update_state(self, age, risk):
        if age in ['young', 'old']:
            state_after_age = self.transitions.get((self.states['START'], age))
            return self.transitions.get((state_after_age, risk)) if state_after_age else None
        return None

    def get_recommendation(self, income):
        for (risk_state, income_state), product in self.product_recommendations.items():
            if self.current_state == risk_state:
                return product if income_state == (self.states['HIGH_INCOME'] if income == 'high_income' else self.states['LOW_INCOME']) else None
        return '没有合适的产品推荐'

def get_user_info_from_ollama(dialogue):
    """
    与 Ollama 模型对话，要求返回用户的关键信息，以 JSON 格式返回。
    指定 age、risk、income 的可能枚举值。
    """
    prompt = f"""
    请从以下对话中提取用户的年龄、风险偏好和收入水平，并以 JSON 格式返回。只输出 JSON，不要附加任何其他文字。
    格式如下：
    {{
        "age": "young" 或 "old",
        "risk": "low_risk" 或 "high_risk",
        "income": "high_income" 或 "low_income"
    }}

    对话内容如下：
    {dialogue}
    """

    # 调用 Ollama API 进行对话，返回结构化的 JSON 响应
    response = chat(model='llama3.2:latest', messages=[{'role': 'user', 'content': prompt}])

    # 获取 Ollama 返回的响应
    ollama_response = response['message']['content'].strip()

    # 将响应字符串转换为 Python 字典
    try:
        user_info = json.loads(ollama_response)  # 使用 json.loads 安全解析 JSON
    except json.JSONDecodeError:
        return None

    return user_info

def main():
    fsm = FinancialProductFSM()
    print("欢迎来到金融产品推荐系统！")

    # 假设对话记录来自 Ollama 的自然语言对话
    dialogue_history = """
    用户: 我年轻，喜欢高风险投资，而且收入挺高的。
    """

    # 使用 Ollama 提取用户信息（年龄、风险偏好、收入水平）
    user_info = get_user_info_from_ollama(dialogue_history)
    
    if user_info:
        # 显示提取的用户信息
        print(f"提取的用户信息: {json.dumps(user_info, ensure_ascii=False)}")
        
        # 处理提取的信息并推荐金融产品
        recommendation = fsm.process_input(user_info)
        print(f"推荐的产品: {recommendation}")
    else:
        print("无法根据用户输入生成推荐。")

if __name__ == "__main__":
    main()