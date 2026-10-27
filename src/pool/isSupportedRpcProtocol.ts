const supportedMajor = 111

export function isSupportedRpcProtocol(protocolVersion: string): boolean {
  return Number(protocolVersion.split('.')[0]) === supportedMajor
}
