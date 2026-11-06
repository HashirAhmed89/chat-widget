import { useState } from 'react'

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const text = message.trim()
    if (!text) return
    onSend(text)
    setMessage('')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit(event)
    }
  }

  return (
    <form className="gc-message-form" onSubmit={handleSubmit}>
      <textarea aria-label="Write a message" onChange={(event) => setMessage(event.target.value)} onKeyDown={handleKeyDown} placeholder="Write a message..." rows={1} value={message} />
      <button aria-label="Send message" disabled={!message.trim()} type="submit">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 3-7.2 18-3.9-7.9L2 9.2 21 3Z" /><path d="M21 3 9.9 13.1" /></svg>
      </button>
    </form>
  )
}

export default MessageInput
