"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WlbController = void 0;
class WlbController {
    wlbService;
    constructor(wlbService) {
        this.wlbService = wlbService;
    }
    async getWlbUserToday(req, res, next) {
        const userId = Number(req.user?.id);
        try {
            const userProgress = await this.wlbService.getWlbUserToday(userId);
            return res.status(200).json(userProgress);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
            return res.status(500).json({ error: errorMessage });
        }
    }
    async getLatestWlbUser(req, res, next) {
        const userId = Number(req.user?.id);
        try {
            const userProgress = await this.wlbService.getLatestWlbUser(userId);
            return res.status(200).json(userProgress);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
            return res.status(500).json({ error: errorMessage });
        }
    }
    async getWlbUserHistory(req, res, next) {
        const userId = Number(req.user?.id);
        try {
            const userProgressHistory = await this.wlbService.getWlbUserHistory(userId);
            return res.status(200).json(userProgressHistory);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
            return res.status(500).json({ error: errorMessage });
        }
    }
    async updateRecommendationStatus(req, res, next) {
        const userId = Number(req.user?.id);
        const recommendationId = Number(req.params.recommendationId);
        try {
            const updatedRecommendation = await this.wlbService.updateRecommendationStatus(userId, recommendationId);
            return res.status(200).json(updatedRecommendation);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
            return res.status(500).json({ error: errorMessage });
        }
    }
    deleteUserProgress(req, res, next) {
        try {
            const userId = Number(req.user?.id);
            const deletedProgress = this.wlbService.deleteUserProgress(userId);
            res.status(200).json(deletedProgress);
            return;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
            res.status(500).json({ error: errorMessage });
            return;
        }
    }
    async analyzeWlbAnswers(req, res, next) {
        const body = req.body;
        const answers = body?.answers;
        const isStudent = body?.isStudent || false;
        const userId = Number(req.user?.id);
        const result = await this.wlbService.analyzeAndSaveWlbAnswer({
            answers,
            isStudent,
            userId,
        });
        return res.status(200).json(result);
    }
    async recalculateWlbScores(req, res, next) {
        try {
            const userId = Number(req.user?.id);
            const progress = req.body.progress;
            const result = await this.wlbService.recalculateWlbScore(progress, userId);
            res.status(200).json(result);
            return;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
            res.status(500).json({ error: errorMessage });
            return;
        }
    }
}
exports.WlbController = WlbController;
