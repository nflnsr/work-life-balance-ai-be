// import { Note, NoteItem } from "./note.type";
import { NoteRepository } from "./note.repository";

export class NoteService {
  private noteRepository: NoteRepository;

  constructor(noteRepository: NoteRepository) {
    this.noteRepository = noteRepository;
  }

  async getNotes() {
    return await this.noteRepository.getNotes();
  }

  async getNotesByUserId(auth: any) {
    return await this.noteRepository.getNotesByUserId(auth);
  }

  async createNote(data: { userId: number; content: string }) {
    return await this.noteRepository.createNote(data);
  }
}
