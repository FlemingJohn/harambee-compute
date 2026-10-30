import { createReadStream, existsSync, statSync } from 'node:fs'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { extname, join, normalize, resolve } from 'node:path'

const contentTypes: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
}

export function serveStaticFile(pagesPath: string, request: IncomingMessage, response: ServerResponse): void {
  const root = resolve(pagesPath)
  const requestedPath = decodeURIComponent(new URL(request.url ?? '/', 'http://127.0.0.1').pathname)
  const candidate = resolve(join(root, normalize(requestedPath)))
  const isInside = candidate.startsWith(root)
  const filePath = isInside && existsSync(candidate) && statSync(candidate).isFile() ? candidate : join(root, 'index.html')
  if (!existsSync(filePath)) {
    response.writeHead(404).end('Build the screens first with npm run build')
    return
  }
  response.writeHead(200, { 'content-type': contentTypes[extname(filePath)] ?? 'application/octet-stream' })
  createReadStream(filePath).pipe(response)
}
