import "server-only"

import { SecretManagerServiceClient } from "@google-cloud/secret-manager"

const client = new SecretManagerServiceClient()
const cache: Record<string, string> = {}

// GET SECRETS FROM GOOGLE SECRET MANAGER
export async function getSecret(name: string) {

  if (cache[name]) return cache[name]

  const projectId = process.env.GCP_PROJECT_ID

  const [version] = await client.accessSecretVersion({
    
    name: `projects/${projectId}/secrets/${name}/versions/latest`,
  })

  const value = version.payload?.data?.toString() || ""
  cache[name] = value
  return value
}