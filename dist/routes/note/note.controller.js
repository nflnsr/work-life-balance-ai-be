"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteController = void 0;
class NoteController {
    noteService;
    constructor(noteService) {
        this.noteService = noteService;
    }
    async getNotes(req, res, next) {
        try {
            const note = await this.noteService.getNotes();
            res.status(200).json(note);
            return;
        }
        catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
    }
    async getNotesByUserId(req, res, next) {
        try {
            const userId = Number(req.user?.id);
            const note = await this.noteService.getNotesByUserId({ userId });
            res.status(200).json(note);
            return;
        }
        catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
    }
    async createNote(req, res, next) {
        try {
            const userId = Number(req.user?.id);
            const content = req.body.content;
            const newNote = await this.noteService.createNote({ userId, content });
            res.status(201).json(newNote);
            return;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
            res.status(500).json({ error: errorMessage });
            return;
        }
    }
}
exports.NoteController = NoteController;
