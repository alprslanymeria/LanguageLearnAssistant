// IMPORTS
import { ElasticLogOptions } from "@/src/infrastructure/logging/Log"

export class ElasticLogConfig {

  static load(): ElasticLogOptions {

    return {
      index: process.env.ELASTIC_INDEX!,
      node: process.env.ELASTIC_URL!,
      esVersion: 8,
      flushBytes: 1000,
    }
  }
}