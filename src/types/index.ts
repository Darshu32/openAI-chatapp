export interface ChatMessage {
    user: string;
    message: string;
    timestamp: Date;
}

export interface ChatResponse {
    response: string;
    timestamp: Date;
}