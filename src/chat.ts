import fetch from 'node-fetch';

type Message = {
    role: 'user' | 'assistant' | 'system';
    content: string;
};

class Chat {
    private apiKey: string;
    private chatHistory: Message[];

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.chatHistory = [
            { role: 'system', content: 'You are a helpful assistant.' }
        ];
    }

    async sendMessage(message: string): Promise<string> {
        this.chatHistory.push({ role: 'user', content: message });

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`,
                'HTTP-Referer': 'https://github.com/Darshu32/openAI-chatapp', // <- Your public repo link
                'X-Title': 'openai-cli-chat'
            },
            body: JSON.stringify({
                model: 'openrouter/cypher-alpha:free', // ✅ Free model from OpenRouter
                messages: this.chatHistory
            })
        });

        if (!response.ok) {
            const errData = await response.text();
            console.error("❌ API error:", errData);
            throw new Error(`Failed to send message: ${errData}`);
        }

        const data = await response.json();
        const aiReply = data.choices?.[0]?.message?.content?.trim() || "No reply from AI";
        this.chatHistory.push({ role: 'assistant', content: aiReply });

        return aiReply;
    }
}

export default Chat;
