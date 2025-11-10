import { Router, Request, Response, NextFunction } from "express";
// import { noteenticate } from "~/middleware/noteenticate";
import { NoteRepository } from "./note.repository";
import { NoteService } from "./note.service";
import { NoteController } from "./note.controller";
import { authenticate } from "@/middleware/authenticate";

const router = Router();

const noteRepository = new NoteRepository();
const noteService = new NoteService(noteRepository);
const noteController = new NoteController(noteService);

router.get("/", authenticate, (req: Request, res: Response, next: NextFunction) => {
  return noteController.getNotes(req, res, next);
});

router.get("/me", authenticate, (req: Request, res: Response, next: NextFunction) => {
  return noteController.getNotesByUserId(req, res, next);
});

router.post("/", authenticate, (req: Request, res: Response, next: NextFunction) => {
  return noteController.createNote(req, res, next);
});

export default router;
