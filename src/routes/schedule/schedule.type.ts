type Schedule = {
  id: number;
  date: string;
  items: ScheduleItem[];
};

type ScheduleItem = {
  id: number;
  desc: string;
  looping: Looping;
  category: Category;
  time: Date;
};

// enum Looping {
//   EVERYDAY = "everyday",
//   WEEKDAYS = "weekdays",
//   WEEKENDS = "weekends",
// }

// enum Category {
//   PERSONAL_TIME = "personal_time",
//   WORK_ACTIVITY = "work_activity",
//   SELF_DEVELOPMENT = "self_development",
// }

 type Looping = "everyday" | "weekdays" | "weekends";
 type Category = "personal_time" | "work_activity" | "self_development";

export type { Schedule, ScheduleItem, Looping, Category };
