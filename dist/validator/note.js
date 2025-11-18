"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteItemSchema = void 0;
const zod_1 = require("zod");
exports.noteItemSchema = zod_1.z.object({
    content: zod_1.z.string().min(1, "Content is required"),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
