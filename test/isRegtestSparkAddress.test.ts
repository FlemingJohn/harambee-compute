import assert from 'node:assert/strict'
import { test } from 'node:test'
import { isRegtestSparkAddress } from '../src/wallet/isRegtestSparkAddress.ts'

const realAddress = 'sparkrt1pgss89ywsn0vn65atfscz8qc2u0pagg3zqjhnmjvculny3uypz73quhqsdtyll'

test('accepts a real REGTEST Spark address and refuses anything else', () => {
  assert.equal(isRegtestSparkAddress(realAddress), true)
  assert.equal(isRegtestSparkAddress(realAddress.replace('sparkrt1', 'sp1')), false)
  assert.equal(isRegtestSparkAddress('sparkrt1short'), false)
  assert.equal(isRegtestSparkAddress(realAddress.toUpperCase()), false)
  assert.equal(isRegtestSparkAddress(''), false)
})
