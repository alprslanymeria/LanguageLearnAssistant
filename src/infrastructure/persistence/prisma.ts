// IMPORTS
import { PrismaMssql } from '@prisma/adapter-mssql'
import { PrismaClient } from '@/src/generated/prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const sqlConfig = {

  user: "sa",
  password: "3156236845",
  database: "languageAssistant",
  server: "localhost",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
}

const adapter = new PrismaMssql(sqlConfig)


export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma