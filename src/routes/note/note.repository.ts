import { prisma } from "@/utils/prisma";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export class NoteRepository {
  async getNotes() {
    try {
      return await prisma.note.findMany();
    } catch (error) {
      console.error("Error fetching notes:", error);
      throw error;
    }
  }

  async getNotesByUserId(user: any) {
    try {
      const notes = await prisma.note.findMany({
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
    } catch (error) {
      console.error("Error fetching notes by user:", error);
      throw error;
    }
  }

  async createNote(data: { userId: number; content: string }) {
    try {
      const nowJakarta = dayjs().tz("Asia/Jakarta");
      const startOfDay = nowJakarta.startOf("day").toDate();
      const endOfDay = nowJakarta.endOf("day").toDate();

      let note = await prisma.note.findFirst({
        where: {
          userId: data.userId,
          date: {
            gte: startOfDay,
            lt: endOfDay,
          },
        },
      });

      if (!note) {
        note = await prisma.note.create({
          data: {
            userId: data.userId,
            date: startOfDay,
          },
        });
      }

      const noteItem = await prisma.noteItem.create({
        data: {
          content: data.content,
          noteId: note.id,
        },
      });

      return noteItem;
    } catch (error) {
      console.error("Error creating note:", error);
      throw error;
    }
  }
}
