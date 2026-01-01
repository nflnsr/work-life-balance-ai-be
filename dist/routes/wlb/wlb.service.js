"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WlbService = void 0;
const genai_1 = require("@google/genai");
const wlb_type_1 = require("./wlb.type");
const wlb_type_2 = require("./wlb.type");
const schedule_service_1 = require("../schedule/schedule.service");
const schedule_repository_1 = require("../schedule/schedule.repository");
class WlbService {
    wlbRepository;
    scheduleRepository;
    scheduleService;
    constructor(wlbRepository) {
        this.wlbRepository = wlbRepository;
        this.scheduleRepository = new schedule_repository_1.ScheduleRepository();
        this.scheduleService = new schedule_service_1.ScheduleService(this.scheduleRepository);
    }
    async getWlbUserToday(userId) {
        return await this.wlbRepository.getWlbUserToday(userId);
    }
    async getLatestWlbUser(userId) {
        return await this.wlbRepository.getLatestWlbUser(userId);
    }
    async getUsersByRecalculateProgress(recalculateFlag) {
        return await this.wlbRepository.getUsersByRecalculateProgress(recalculateFlag);
    }
    async getWlbUserHistory(userId) {
        return await this.wlbRepository.getWlbUserHistory(userId);
    }
    async deleteUserProgress(userId) {
        return await this.wlbRepository.deleteUserProgress(userId);
    }
    async updateRecalculateProgressFlag(userId, flag) {
        return await this.wlbRepository.updateRecalculateProgressFlag(userId, flag);
    }
    async updateRecommendationStatus(userId, recommendationId) {
        return await this.wlbRepository.updateRecommendationStatus(userId, recommendationId);
    }
    async analyzeAndSaveWlbAnswer({ answers, isStudent, userId, }) {
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
            length: isStudent ? wlb_type_1.studentListQuestions.length : wlb_type_1.workerListQuestions.length,
        })
            ?.map((_, i) => `- ${wlb_type_1.dimensions[i]}: "${isStudent ? wlb_type_1.studentListQuestions[i] : wlb_type_1.workerListQuestions[i]}" -> Score: ${answerScores[i]}/5`)
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
    5.  Provide 3-5 concrete, actionable recommendations to help the user improve their work-life balance, focusing on the lowest-scoring areas. Assign a priority (High, Medium, Low) to each recommendation and maximum 40 words per recommendation.

    Return the entire analysis in the specified JSON format and in Indonesian language response.
    `;
        const ai = new genai_1.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: wlb_type_2.responseSchema,
                temperature: 0.5,
            },
        });
        const jsonText = response.text?.trim();
        try {
            const result = JSON.parse(jsonText);
            const priorityOrder = { High: 1, Medium: 2, Low: 3 };
            result.recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
            const savedResult = await this.wlbRepository.saveAnalyzeWlbAnswer({ ...result, userId });
            return savedResult;
        }
        catch (error) {
            console.error("Failed to parse Wlb response:", jsonText, error);
            throw new Error("The AI response was not in the expected format.");
        }
    }
    async recalculateWlbScore(progress, userId) {
        const scheduleToday = await this.scheduleService.getSchedulesToday(userId);
        const completedRecs = progress.recommendations.filter((r) => r.checked);
        const pendingRecs = progress.recommendations.filter((r) => !r.checked);
        const prompt = `
    You are an expert AI work-life balance coach.
    A user is tracking their progress. Their previous overall score was ${progress.score}.
    Last summary: "${progress.summary}"
    Dimension breakdown:
    ${progress.dimensionalScores
            .map((d) => `- ${d.dimension}: ${d.score}/100 → ${d.analysis}`)
            .join("\n")}

    Completed recommendations today:
    ${completedRecs.length > 0
            ? completedRecs.map((r) => `- [${r.priority}] ${r.title}: ${r.description}`).join("\n")
            : "None."}

    Uncompleted recommendations:
    ${pendingRecs.length > 0
            ? pendingRecs.map((r) => `- [${r.priority}] ${r.title}`).join("\n")
            : "None."}

    Last planned schedule: 
    "${scheduleToday.map((s) => `- ${s.desc}`).join("\n") || "No schedule planned."}".

    Based on these positive commitments for the day, calculate a new, improved overall score (0-100). The improvement should be gradual and realistic (e.g., a 1-5 point increase depending on the effort shown). A planned schedule and at least one completed recommendation should result in a score increase.
    
    Also, provide a short (1-2 sentences), encouraging feedback message for the user based on their planned activities.
    
    Return a JSON object. Ensure the new score is clamped between 0 and 100. Give the response in Indonesian language.
  `;
        const ai = new genai_1.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: wlb_type_2.responseSchema,
                temperature: 0.5,
            },
        });
        const jsonText = response.text?.trim();
        try {
            const result = JSON.parse(jsonText);
            const priorityOrder = { High: 1, Medium: 2, Low: 3 };
            result.recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
            const savedResult = await this.wlbRepository.saveAnalyzeWlbAnswer({ ...result, userId });
            return savedResult;
        }
        catch (error) {
            console.error("Failed to parse Gemini recalculation response:", jsonText, error);
            throw new Error("The AI recalculation response was not in the expected format.");
        }
    }
    async insertLatestWlbProgress(userId) {
        await this.wlbRepository.insertLatestWlbProgress(userId);
    }
}
exports.WlbService = WlbService;
