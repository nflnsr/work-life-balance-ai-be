import user from "./user"
import note from "./note"
import schedule from "./schedule"
import questionnaire from "./questionnaire"
// import permission from "./auth"
// import role from "./role"
import { Router } from "express";
import gemini from "./gemini";

const router = Router();

router.use("/api/user", user);
router.use("/api/note", note);
router.use("/api/schedule", schedule);
router.use("/api/questionnaire", questionnaire);
router.use("/api/gemini", gemini);
// router.use("/api/permission", permission);
// router.use("/api/role", role);

export default router;