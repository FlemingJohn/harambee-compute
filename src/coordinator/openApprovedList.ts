import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'

export function openApprovedList(listPath: string) {
  const approvedIds = new Set<string>(existsSync(listPath) ? (JSON.parse(readFileSync(listPath, 'utf8')) as string[]) : [])
  const save = () => {
    mkdirSync(dirname(listPath), { recursive: true })
    writeFileSync(listPath, JSON.stringify([...approvedIds]))
  }
  return {
    has: (deviceId: string) => approvedIds.has(deviceId),
    add: (deviceId: string) => {
      approvedIds.add(deviceId)
      save()
    },
    remove: (deviceId: string) => {
      approvedIds.delete(deviceId)
      save()
    }
  }
}
