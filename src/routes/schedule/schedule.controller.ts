import { Request, Response, NextFunction } from "express";
import { ScheduleService } from "./schedule.service";

export class ScheduleController {
  private scheduleService: ScheduleService;

  constructor(scheduleService: ScheduleService) {
    this.scheduleService = scheduleService;
  }

  async getSchedules(req: Request, res: Response, next: NextFunction) {
    try {
      const schedule = await this.scheduleService.getSchedules();

      res.status(200).json(schedule);
      return;
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  }

  async getSchedulesToday(req: Request, res: Response, next: NextFunction) {
    try {
      const schedule = await this.scheduleService.getSchedulesToday(req.user);
      res.status(200).json(schedule);
      return;
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  }

  async getSchedulesByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.user?.id);
      const schedule = await this.scheduleService.getSchedulesByUserId({ userId });
      res.status(200).json(schedule);
      return;
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  }

  async createSchedule(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.user?.id);
      const desc = req.body.desc;
      const looping = req.body.looping;
      const category = req.body.category;
      const time = req.body.time;

      const newSchedule = await this.scheduleService.createSchedule({
        userId,
        desc,
        looping,
        category,
        time: new Date(time),
      });

      console.log("New schedule created successfully:", newSchedule);
      res.status(201).json(newSchedule);
      return;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Internal Server Error";

      res.status(500).json({ error: errorMessage });
      return;
    }
  }
}
