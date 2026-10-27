import { completion } from '@qvac/sdk'
import { removeThinking } from './removeThinking.ts'

const tutorInstructions =
  'You are a patient tutor for secondary school students in Kenya. Answer clearly in short paragraphs, using simple words and local examples.'

export async function streamAnswer(modelId: string, question: string, onText: (visibleText: string) => void) {
  const startedAt = Date.now()
  let rawText = ''
  let tokenCount = 0
  const run = completion({
    modelId,
    history: [
      { role: 'system', content: tutorInstructions },
      { role: 'user', content: `${question} /no_think` }
    ],
    stream: true
  })
  for await (const token of run.tokenStream) {
    rawText += token
    tokenCount += 1
    onText(removeThinking(rawText))
  }
  const seconds = Math.max(0.001, (Date.now() - startedAt) / 1000)
  return { answer: removeThinking(rawText), tokenCount, tokensPerSecond: tokenCount / seconds }
}
