export interface ApprovedList {
  has(deviceId: string): boolean
  add(deviceId: string): void
  remove(deviceId: string): void
}
