"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionnaireAnswerSchema = void 0;
const zod_1 = require("zod");
exports.questionnaireAnswerSchema = zod_1.z.object({
    isStudent: zod_1.z.boolean(),
    answer: zod_1.z.array(zod_1.z.enum(["SANGAT_SETUJU", "KURANG_SETUJU", "NETRAL", "CUKUP_SETUJU", "SANGAT_TIDAK_SETUJU"])),
});
