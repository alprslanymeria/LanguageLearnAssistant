import "dotenv/config"
import { defineConfig, env } from "prisma/config"

const type = env("DATABASE_TYPE")
const url = type === "local" ? env("LOCAL_DATABASE_URL") : env("REMOTE_DATABASE_URL")

export default defineConfig({
  
  schema: "src/infrastructure/prisma/",
  migrations: {
    path: "src/infrastructure/prisma/migrations",
  },
  datasource: {
    url: url
  },
})
