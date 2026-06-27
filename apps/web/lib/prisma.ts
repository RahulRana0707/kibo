import { PrismaClient as PrismaClientClass } from "@/lib/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

type AppPrismaClient = InstanceType<typeof PrismaClientClass>

const globalForPrisma = globalThis as unknown as {
  pool?: Pool
  prisma?: AppPrismaClient
}

const pool =
  globalForPrisma.pool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  })

const adapter = new PrismaPg(pool)

export const prisma: AppPrismaClient =
  globalForPrisma.prisma ?? new PrismaClientClass({ adapter })

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.pool = pool
  globalForPrisma.prisma = prisma
}
