import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const PrismaError = Prisma.PrismaClientKnownRequestError;

export { prisma, PrismaError };
