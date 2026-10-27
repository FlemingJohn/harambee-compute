import type { ClientCommand } from '../types/ClientCommand.ts'
import type { CoordinatorRuntime } from '../types/CoordinatorRuntime.ts'
import { answerQuestion } from './answerQuestion.ts'
import { approveDevice } from './approveDevice.ts'
import { loadModelOnPool } from './loadModelOnPool.ts'
import { payHelpers } from './payHelpers.ts'
import { rejectDevice } from './rejectDevice.ts'
import { removeDevice } from './removeDevice.ts'

export function handleClientCommand(runtime: CoordinatorRuntime, command: ClientCommand): Promise<void> | void {
  switch (command.type) {
    case 'approve-device':
      return approveDevice(runtime, command.deviceId)
    case 'reject-device':
      return rejectDevice(runtime, command.deviceId)
    case 'remove-device':
      return removeDevice(runtime, command.deviceId)
    case 'load-model':
      return loadModelOnPool(runtime, command.modelName)
    case 'ask':
      return answerQuestion(runtime, command.question)
    case 'send-payouts':
      return payHelpers(runtime)
  }
}
