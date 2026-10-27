export function getDeviceClass(position: number): string {
  return `device-${(position % 3) + 1}`
}
