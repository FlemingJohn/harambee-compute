export interface ChatMessage {
  id: string
  author: 'student' | 'pool'
  text: string
}
