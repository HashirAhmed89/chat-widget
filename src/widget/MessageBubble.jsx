const MessageBubble = ({ message }) => (
	<article className={`gc-message gc-message-${message.role}`}>
		{message.role === 'agent' && <span className="gc-agent-avatar gc-message-avatar" aria-hidden="true">G</span>}
		<div className="gc-message-content">
			<p>{message.text}</p>
			<time>{message.time}</time>
		</div>
	</article>
)

export default MessageBubble
