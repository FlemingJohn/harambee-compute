import { Icon } from '../components/Icon.tsx'
import { Logo } from '../components/Logo.tsx'
import type { ChatMessage } from '../types/ChatMessage.ts'

export function ChatConversation({ messages }: { messages: ChatMessage[] }) {
  return (
    <>
      <div className="row-spread conversation-header">
        <h1 className="row card-title">
          <span className="icon-tile icon-tile--small">
            <Icon name="chat" className="text-sunset" />
          </span>
          Ask the pool
        </h1>
        <span className="small muted">Qwen3 4B · split across 2 devices</span>
      </div>
      {messages.map((message) =>
        message.author === 'student' ? (
          <p key={message.id} className="message-student">{message.text}</p>
        ) : (
          <div key={message.id} className="message-pool">
            <Logo size={30} />
            <p>{message.text}</p>
          </div>
        )
      )}
      <p className="small muted">Sample conversation. Live answers stream here once the coordinator is connected.</p>
    </>
  )
}
