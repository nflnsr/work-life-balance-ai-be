"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const genai_1 = require("@google/genai");
const chat_type_1 = require("./chat.type");
class ChatService {
    chatRepository;
    constructor(chatRepository) {
        this.chatRepository = chatRepository;
    }
    async getChatByUserId(userId) {
        return await this.chatRepository.getChatByUserId(userId);
    }
    async createChat(data) {
        const historyChat = await this.chatRepository.getChatByUserId(data.userId);
        const formattedChat = historyChat
            .map((chat) => `  User: ${chat.message}\n  AI: ${chat.answer}`)
            .join("\n");
        const prompt = `
    You are an AI assistant that helps users to improve their work-life balance.
    Here is the conversation history between you and the user:
    ${formattedChat}

    Now, continue the conversation with the user's new message:
    User: ${data.message}
        `;
        const ai = new genai_1.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: chat_type_1.responseSchema,
                systemInstruction: chat_type_1.context,
                temperature: 0.5,
            },
        });
        const jsonText = response.text?.trim();
        try {
            const result = JSON.parse(jsonText);
            const savedResult = await this.chatRepository.createChat({
                userId: data.userId,
                message: data.message,
                answer: result.answer,
            });
            return savedResult;
        }
        catch (error) {
            console.error("Failed to parse Gemini recalculation response:", jsonText, error);
            throw new Error("The AI recalculation response was not in the expected format.");
        }
    }
}
exports.ChatService = ChatService;
