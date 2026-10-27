import { Icon } from '../components/Icon.tsx'
import { Logo } from '../components/Logo.tsx'
import { useScrollToEnd } from '../hooks/useScrollToEnd.ts'
import type { ChatMessage } from '../types/ChatMessage.ts'

export function ChatConversation({ messages, modelLabel, note }: { messages: ChatMessage[]; modelLabel: string; note: string }) {
  const contentSize = messages.reduce((sum, message) => sum + message.text.length, messages.length)
  const messagesRef = useScrollToEnd<HTMLDivElement>(contentSize)
  return (
    <>
      <div className="row chat-model small muted">
        <Icon name="layers" size={18} className="text-sunset" />
        {modelLabel}
      </div>
      <div ref={messagesRef} className="chat-messages" aria-live="polite">
        {messages.length === 0 && <p className="muted chat-empty">No questions yet. Try “Explain photosynthesis in two sentences.”</p>}
        {messages.map((message) =>
          message.author === 'student' ? (
            <p key={message.id} className="message-student">{message.text}</p>
          ) : (
            <div key={message.id} className="message-pool">
              <Logo size={30} />
              <p>{message.text || '…'}</p>
            </div>
          )
        )}
        {note && <p className="small muted">{note}</p>}
      </div>
    </>
  )
}
