# Recording the Harambee demo with two laptops

**Laptop 1** is the teacher laptop (the coordinator). **Laptop 2** is the helper.
You record both screens with the Windows Snipping Tool, and film both laptops
side by side with your phone at two moments. The clips are edited into the
final video afterwards.

Read this page to the end before you switch mobile data off.

---

## Part 1: Get ready (internet still ON)

### Both laptops

1. Plug both laptops into power.
2. Close Chrome and any other big apps.

### Laptop 2

1. Open PowerShell in the project folder.
2. Get the latest code:
   ```powershell
   git pull
   ```

### Phone

1. Turn on the **hotspot**.
2. Turn **mobile data OFF**.
3. Connect **both laptops** to the phone hotspot.

### Laptop 1

1. Find this laptop's hotspot address:
   ```powershell
   ipconfig
   ```
   Under **Wireless LAN adapter Wi-Fi**, copy the **IPv4 Address**, for example
   `192.168.43.20` or `172.20.10.3`. This page calls it **`<IP>`**.
2. Write `<IP>` down. Laptop 2 needs it.

---

## Part 2: Start the pool (internet OFF)

### Laptop 1

1. Open PowerShell in the project folder.
2. Start the coordinator, putting your address in place of `<IP>`:
   ```powershell
   $env:QVAC_RPC_INIT_TIMEOUT_MS=240000
   npm run coordinator -- --host <IP> --name Teacher-laptop --gpu --spread
   ```
3. Wait for this line:
   `Pool ready. Invite code: HARAMBEE-XXXX-XXXX@<IP>:49737`
4. Open **Edge** and go to **http://127.0.0.1:8080**. Click **Open the app**.

### Laptop 2

1. Do **not** start the helper yet. It starts on camera.
2. Type this command in PowerShell, using the invite code laptop 1 printed, but
   **do not press Enter yet**:
   ```powershell
   npm run helper -- --code HARAMBEE-XXXX-XXXX@<IP>:49737 --name Lab-PC-2 --gpu
   ```

---

## Part 3: Start recording

### Both laptops

1. Press **Win + Shift + R**.
2. Drag over the **whole screen**.
3. Press **Start**. Leave sound off. The narration is added when editing.

### Phone

Keep the camera app ready. You film at the moments marked **📱**.

---

## Part 4: Record the demo, step by step

Do the steps in this order. Wait about **2 seconds** on every screen before you
click. Mistakes are fine; they get cut out.

| Step | Laptop 1 (teacher) | Laptop 2 (helper) | Phone |
|---|---|---|---|
| 1 | In PowerShell run `ping 8.8.8.8`. It fails. That proves there is no internet. | — | 📱 Film the phone screen showing **mobile data off** for 3 seconds |
| 2 | In Edge, open **Pool setup**. Show the invite code and QR for 3 seconds. | — | — |
| 3 | — | Press **Enter** on the helper command. Wait for `Looking for the pool`. | — |
| 4 | Open **Devices**. You see **Lab-PC-2 wants to join**. Press **Approve**. Its memory appears in the table. | It prints `Approved by the coordinator. Lending memory now.` | 📱 **Film both laptops side by side** for 10 seconds |
| 5 | Open **Model**. Choose **Qwen3 0.6B**. Press **Load**. Wait until it says **Ready** (about 30 seconds). | — | — |
| 6 | Open **Chat**. Ask: *What is the capital of Kenya?* Wait for the answer. Then ask: *Explain photosynthesis in two sentences for a Form 2 student.* | — | 📱 Film both laptops while the second answer appears |
| 7 | — | Press **Ctrl + C**. The helper leaves the pool. | — |
| 8 | Watch the pool reload on laptop 1 alone. In **Chat**, ask *What is the capital of Kenya?* again. | — | — |
| 9 | Open **Earnings**. Show the ledger rows and **Spark network: Offline**. Press **Send**. It says the payouts wait in the queue. | — | — |
| 10 | **Stop the recording** (Snipping Tool, stop button). | **Stop the recording.** | — |

Keep the questions simple. The small Qwen3 0.6B model can get harder facts wrong.

---

## Part 5: Back online, the payout

### Phone

1. Turn **mobile data ON**. Now the laptops have internet.

### Both laptops

1. Start a **new** recording: **Win + Shift + R**, whole screen, **Start**.

### Laptop 1

1. Stay on **Earnings**. Within about 20 seconds **Spark network** turns **Online**.
2. Press **Send payouts**. It says **Paid … sats**.

### Laptop 2

1. Open the helper's wallet, which collects the sats it was paid:
   ```powershell
   npm run fund -- --data .harambee/helper-Lab-PC-2
   ```
2. It ends with **The wallet has … sats.**

### Both laptops

1. **Stop the recording.**

---

## Part 6: Collect the files for editing

1. The Snipping Tool saves to **Videos → Screen Recordings** on each laptop.
2. Copy **every clip** from **both laptops** and **the phone** into one folder on
   laptop 1, for example `video-raw`, outside the project folder. Use a USB stick,
   Google Drive or a cable.
3. Keep the clips out of the repository. They are large and are only needed for editing.

---

## If something goes wrong

| Problem | Where | Fix |
|---|---|---|
| `QVAC did not start in time` | Laptop 1 | Run the coordinator command again. |
| It keeps saying `Looking for the pool` | Laptop 2 | Press Ctrl + C, then run `npm run check -- --code HARAMBEE-XXXX-XXXX@<IP>:49737`. It tells you which step fails. |
| Windows asks to allow Node.js | Either | Press **Allow**. |
| Laptop 2 never appears on **Devices** | Laptop 1 | Check that both laptops are on the phone hotspot and that the code has the right `<IP>`. |
| The answer is slow | Laptop 1 | That is normal for a split. Keep recording; it gets cut shorter. |
| The ping in step 1 works | Laptop 1 | The internet is still on. Check that mobile data is off and that laptop 1 is on the phone hotspot, not another Wi-Fi. |
