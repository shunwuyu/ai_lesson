const config = {
    KIMI_API_ENDPOINT: 'https://api.moonshot.cn/v1',
    // 请在这里替换为你的 Kimi API Key
    KIMI_API_KEY: 'sk-oszn1m05uj03RTx96cBShOpEAdDk4Jih9CFuj6PHiuoeWb0Z',
    // 语言检测提示词
    DETECT_PROMPT: '请检测以下文本的语言，只需要返回语言代码(zh/en/ja)：',
    // 翻译提示词模板
    TRANSLATE_PROMPTS: {
        'zh': '请将以下文本翻译成中文，保持专业和准确：',
        'en': '请将以下文本翻译成英文，保持专业和准确：',
        'ja': '请将以下文本翻译成日文，保持专业和准确：'
    },
    // 总结提示词
    SUMMARY_PROMPT: '请总结以下文本的主要内容，使用简洁的中文：',
    // 语言名称映射
    LANGUAGE_NAMES: {
        'auto': '自动检测',
        'zh': '中文',
        'en': 'English',
        'ja': '日本語'
    }
}; 