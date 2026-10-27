import type { Duplex } from 'node:stream'

export function pipeStreams(first: Duplex, second: Duplex): void {
  first.pipe(second).pipe(first)
  const closeBoth = () => {
    first.destroy()
    second.destroy()
  }
  first.on('error', closeBoth)
  second.on('error', closeBoth)
  first.on('close', closeBoth)
  second.on('close', closeBoth)
}
