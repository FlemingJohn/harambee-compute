// Usage: node client.mjs <topic> [howMany]
//        node client.mjs --urls 127.0.0.1:5001,127.0.0.1:5002   (skip discovery; one device per server)
// Discovers RPC servers on <topic>, splits a model's layers across them, and generates text.
import {
  discoverRpcServers, getRpcDeviceMap, loadModel, completion, unloadModel, close,
  LLAMA_3_2_1B_INST_Q4_0
} from '@qvac/sdk'

const [topic = 'harambee-test', howMany = '2'] = process.argv.slice(2)
let modelId
try {
  const t0 = Date.now()
  const found = topic === '--urls'
    ? howMany.split(',').map((url) => ({ url, rdmaAvailable: false, devices: [{ index: 0, freeMemory: 0, totalMemory: 0 }] }))
    : await discoverRpcServers({ topic, timeoutMs: 10000 })
  console.log(`DISCOVERED ${found.length} server(s) in ${Date.now() - t0} ms`)
  for (const s of found) {
    console.log(`  ${s.url} rdma=${s.rdmaAvailable} devices=` +
      JSON.stringify(s.devices.map((d) => ({ i: d.index, freeMB: Math.round(d.freeMemory / 2 ** 20), totalMB: Math.round(d.totalMemory / 2 ** 20) }))))
  }
  const selected = found.sort((a, b) => a.url.localeCompare(b.url)).slice(0, topic === '--urls' ? undefined : Number(howMany))
  if (selected.length === 0) throw new Error('No RPC servers found')

  const devices = getRpcDeviceMap(selected)
  console.log('DEVICE MAP', JSON.stringify(devices))

  const t1 = Date.now()
  modelId = await loadModel({
    modelSrc: LLAMA_3_2_1B_INST_Q4_0,
    modelConfig: {
      device: 'gpu',
      'rpc-servers': selected.map((s) => s.url).join(','),
      devices: devices.map((d) => d.alias).join(','),
      'split-mode': 'layer',
      'tensor-split': devices.map(() => '1').join(',')
    },
    onProgress: (p) => process.stdout.write(`\rDOWNLOAD ${p.percentage.toFixed(0)}%   `)
  })
  console.log(`\nLOADED ${modelId} across ${selected.length} server(s) in ${Date.now() - t1} ms`)

  const t2 = Date.now()
  let tokens = 0
  const run = completion({
    modelId,
    history: [{ role: 'user', content: 'In one sentence, what does "harambee" mean?' }],
    stream: true
  })
  process.stdout.write('OUTPUT: ')
  for await (const token of run.tokenStream) { tokens++; process.stdout.write(token) }
  const secs = (Date.now() - t2) / 1000
  console.log(`\nGENERATED ${tokens} tokens in ${secs.toFixed(1)} s (${(tokens / secs).toFixed(1)} tok/s)`)
} catch (err) {
  console.error('\nCLIENT FAILED', err)
  process.exitCode = 1
} finally {
  if (modelId) await unloadModel({ modelId }).catch((e) => console.error('unload failed', e))
  await close()
}
