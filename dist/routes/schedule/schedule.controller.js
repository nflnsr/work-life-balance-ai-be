"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleController = void 0;
class ScheduleController {
    scheduleService;
    constructor(scheduleService) {
        this.scheduleService = scheduleService;
    }
    async getSchedules(req, res, next) {
        try {
            const schedule = await this.scheduleService.getSchedules();
            res.status(200).json(schedule);
            return;
        }
        catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
    }
    async getSchedulesToday(req, res, next) {
        try {
            const userId = Number(req.user?.id);
            const schedule = await this.scheduleService.getSchedulesToday(userId);
            res.status(200).json(schedule);
            return;
        }
        catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
    }
    async getSchedulesByUserId(req, res, next) {
        try {
            const userId = Number(req.user?.id);
            const schedule = await this.scheduleService.getSchedulesByUserId(userId);
            res.status(200).json(schedule);
            return;
        }
        catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
    }
    async createSchedule(req, res, next) {
        try {
            const userId = Number(req.user?.id);
            const desc = req.body.desc;
            const looping = req.body.looping;
            const category = req.body.category;
            const time = req.body.time;
            const newSchedule = await this.scheduleService.createSchedule({
                userId,
                desc,
                looping,
                category,
                time: new Date(time),
            });
            res.status(201).json(newSchedule);
            return;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
            res.status(500).json({ error: errorMessage });
            return;
        }
    }
}
exports.ScheduleController = ScheduleController;
