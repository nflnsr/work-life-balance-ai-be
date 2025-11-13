import user from "./user";
import note from "./note";
import schedule from "./schedule";
import questionnaire from "./questionnaire";
import { Router } from "express";
import gemini from "./wlb";

const router = Router();

router.use("/api/user", user);
router.use("/api/note", note);
router.use("/api/schedule", schedule);
router.use("/api/questionnaire", questionnaire);
router.use("/api/wlb", gemini);

export default router;
