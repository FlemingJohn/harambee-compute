import { Button } from '../components/Button.tsx'
import { Icon } from '../components/Icon.tsx'

export function ChatComposer() {
  return (
    <div className="stack chat-composer">
      <p className="card card--raised row small muted">
        <Icon name="clock" size={18} />
        1 question waiting in line, from a student's phone
      </p>
      <form className="row" onSubmit={(event) => event.preventDefault()}>
        <div className="stack chat-question">
          <label htmlFor="question" className="small">Your question</label>
          <input id="question" className="text-input" type="text" placeholder="Ask anything. It stays on this network." />
        </div>
        <Button variant="primary" isLarge>Send</Button>
        <Button isLarge>Stop</Button>
      </form>
    </div>
  )
}
