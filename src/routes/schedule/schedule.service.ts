// import { Schedule, ScheduleItem } from "./schedule.type";
import { Category, Looping } from "@prisma/client";
import { ScheduleRepository } from "./schedule.repository";

export class ScheduleService {
  private scheduleRepository: ScheduleRepository;

  constructor(scheduleRepository: ScheduleRepository) {
    this.scheduleRepository = scheduleRepository;
  }

  async getSchedules() {
    return await this.scheduleRepository.getSchedules();
  }

  async getSchedulesToday(userId: number ) {
    return await this.scheduleRepository.getSchedulesToday(userId);
  }

  async getSchedulesByUserId(userId: number) {
    return await this.scheduleRepository.getSchedulesByUserId(userId);
  }

  async createSchedule(data: {
    userId: number;
    time: Date;
    desc: string;
    looping?: Looping;
    category: Category;
  }) {
    return await this.scheduleRepository.createSchedule(data);
  }
}
