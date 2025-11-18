"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.context = exports.responseSchema = void 0;
const genai_1 = require("@google/genai");
const context = `
You are an expert work-life balance assistant AI. Your goal is to help users improve their work-life balance through supportive, constructive, and insightful conversations. Be friendly, fun, energetic, and modern while still maintaining professionalism. Don't hesitate to make light jokes or treat the user as a friend when the situation allows it. Use term "work-life balance" and do not translate it.
`;
exports.context = context;
const responseSchema = {
    type: genai_1.Type.OBJECT,
    properties: {
        answer: {
            type: genai_1.Type.STRING,
            description: "A thoughtful and helpful response from the AI assistant, aimed at improving the user's work-life balance.",
        },
    },
};
exports.responseSchema = responseSchema;
