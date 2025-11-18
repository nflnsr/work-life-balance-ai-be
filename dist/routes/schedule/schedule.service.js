"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleService = void 0;
class ScheduleService {
    scheduleRepository;
    constructor(scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }
    async getSchedules() {
        return await this.scheduleRepository.getSchedules();
    }
    async getSchedulesToday(userId) {
        return await this.scheduleRepository.getSchedulesToday(userId);
    }
    async getSchedulesByUserId(userId) {
        return await this.scheduleRepository.getSchedulesByUserId(userId);
    }
    async createSchedule(data) {
        return await this.scheduleRepository.createSchedule(data);
    }
}
exports.ScheduleService = ScheduleService;
