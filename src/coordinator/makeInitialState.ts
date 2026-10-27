import { modelCatalog } from '../inference/modelCatalog.ts'
import type { CoordinatorState } from '../types/CoordinatorState.ts'

export function makeInitialState(inviteCode: string, isSpreading: boolean): CoordinatorState {
  return {
    inviteCode,
    isSpreading,
    models: modelCatalog.map(({ name, layerCount, requiredBytes }) => ({ name, layerCount, requiredBytes })),
    devices: [],
    pendingDevices: [],
    modelName: modelCatalog[0]!.name,
    modelStatus: 'idle',
    modelMessage: 'No model loaded yet',
    allocation: null,
    chat: [],
    isAnswering: false,
    tokensPerSecond: 0,
    tokenCount: 0,
    earnings: [],
    ledger: [],
    wallet: { address: '', balanceSats: null, isOnline: false, lastError: '' }
  }
}
