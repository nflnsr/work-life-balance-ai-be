type Note = {
  id: number;
  date: string;
  items: NoteItem[];
}

type NoteItem = {
  id: number;
  content: string;
};

export type { Note, NoteItem };