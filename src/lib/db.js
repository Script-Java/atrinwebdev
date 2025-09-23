import { PrismaClient } from "@prisma/client";

const g = globalThis;
export const prisma = g.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query","error","warn"] : ["error"],
});
if (process.env.NODE_ENV !== "production") g.prisma = prisma;
