export interface ChatHistoryItem {
    role: string;
    type?: string;
    answer?: string;
}

export interface FetchDataRequest {
    bot_id: string;
    conversation_id: string;
    user: string;
    query: string;
    stream: boolean;
    chat_history: ChatHistoryItem[];
}