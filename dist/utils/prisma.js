"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaError = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
const PrismaError = client_1.Prisma.PrismaClientKnownRequestError;
exports.PrismaError = PrismaError;
