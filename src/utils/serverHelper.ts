import "server-only"

import { SecretManagerServiceClient } from "@google-cloud/secret-manager"

const client = new SecretManagerServiceClient()
const cache: Record<string, string> = {}

// GET SECRETS FROM GOOGLE SECRET MANAGER
export async function getSecret(name: string) {

  if (cache[name]) return cache[name]

  const [version] = await client.accessSecretVersion({
    
    name: `projects/651357981664/secrets/${name}/versions/1`,
  })

  const value = version.payload?.data?.toString() || ""
  cache[name] = value
  return value
}