export function removeThinking(text: string): string {
  const withoutFinishedThoughts = text.replace(/<think>[\s\S]*?<\/think>/g, '')
  const unfinishedStart = withoutFinishedThoughts.indexOf('<think>')
  const visible = unfinishedStart === -1 ? withoutFinishedThoughts : withoutFinishedThoughts.slice(0, unfinishedStart)
  return visible.trimStart()
}
