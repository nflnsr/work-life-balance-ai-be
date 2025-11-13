import { Router, Request, Response, NextFunction } from "express";
// import { wlbenticate } from "~/middleware/wlbenticate";
import { WlbRepository } from "./wlb.repository";
import { WlbService } from "./wlb.service";
import { WlbController } from "./wlb.controller";
import { authenticate } from "@/middleware/authenticate";

const router = Router();

const wlbRepository = new WlbRepository();
const wlbService = new WlbService(wlbRepository);
const wlbController = new WlbController(wlbService);

router.get("/today", authenticate, (req: Request, res: Response, next: NextFunction) => {
  return wlbController.getWlbUserToday(req, res, next);
});

router.get("/latest", authenticate, (req: Request, res: Response, next: NextFunction) => {
  return wlbController.getLatestWlbUser(req, res, next);
});

router.get("/history", authenticate, (req: Request, res: Response, next: NextFunction) => {
  return wlbController.getWlbUserHistory(req, res, next);
});

router.post("/analyze", authenticate, (req: Request, res: Response, next: NextFunction) => {
  return wlbController.analyzeWlbAnswers(req, res, next);
});

router.delete("/progress", authenticate, (req: Request, res: Response, next: NextFunction) => {
  return wlbController.deleteUserProgress(req, res, next);
});

export default router;
