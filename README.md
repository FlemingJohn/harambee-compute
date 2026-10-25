# Harambee Compute: RPC spike

Splits one QVAC model's layers across several machines with QVAC RPC servers
(`startRpcServer` / `loadModel` with `rpc-servers`). This spike proves the split
works: laptop + laptop on loopback, or laptop + GitHub Codespace through VS Code
port forwarding.

**Security:** QVAC RPC traffic is unencrypted and unauthenticated. Servers here
bind to `127.0.0.1` only. Never open the RPC port to the internet.

## Versions
- `@qvac/sdk` 0.22.0, `@qvac/ggml-rpc-server` 0.6.0, `@qvac/cli` 0.16.0
- Node 24
- Model: `LLAMA_3_2_1B_INST_Q4_0` (773 MB, downloaded on first load)

## Setup (any machine)
```
npm ci
npx qvac bundle sdk     # builds qvac/worker.entry.mjs with the RPC server provider (qvac.config.json)
```

## Test 1: two servers on one machine
```
node server.mjs 127.0.0.1 x 900          # terminal 1, prints SERVING 127.0.0.1:<portA>
node server.mjs 127.0.0.1 x 900          # terminal 2, prints SERVING 127.0.0.1:<portB>
node client.mjs --urls 127.0.0.1:<portA>,127.0.0.1:<portB>
```
Measured on a Ryzen 5 3500U / Vega 8 / 6 GB RAM (Windows 11): 15.8 s load from cache, 10.9 tok/s.

## Test 2: laptop + GitHub Codespace
1. Open this repo's Codespace **in VS Code desktop** (GitHub Codespaces extension).
   The browser version only forwards HTTP; RPC needs raw TCP.
   `.devcontainer/` installs Node 24, runs `npm ci` and builds the worker.
2. In the Codespace terminal:
   ```
   node server.mjs 127.0.0.1 x 1800 50052
   ```
   VS Code forwards port 50052 to `127.0.0.1:50052` on your laptop (check the **Ports** tab).
3. On the laptop:
   ```
   node server.mjs 127.0.0.1 x 1800 50051
   node client.mjs --urls 127.0.0.1:50051,127.0.0.1:50052
   ```
   Half the layers run on the laptop and half in the cloud. Expect it to be much
   slower than Test 1: every token crosses the tunnel, and the first load uploads
   the cloud half of the weights (`cache: true` keeps them for later loads).

Stop the Codespace when done; the free tier is 120 core-hours/month.
