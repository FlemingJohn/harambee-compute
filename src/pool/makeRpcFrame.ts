export function makeRpcFrame(command: number, payload: Buffer): Buffer {
  const frame = Buffer.alloc(9 + payload.length)
  frame.writeUInt8(command, 0)
  frame.writeBigUInt64LE(BigInt(payload.length), 1)
  payload.copy(frame, 9)
  return frame
}
