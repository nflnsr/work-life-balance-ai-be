import cron from "node-cron";
import { WlbService } from "@/routes/wlb/wlb.service";
import { WlbRepository } from "@/routes/wlb/wlb.repository";
import { UserProgress } from "@/routes/wlb/wlb.type";

const wlbRepository = new WlbRepository();
const wlbService = new WlbService(wlbRepository);

cron.schedule(
  "00 01 * * *",
  async () => {
    try {
      console.log("Running recalculate job");
      const usersToRecalculate = await wlbService.getUsersByRecalculateProgress(true);
      for (const user of usersToRecalculate) {
        console.log(`Recalculating WLB for user ${user.id} - ${user.email}`);
        const latestProgress = (await wlbService.getLatestWlbUser(user.id)) as UserProgress;
        if (latestProgress) {
          await wlbService.recalculateWlbScore(latestProgress, user.id);
          await wlbService.updateRecalculateProgressFlag(user.id, false);
          console.log("Success recalculating WLB");
        }
      }
      const userToNotRecalculate = await wlbService.getUsersByRecalculateProgress(false);
      for (const user of userToNotRecalculate) {
        await wlbService.insertLatestWlbProgress(user.id);
        console.log(`Inserted latest WLB progress for user ${user.id} - ${user.email}`);
      }
    } catch (error) {
      console.error("Error during WLB recalculation job:", error);
    }
  },
  {
    timezone: "Asia/Jakarta",
  }
);
