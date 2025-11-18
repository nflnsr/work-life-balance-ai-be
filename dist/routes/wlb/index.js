"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { wlbenticate } from "~/middleware/wlbenticate";
const wlb_repository_1 = require("./wlb.repository");
const wlb_service_1 = require("./wlb.service");
const wlb_controller_1 = require("./wlb.controller");
const authenticate_1 = require("@/middleware/authenticate");
const router = (0, express_1.Router)();
const wlbRepository = new wlb_repository_1.WlbRepository();
const wlbService = new wlb_service_1.WlbService(wlbRepository);
const wlbController = new wlb_controller_1.WlbController(wlbService);
router.get("/today", authenticate_1.authenticate, (req, res, next) => {
    return wlbController.getWlbUserToday(req, res, next);
});
router.get("/latest", authenticate_1.authenticate, (req, res, next) => {
    return wlbController.getLatestWlbUser(req, res, next);
});
router.get("/history", authenticate_1.authenticate, (req, res, next) => {
    return wlbController.getWlbUserHistory(req, res, next);
});
router.patch("/recommendation/:recommendationId", authenticate_1.authenticate, (req, res, next) => {
    return wlbController.updateRecommendationStatus(req, res, next);
});
router.delete("/progress", authenticate_1.authenticate, (req, res, next) => {
    return wlbController.deleteUserProgress(req, res, next);
});
router.post("/analyze", authenticate_1.authenticate, (req, res, next) => {
    return wlbController.analyzeWlbAnswers(req, res, next);
});
router.post("/recalculate", authenticate_1.authenticate, (req, res, next) => {
    return wlbController.recalculateWlbScores(req, res, next);
});
exports.default = router;
