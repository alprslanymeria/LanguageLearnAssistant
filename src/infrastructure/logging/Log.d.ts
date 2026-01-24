export type LogLevel = 'error' | 'warn' | 'info' | 'debug' | 'trace'

export interface ElasticLogOptions {
  index: string
  node: string
  esVersion: number
  flushBytes: number
}