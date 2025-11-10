import { GoogleGenAI } from "@google/genai";
import { dimensions, studentListQuestions, workerListQuestions } from "./gemini.type";
import { responseSchema } from "./gemini.type";
import type { Recommendation, UserProgress } from "./gemini.type";
import { GeminiRepository } from "./gemini.repository";
import { QuestionnaireAnswer } from "../questionnaire/questionnaire.type";

export class GeminiService {
  private geminiRepository: GeminiRepository;

  constructor(geminiRepository: GeminiRepository) {
    this.geminiRepository = geminiRepository;
  }

  async analyzeWlbAnswer({
    answers,
    isStudent,
    userId,
  }: {
    answers: QuestionnaireAnswer[];
    isStudent: boolean;
    userId: number;
  }): Promise<UserProgress> {
    const answerScores = answers.map((ans) => {
      switch (ans) {
        case "SANGAT_SETUJU":
          return 5;
        case "CUKUP_SETUJU":
          return 4;
        case "NETRAL":
          return 3;
        case "KURANG_SETUJU":
          return 2;
        case "SANGAT_TIDAK_SETUJU":
          return 1;
        default:
          return 0;
      }
    });

    const formattedAnswers = Array.from({
      length: isStudent ? studentListQuestions.length : workerListQuestions.length,
    })
      ?.map(
        (_, i) =>
          `- ${dimensions[i]}: "${isStudent ? studentListQuestions[i] : workerListQuestions[i]}" -> Score: ${answerScores[i]}/5`
      )
      .join("\n");

    const prompt = `
    You are an expert AI work-life balance coach. Analyze the following user responses from a questionnaire. The scores range from 1 (Strongly Disagree) to 5 (Strongly Agree). The data you analyze will be used to recalculate the user's score, combined with their latest data. It's important to make sure that user can improve their work-life balance based on your analysis.

    User's Answers:
    ${formattedAnswers}

    Based on these answers, please perform the following tasks:
    1.  Calculate a score (0-100) for each unique dimension. A higher user score on a question translates to better balance in that area.
    2.  Calculate an overall work-life balance score (0-100).
    3.  Provide a brief, encouraging summary of their situation.
    4.  For each dimension, provide a short analysis.
    5.  Provide 3-5 concrete, actionable recommendations to help the user improve their work-life balance, focusing on the lowest-scoring areas. Assign a priority (High, Medium, Low) to each recommendation.

    Return the entire analysis in the specified JSON format and in Indonesian language response.
    `;

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.5,
      },
    });

    const jsonText = response.text?.trim();
    try {
      const result = JSON.parse(jsonText as string) as UserProgress;
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };

      result.recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
      (result.recommendations as Recommendation[]).forEach((rec, index) => {
        (rec as Recommendation).id = index;
      });

      await this.geminiRepository.saveAnalyzeWlbAnswer({ ...result, userId });
      return result;
    } catch (error) {
      console.error("Failed to parse Gemini response:", jsonText, error);
      throw new Error("The AI response was not in the expected format.");
    }
  }

  async deleteUserProgress(userId: number) {
    return await this.geminiRepository.deleteUserProgress(userId);
  }
}