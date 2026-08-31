import { Question } from '../types/learning'

export default function mockQuestions(topic = 'RAG') : Question[] {
  return [
    { id: '1', type: '单选题', difficulty: '入门', title: `下列关于 ${topic} 的描述，哪一项是正确的？`, options: [`${topic} 是一种绘画风格`, `${topic} 能帮助模型结合检索到的知识生成答案`, `${topic} 只能处理图片`, `${topic} 不需要数据来源`], answer: 1, explanation: `${topic} 的核心是把可靠的外部知识引入生成过程，让答案更准确，也能减少模型产生幻觉。` },
    { id: '2', type: '单选题', difficulty: '中等', title: `${topic} 学习中，最重要的第一步是什么？`, options: ['明确学习目标', '盲目背诵', '跳过练习', '只看标题'], answer: 0, explanation: '明确目标可以帮助你筛选信息、组织知识，并用练习验证是否真正掌握。' },
    { id: '3', type: '判断题', difficulty: '中等', title: '将知识拆成小问题，更有利于理解和记忆。', options: ['正确', '错误'], answer: 0, explanation: '把复杂主题拆解成可回答的问题，是降低认知负担的有效方法。' },
    { id: '4', type: '单选题', difficulty: '进阶', title: '高质量复盘应该关注什么？', options: ['只看得分', '记录错因并补齐知识点', '只重复正确题', '跳过讲解'], answer: 1, explanation: '复盘的价值在于定位薄弱点，结合解析修正理解，再通过练习巩固。' },
    { id: '5', type: '判断题', difficulty: '进阶', title: '持续的小步学习比一次性塞入大量内容更容易坚持。', options: ['正确', '错误'], answer: 0, explanation: '稳定、短时、可反馈的学习节奏更容易形成习惯并长期积累。' }
  ]
}
