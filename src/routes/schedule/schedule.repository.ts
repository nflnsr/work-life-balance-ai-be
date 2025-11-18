import { prisma } from "@/utils/prisma";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Category, Looping } from "@prisma/client";

dayjs.extend(utc);
dayjs.extend(timezone);

export class ScheduleRepository {
  async getSchedules() {
    try {
      return await prisma.schedule.findMany();
    } catch (error) {
      console.error("Error fetching schedules:", error);
      throw error;
    }
  }

  async getSchedulesToday(userId: number) {
    try {
      const nowJakarta = dayjs().tz("Asia/Jakarta");
      const startOfDay = nowJakarta.startOf("day").toDate();
      const endOfDay = nowJakarta.endOf("day").toDate();

      const day = nowJakarta.day();
      const isWeekend = day === 0 || day === 6;
      const loopingFilter = isWeekend ? "WEEKENDS" : "WEEKDAYS";
      const oppositeLooping = isWeekend ? "WEEKDAYS" : "WEEKENDS";

      const schedules = await prisma.schedule.findMany({
        where: {
          userId: userId,
          items: {
            some: {
              OR: [
                {
                  AND: [
                    {
                      createdAt: {
                        gte: startOfDay,
                        lt: endOfDay,
                      },
                    },
                    {
                      OR: [
                        { looping: null },
                        {
                          NOT: {
                            looping: oppositeLooping,
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  looping: {
                    in: ["EVERYDAY", loopingFilter],
                  },
                },
              ],
            },
          },
        },
        include: {
          items: {
            where: {
              OR: [
                {
                  AND: [
                    {
                      createdAt: {
                        gte: startOfDay,
                        lt: endOfDay,
                      },
                    },
                    {
                      OR: [
                        { looping: null },
                        {
                          NOT: {
                            looping: oppositeLooping,
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  looping: {
                    in: ["EVERYDAY", loopingFilter],
                  },
                },
              ],
            },
          },
        },
      });
      const allItems = schedules.flatMap((s) => s.items);

      const sortedItems = allItems.sort((a: any, b: any) => {
        const timeA = new Date(a.time);
        const timeB = new Date(b.time);

        const minutesA = timeA.getHours() * 60 + timeA.getMinutes();
        const minutesB = timeB.getHours() * 60 + timeB.getMinutes();

        return minutesA - minutesB;
      });
      return sortedItems;
    } catch (error) {
      console.error("Error fetching schedules for today:", error);
      throw error;
    }
  }

  async getSchedulesByUserId(user: any) {
    try {
      const schedules = await prisma.schedule.findMany({
        where: {
          userId: user.userId,
        },
        include: {
          items: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
      return schedules;
    } catch (error) {
      console.error("Error fetching schedules by user:", error);
      throw error;
    }
  }

  async createSchedule(data: {
    userId: number;
    desc: string;
    looping?: Looping;
    category: Category;
    time: Date;
  }) {
    try {
      const nowJakarta = dayjs().tz("Asia/Jakarta");
      const startOfDay = nowJakarta.startOf("day").utc().toDate();
      const endOfDay = nowJakarta.endOf("day").utc().toDate();

      let schedule = await prisma.schedule.findFirst({
        where: {
          userId: data.userId,
          date: {
            gte: startOfDay,
            lt: endOfDay,
          },
        },
      });

      if (!schedule) {
        schedule = await prisma.schedule.create({
          data: {
            userId: data.userId,
            date: nowJakarta.utc().toDate(),
          },
        });
      }

      const scheduleItem = await prisma.scheduleItem.create({
        data: {
          scheduleId: schedule.id,
          desc: data.desc,
          time: dayjs(data.time).tz("Asia/Jakarta").utc().toDate(),
          category: data.category,
          looping: data.looping,
        },
      });

      return {
        ...scheduleItem,
        time: dayjs(scheduleItem.time).tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss"),
        createdAt: dayjs(scheduleItem.createdAt).tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss"),
      };
    } catch (error) {
      console.error("Error creating schedule:", error);
      throw error;
    }
  }
}
