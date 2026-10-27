import { AppScreen } from '../components/AppScreen.tsx'
import { ChatComposer } from '../chat/ChatComposer.tsx'
import { ChatConversation } from '../chat/ChatConversation.tsx'
import { ChatStats } from '../chat/ChatStats.tsx'
import { useCoordinator } from '../hooks/useCoordinator.ts'
import { sampleChat } from '../sample/sampleChat.ts'

export function ChatScreen() {
  const { state, send } = useCoordinator()
  const isReady = state?.modelStatus === 'ready'
  const devices = state?.devices ?? []
  const segments = (isReady ? state.allocation?.shares ?? [] : []).map((share) => {
    const devicePosition = devices.findIndex((device) => device.id === share.deviceId)
    return { label: devices[devicePosition]?.name ?? 'Device', layerCount: share.layerCount, devicePosition }
  })
  const note = !state ? 'Sample conversation.' : isReady ? '' : 'Load a model on the Model screen, then ask here.'
  return (
    <AppScreen route="chat">
      <div className="columns">
        <section aria-label="Conversation" className="card stack column-main conversation">
          <ChatConversation messages={state?.chat ?? sampleChat} modelLabel={state ? state.modelMessage : 'Qwen3 4B · sample'} note={note} />
          <ChatComposer canAsk={isReady} isAnswering={state?.isAnswering ?? false} onAsk={(question) => send({ type: 'ask', question })} />
        </section>
        <ChatStats tokensPerSecond={state?.tokensPerSecond ?? 6.2} tokenCount={state?.tokenCount ?? 184} segments={state ? segments : [{ label: 'Flem', layerCount: 21, devicePosition: 0 }, { label: 'Lab-PC', layerCount: 15, devicePosition: 1 }]} />
      </div>
    </AppScreen>
  )
}
