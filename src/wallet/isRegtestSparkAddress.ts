const regtestSparkAddress = /^sparkrt1[023456789acdefghjklmnpqrstuvwxyz]{40,}$/

export function isRegtestSparkAddress(address: string): boolean {
  return regtestSparkAddress.test(address)
}
