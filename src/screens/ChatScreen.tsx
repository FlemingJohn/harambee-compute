import { AppScreen } from '../components/AppScreen.tsx'
import { NotConnectedScreen } from '../components/NotConnectedScreen.tsx'
import { ScreenTitle } from '../components/ScreenTitle.tsx'
import { ChatComposer } from '../chat/ChatComposer.tsx'
import { ChatConversation } from '../chat/ChatConversation.tsx'
import { ChatStats } from '../chat/ChatStats.tsx'
import { useCoordinator } from '../hooks/useCoordinator.ts'

export function ChatScreen() {
  const { state, send } = useCoordinator()
  if (!state) return <NotConnectedScreen route="chat" />
  const isReady = state.modelStatus === 'ready'
  const segments = (isReady ? state.allocation?.shares ?? [] : []).map((share) => {
    const devicePosition = state.devices.findIndex((device) => device.id === share.deviceId)
    return { label: state.devices[devicePosition]?.name ?? 'Device', layerCount: share.layerCount, devicePosition }
  })
  return (
    <AppScreen route="chat">
      <ScreenTitle route="chat" title="Ask the pool">
        Every device in the pool works on each answer. Nothing leaves this network.
      </ScreenTitle>
      <div className="columns">
        <section aria-label="Conversation" className="card stack column-main conversation">
          <ChatConversation messages={state.chat} modelLabel={state.modelMessage} note={isReady ? '' : 'Load a model on the Model screen, then ask here.'} />
          <ChatComposer canAsk={isReady} isAnswering={state.isAnswering} onAsk={(question) => send({ type: 'ask', question })} />
        </section>
        <ChatStats tokensPerSecond={state.tokensPerSecond} tokenCount={state.tokenCount} segments={segments} />
      </div>
    </AppScreen>
  )
}
