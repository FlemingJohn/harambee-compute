import { randomUUID } from 'node:crypto'
import { streamAnswer } from '../inference/streamAnswer.ts'
import type { CoordinatorRuntime } from '../types/CoordinatorRuntime.ts'
import { recordWorkOrWarn } from './recordWorkOrWarn.ts'
import { recoverPool } from './recoverPool.ts'

export async function answerQuestion(runtime: CoordinatorRuntime, question: string): Promise<void> {
  const state = runtime.store.get()
  const modelId = runtime.modelId
  if (!modelId || state.isAnswering || question.trim() === '') return
  const answerId = randomUUID()
  runtime.store.update({
    isAnswering: true,
    chat: [...state.chat, { id: randomUUID(), author: 'student', text: question.trim() }, { id: answerId, author: 'pool', text: '' }]
  })
  let tokenCount = 0
  try {
    const result = await streamAnswer(modelId, question.trim(), (text) => showAnswer(runtime, answerId, text))
    showAnswer(runtime, answerId, result.answer)
    runtime.store.update({ isAnswering: false, tokensPerSecond: result.tokensPerSecond, tokenCount: result.tokenCount })
    tokenCount = result.tokenCount
  } catch {
    showAnswer(runtime, answerId, 'The pool lost a device while answering. Reloading on the devices that are left.')
    runtime.store.update({ isAnswering: false })
    await recoverPool(runtime, 'A device stopped answering')
    return
  }
  await recordWorkOrWarn(runtime, tokenCount)
}

function showAnswer(runtime: CoordinatorRuntime, answerId: string, text: string): void {
  const chat = runtime.store.get().chat.map((message) => (message.id === answerId ? { ...message, text } : message))
  runtime.store.update({ chat })
}
