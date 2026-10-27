import { AppScreen } from '../components/AppScreen.tsx'
import { ChatComposer } from '../chat/ChatComposer.tsx'
import { ChatConversation } from '../chat/ChatConversation.tsx'
import { ChatStats } from '../chat/ChatStats.tsx'
import { sampleChat } from '../sample/sampleChat.ts'

export function ChatScreen() {
  return (
    <AppScreen route="chat">
      <div className="columns">
        <section aria-label="Conversation" className="card stack column-main conversation">
          <ChatConversation messages={sampleChat} />
          <ChatComposer />
        </section>
        <ChatStats />
      </div>
    </AppScreen>
  )
}
