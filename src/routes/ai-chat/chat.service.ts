import { GoogleGenAI } from "@google/genai";
import { ChatRepository } from "./chat.repository";
import { context, responseSchema } from "./chat.type";

export class ChatService {
  private chatRepository: ChatRepository;

  constructor(chatRepository: ChatRepository) {
    this.chatRepository = chatRepository;
  }

  async getChatByUserId(userId: number) {
    return await this.chatRepository.getChatByUserId(userId);
  }

  async createChat(data: { userId: number; message: string }) {
    const historyChat = await this.chatRepository.getChatByUserId(data.userId);
    console.log(historyChat);

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

    console.log(prompt);
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: context,
        temperature: 0.5,
      },
    });

    const jsonText = response.text?.trim();
    try {
      const result = JSON.parse(jsonText as string);
      const savedResult = await this.chatRepository.createChat({
        userId: data.userId,
        message: data.message,
        answer: result.answer,
      });
      return savedResult;
    } catch (error) {
      console.error("Failed to parse Gemini recalculation response:", jsonText, error);
      throw new Error("The AI recalculation response was not in the expected format.");
    }
  }
}
