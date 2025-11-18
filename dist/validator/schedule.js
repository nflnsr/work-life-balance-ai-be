"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleItemSchema = void 0;
const zod_1 = require("zod");
exports.scheduleItemSchema = zod_1.z.object({
    desc: zod_1.z.string().min(1, "Description is required"),
    time: zod_1.z.union([zod_1.z.string(), zod_1.z.date()]).transform(v => new Date(v)),
    looping: zod_1.z.enum(["EVERYDAY", "WEEKDAYS", "WEEKENDS"]).optional().nullable(),
    category: zod_1.z.enum(["WORK_ACTIVITY", "PERSONAL_TIME", "SELF_DEVELOPMENT"]),
});
