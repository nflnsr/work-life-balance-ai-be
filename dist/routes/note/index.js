"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { noteenticate } from "~/middleware/noteenticate";
const note_repository_1 = require("./note.repository");
const note_service_1 = require("./note.service");
const note_controller_1 = require("./note.controller");
const authenticate_1 = require("@/middleware/authenticate");
const router = (0, express_1.Router)();
const noteRepository = new note_repository_1.NoteRepository();
const noteService = new note_service_1.NoteService(noteRepository);
const noteController = new note_controller_1.NoteController(noteService);
router.get("/", authenticate_1.authenticate, (req, res, next) => {
    return noteController.getNotes(req, res, next);
});
router.get("/me", authenticate_1.authenticate, (req, res, next) => {
    return noteController.getNotesByUserId(req, res, next);
});
router.post("/", authenticate_1.authenticate, (req, res, next) => {
    return noteController.createNote(req, res, next);
});
exports.default = router;
