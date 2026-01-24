// IMPORTS
import { PrismaMssql } from '@prisma/adapter-mssql'
import { PrismaClient } from '@/src/generated/prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const sqlConfig = {

  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  server: process.env.HOST,
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