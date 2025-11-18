"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteRepository = void 0;
const prisma_1 = require("@/utils/prisma");
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
class NoteRepository {
    async getNotes() {
        try {
            return await prisma_1.prisma.note.findMany();
        }
        catch (error) {
            console.error("Error fetching notes:", error);
            throw error;
        }
    }
    async getNotesByUserId(user) {
        try {
            const notes = await prisma_1.prisma.note.findMany({
                where: {
                    userId: user.userId,
                },
                include: {
                    items: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
            return notes;
        }
        catch (error) {
            console.error("Error fetching notes by user:", error);
            throw error;
        }
    }
    async createNote(data) {
        try {
            const nowJakarta = (0, dayjs_1.default)().tz("Asia/Jakarta");
            const startOfDay = nowJakarta.startOf("day").toDate();
            const endOfDay = nowJakarta.endOf("day").toDate();
            let note = await prisma_1.prisma.note.findFirst({
                where: {
                    userId: data.userId,
                    date: {
                        gte: startOfDay,
                        lt: endOfDay,
                    },
                },
            });
            if (!note) {
                note = await prisma_1.prisma.note.create({
                    data: {
                        userId: data.userId,
                        date: startOfDay,
                    },
                });
            }
            const noteItem = await prisma_1.prisma.noteItem.create({
                data: {
                    content: data.content,
                    noteId: note.id,
                },
            });
            return noteItem;
        }
        catch (error) {
            console.error("Error creating note:", error);
            throw error;
        }
    }
}
exports.NoteRepository = NoteRepository;
