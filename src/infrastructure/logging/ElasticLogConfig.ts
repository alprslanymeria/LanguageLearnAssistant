// IMPORTS
import { ElasticLogOptions } from "@/src/infrastructure/logging/Log"

export class ElasticLogConfig {

  static load(): ElasticLogOptions {

    const index = process.env.ELASTIC_INDEX
    const node = process.env.ELASTIC_URL

    if (!index) throw new Error("Missing required environment variable: ELASTIC_INDEX")
    if (!node) throw new Error("Missing required environment variable: ELASTIC_URL")

    return {
      index,
      node,
      esVersion: 8,
      flushBytes: 1000
    }
  }
}