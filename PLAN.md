# Harambee Compute

Pool the devices a school already owns into one private AI that runs on a
phone hotspot, and pay every device that helps.

Hackathon: AI Yako (QVAC). Track: On-Device Agentic Finance.
Deadline: Friday 30 October 2026, 14:00 UTC.

## Roles

- **Coordinator**: runs the model, the screens and the wallet that pays.
- **Helper**: lends its memory and compute by running a QVAC RPC server.
- **Student**: asks questions from a phone browser. Installs nothing.

## How a pool works

1. The coordinator creates a pool and shows an invite code.
2. Helpers join with the code over Hyperswarm, encrypted.
3. The coordinator reads each helper's free memory over the RPC protocol.
4. The model's layers are split by free memory, using the fewest devices that fit.
5. Questions go through every device holding layers. Answers stream back.
6. Each helper's work is written to a signed ledger.
7. When online, the coordinator pays each helper in sats with a WDK Spark wallet.

## Works offline

- Every answer, the layer split, device discovery, the ledger.

## Needs the internet

- Downloading a model the first time.
- Sending payouts on Spark REGTEST.

## Stack

| Part | Tool |
|---|---|
| Local AI and layer split | `@qvac/sdk`, `@qvac/ggml-rpc-server` |
| Device links | `hyperswarm`, `hyperdht` with a local bootstrap |
| Work ledger | `hypercore`, `corestore` |
| Payouts | `@tetherto/wdk-wallet-spark` on REGTEST |
| Screens | React and Vite, served by the coordinator on `127.0.0.1` |
| Language | TypeScript, run directly by Node 24 |

## Folders

- `src/types` one type per file
- `src/pool` finding devices, reading their memory, splitting layers, advice
- `src/server` the coordinator process and its WebSocket
- `src/components`, `src/hooks`, `src/styles` the screens
- `test` unit tests, run with `npm test`
- `spike` the first experiments with RPC servers

## Measured so far

| Setup | Load | Speed |
|---|---|---|
| Two servers on one laptop, Llama 3.2 1B | 15.8 s | 10.9 tok/s |
| Two servers on one Linux machine, Qwen3 0.6B | 31.5 s | 15.3 tok/s |
| Laptop and a far cloud server, Qwen3 0.6B | 35.8 s cached | 1.2 tok/s |

## Steps

- [x] Read device memory over RPC
- [x] Split layers by free memory
- [x] Advice for the pool
- [x] Screens with sample data, run with `npm run dev`
- [x] Coordinator server and WebSocket
- [x] Load a model across the pool and stream answers
- [x] Hyperswarm pool with invite code and approval
- [x] Encrypted RPC through Hyperswarm
- [x] Recover when a device leaves
- [x] Helpers rejoin after a coordinator restart, approved devices are remembered
- [x] Work ledger
- [x] Spark payouts, tested up to the network (wallet still needs REGTEST funds)
- [x] Screens: landing, pool setup, devices, model, chat, earnings, all live
- [ ] Two real devices on one hotspot
- [ ] Offline test with Wi-Fi off
- [ ] README for judges, demo video, submission
