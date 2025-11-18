"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleRepository = void 0;
const prisma_1 = require("@/utils/prisma");
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
class ScheduleRepository {
    async getSchedules() {
        try {
            return await prisma_1.prisma.schedule.findMany();
        }
        catch (error) {
            console.error("Error fetching schedules:", error);
            throw error;
        }
    }
    async getSchedulesToday(userId) {
        try {
            const nowJakarta = (0, dayjs_1.default)().tz("Asia/Jakarta");
            const startOfDay = nowJakarta.startOf("day").toDate();
            const endOfDay = nowJakarta.endOf("day").toDate();
            const day = nowJakarta.day();
            const isWeekend = day === 0 || day === 6;
            const loopingFilter = isWeekend ? "WEEKENDS" : "WEEKDAYS";
            const oppositeLooping = isWeekend ? "WEEKDAYS" : "WEEKENDS";
            const schedules = await prisma_1.prisma.schedule.findMany({
                where: {
                    userId: userId,
                    items: {
                        some: {
                            OR: [
                                {
                                    AND: [
                                        {
                                            createdAt: {
                                                gte: startOfDay,
                                                lt: endOfDay,
                                            },
                                        },
                                        {
                                            OR: [
                                                { looping: null },
                                                {
                                                    NOT: {
                                                        looping: oppositeLooping,
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    looping: {
                                        in: ["EVERYDAY", loopingFilter],
                                    },
                                },
                            ],
                        },
                    },
                },
                include: {
                    items: {
                        where: {
                            OR: [
                                {
                                    AND: [
                                        {
                                            createdAt: {
                                                gte: startOfDay,
                                                lt: endOfDay,
                                            },
                                        },
                                        {
                                            OR: [
                                                { looping: null },
                                                {
                                                    NOT: {
                                                        looping: oppositeLooping,
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    looping: {
                                        in: ["EVERYDAY", loopingFilter],
                                    },
                                },
                            ],
                        },
                    },
                },
            });
            const allItems = schedules.flatMap((s) => s.items);
            const sortedItems = allItems.sort((a, b) => {
                const timeA = new Date(a.time);
                const timeB = new Date(b.time);
                const minutesA = timeA.getHours() * 60 + timeA.getMinutes();
                const minutesB = timeB.getHours() * 60 + timeB.getMinutes();
                return minutesA - minutesB;
            });
            return sortedItems;
        }
        catch (error) {
            console.error("Error fetching schedules for today:", error);
            throw error;
        }
    }
    async getSchedulesByUserId(user) {
        try {
            const schedules = await prisma_1.prisma.schedule.findMany({
                where: {
                    userId: user.userId,
                },
                include: {
                    items: true,
                },
                orderBy: {
                    createdAt: "asc",
                },
            });
            return schedules;
        }
        catch (error) {
            console.error("Error fetching schedules by user:", error);
            throw error;
        }
    }
    async createSchedule(data) {
        try {
            const nowJakarta = (0, dayjs_1.default)().tz("Asia/Jakarta");
            const startOfDay = nowJakarta.startOf("day").utc().toDate();
            const endOfDay = nowJakarta.endOf("day").utc().toDate();
            let schedule = await prisma_1.prisma.schedule.findFirst({
                where: {
                    userId: data.userId,
                    date: {
                        gte: startOfDay,
                        lt: endOfDay,
                    },
                },
            });
            if (!schedule) {
                schedule = await prisma_1.prisma.schedule.create({
                    data: {
                        userId: data.userId,
                        date: nowJakarta.utc().toDate(),
                    },
                });
            }
            const scheduleItem = await prisma_1.prisma.scheduleItem.create({
                data: {
                    scheduleId: schedule.id,
                    desc: data.desc,
                    time: (0, dayjs_1.default)(data.time).tz("Asia/Jakarta").utc().toDate(),
                    category: data.category,
                    looping: data.looping,
                },
            });
            return {
                ...scheduleItem,
                time: (0, dayjs_1.default)(scheduleItem.time).tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss"),
                createdAt: (0, dayjs_1.default)(scheduleItem.createdAt).tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss"),
            };
        }
        catch (error) {
            console.error("Error creating schedule:", error);
            throw error;
        }
    }
}
exports.ScheduleRepository = ScheduleRepository;
