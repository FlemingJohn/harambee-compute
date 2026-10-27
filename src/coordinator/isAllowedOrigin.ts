const developmentPort = 5173

export function isAllowedOrigin(origin: string | undefined, webPort: number): boolean {
  if (!origin) return false
  return [webPort, developmentPort].some((port) => origin === `http://127.0.0.1:${port}` || origin === `http://localhost:${port}`)
}
