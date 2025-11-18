"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteService = void 0;
class NoteService {
    noteRepository;
    constructor(noteRepository) {
        this.noteRepository = noteRepository;
    }
    async getNotes() {
        return await this.noteRepository.getNotes();
    }
    async getNotesByUserId(auth) {
        return await this.noteRepository.getNotesByUserId(auth);
    }
    async createNote(data) {
        return await this.noteRepository.createNote(data);
    }
}
exports.NoteService = NoteService;
