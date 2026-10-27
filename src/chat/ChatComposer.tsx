import { useState } from 'react'
import { Button } from '../components/Button.tsx'

export function ChatComposer({ canAsk, isAnswering, onAsk }: { canAsk: boolean; isAnswering: boolean; onAsk: (question: string) => void }) {
  const [question, setQuestion] = useState('')
  const askQuestion = () => {
    if (!canAsk || isAnswering || question.trim() === '') return
    onAsk(question.trim())
    setQuestion('')
  }
  return (
    <form
      className="chat-composer"
      onSubmit={(event) => {
        event.preventDefault()
        askQuestion()
      }}
    >
      <div className="stack chat-question">
        <label htmlFor="question" className="small">Your question</label>
        <input
          id="question"
          className="text-input"
          type="text"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder={canAsk ? 'Ask anything. It stays on this network.' : 'Load a model first'}
        />
      </div>
      <Button variant="primary" isLarge isDisabled={!canAsk || isAnswering} onClick={askQuestion}>
        {isAnswering ? 'Answering…' : 'Send'}
      </Button>
    </form>
  )
}
