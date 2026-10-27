export type ClientCommand =
  | { type: 'approve-device'; deviceId: string }
  | { type: 'reject-device'; deviceId: string }
  | { type: 'remove-device'; deviceId: string }
  | { type: 'load-model'; modelName: string }
  | { type: 'ask'; question: string }
  | { type: 'send-payouts' }
