import { Request, Response, NextFunction } from "express";
import { NoteService } from "./note.service";

export class NoteController {
  private noteService: NoteService;

  constructor(noteService: NoteService) {
    this.noteService = noteService;
  }

  async getNotes(req: Request, res: Response, next: NextFunction) {
    try {
      const note = await this.noteService.getNotes();

      res.status(200).json(note);
      return;
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  }

  async getNotesByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.user?.id);
      const note = await this.noteService.getNotesByUserId({ userId });
      res.status(200).json(note);
      return;
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  }

  async createNote(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.user?.id);
      const content = req.body.content;
      const newNote = await this.noteService.createNote({ userId, content });

      res.status(201).json(newNote);
      return;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
      
      res.status(500).json({ error: errorMessage });
      return;
    }
  }
}
