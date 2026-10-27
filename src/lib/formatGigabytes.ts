const bytesPerGigabyte = 1024 ** 3

export function formatGigabytes(bytes: number): string {
  return `${(bytes / bytesPerGigabyte).toFixed(1)} GB`
}
