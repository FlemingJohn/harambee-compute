import { Icon } from '../components/Icon.tsx'
import { Logo } from '../components/Logo.tsx'
import type { ChatMessage } from '../types/ChatMessage.ts'

export function ChatConversation({ messages, modelLabel, note }: { messages: ChatMessage[]; modelLabel: string; note: string }) {
  return (
    <>
      <div className="row-spread">
        <h1 className="row card-title">
          <span className="icon-tile icon-tile--small">
            <Icon name="chat" className="text-sunset" />
          </span>
          Ask the pool
        </h1>
        <span className="small muted">{modelLabel}</span>
      </div>
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
    </>
  )
}
