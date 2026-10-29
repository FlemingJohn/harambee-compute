export function describeLoadError(modelName: string, message: string, isDownloaded: boolean): string {
  if (isDownloaded) return `Loading failed: ${message}`
  return `${modelName} is not downloaded on this laptop yet. Connect to the internet once and load it, then it works offline. (${message})`
}
