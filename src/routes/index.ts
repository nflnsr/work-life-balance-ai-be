import user from "./user";
import note from "./note";
import schedule from "./schedule";
import questionnaire from "./questionnaire";
import wlb from "./wlb";
import chat from "./ai-chat";
import { Router } from "express";

const router = Router();

router.use("/api/user", user);
router.use("/api/note", note);
router.use("/api/schedule", schedule);
router.use("/api/questionnaire", questionnaire);
router.use("/api/wlb", wlb);
router.use("/api/chat", chat);

export default router;
