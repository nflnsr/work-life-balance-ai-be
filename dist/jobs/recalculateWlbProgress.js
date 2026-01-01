"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const wlb_service_1 = require("@/routes/wlb/wlb.service");
const wlb_repository_1 = require("@/routes/wlb/wlb.repository");
const wlbRepository = new wlb_repository_1.WlbRepository();
const wlbService = new wlb_service_1.WlbService(wlbRepository);
node_cron_1.default.schedule("00 01 * * *", async () => {
    try {
        console.log("Running recalculate job");
        const usersToRecalculate = await wlbService.getUsersByRecalculateProgress(true);
        for (const user of usersToRecalculate) {
            console.log(`Recalculating WLB for user ${user.id} - ${user.email}`);
            const latestProgress = (await wlbService.getLatestWlbUser(user.id));
            if (latestProgress) {
                await wlbService.recalculateWlbScore(latestProgress, user.id);
                console.log("Success recalculating WLB");
                await wlbService.updateRecalculateProgressFlag(user.id, false);
            }
        }
        const userToNotRecalculate = await wlbService.getUsersByRecalculateProgress(false);
        for (const user of userToNotRecalculate) {
            await wlbService.insertLatestWlbProgress(user.id);
            console.log(`Inserted latest WLB progress for user ${user.id} - ${user.email}`);
        }
    }
    catch (error) {
        console.error("Error during WLB recalculation job:", error);
    }
}, {
    timezone: "Asia/Jakarta",
});
