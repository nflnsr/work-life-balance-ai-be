"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { scheduleenticate } from "~/middleware/scheduleenticate";
const schedule_repository_1 = require("./schedule.repository");
const schedule_service_1 = require("./schedule.service");
const schedule_controller_1 = require("./schedule.controller");
const authenticate_1 = require("@/middleware/authenticate");
const validate_1 = require("@/middleware/validate");
const schedule_1 = require("@/validator/schedule");
const router = (0, express_1.Router)();
const scheduleRepository = new schedule_repository_1.ScheduleRepository();
const scheduleService = new schedule_service_1.ScheduleService(scheduleRepository);
const scheduleController = new schedule_controller_1.ScheduleController(scheduleService);
router.get("/", authenticate_1.authenticate, (req, res, next) => {
    return scheduleController.getSchedules(req, res, next);
});
router.get("/today", authenticate_1.authenticate, (req, res, next) => {
    return scheduleController.getSchedulesToday(req, res, next);
});
router.get("/me", authenticate_1.authenticate, (req, res, next) => {
    return scheduleController.getSchedulesByUserId(req, res, next);
});
router.post("/", authenticate_1.authenticate, (0, validate_1.validate)(schedule_1.scheduleItemSchema), (req, res, next) => {
    return scheduleController.createSchedule(req, res, next);
});
exports.default = router;
