import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble.jsx'
import TypingIndicator from './TypingIndicator.jsx'

const MessageList = ({ messages, isTyping }) => {
	const bottomRef = useRef(null)

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
	}, [messages, isTyping])

	return (
		<div aria-label="Conversation messages" aria-live="polite" className="gc-message-list" role="log">
			<div className="gc-day-divider"><span>Today</span></div>
			{messages.map((message) => <MessageBubble key={message.id} message={message} />)}
			{isTyping && <TypingIndicator />}
			<div ref={bottomRef} />
		</div>
	)
}

export default MessageList
