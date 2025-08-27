// 定义 Ollama API /api/chat 的请求和响应格式

export type Message = {
    role: 'user' | 'assistant';
    content: string;
};
  
export type ChatRequest = {
    model: string;
    messages: Message[];
    stream?: boolean; // 我们这里用非流式
};

export type ChatResponse = {
    model: string;
    created_at: string;
    message: Message;
    done: boolean;
    total_duration: number;
    load_duration: number;
    prompt_eval_count: number;
    prompt_eval_duration: number;
    eval_count: number;
    eval_duration: number;
};