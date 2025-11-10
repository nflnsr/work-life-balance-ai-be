import { Router, Request, Response, NextFunction } from "express";
// import { scheduleenticate } from "~/middleware/scheduleenticate";
import { ScheduleRepository } from "./schedule.repository";
import { ScheduleService } from "./schedule.service";
import { ScheduleController } from "./schedule.controller";
import { authenticate } from "@/middleware/authenticate";
import { validate } from "@/middleware/validate";
import { scheduleItemSchema } from "@/validator/schedule";

const router = Router();

const scheduleRepository = new ScheduleRepository();
const scheduleService = new ScheduleService(scheduleRepository);
const scheduleController = new ScheduleController(scheduleService);

router.get("/", authenticate, (req: Request, res: Response, next: NextFunction) => {
  return scheduleController.getSchedules(req, res, next);
});

router.get("/today", authenticate, (req: Request, res: Response, next: NextFunction) => {
  return scheduleController.getSchedulesToday(req, res, next);
});

router.get("/me", authenticate, (req: Request, res: Response, next: NextFunction) => {
  return scheduleController.getSchedulesByUserId(req, res, next);
});

router.post("/", authenticate, validate(scheduleItemSchema), (req: Request, res: Response, next: NextFunction) => {
  return scheduleController.createSchedule(req, res, next);
});

export default router;
