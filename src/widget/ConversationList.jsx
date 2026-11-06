const ConversationList = ({ conversations, onContinue, onStartNew, onBack }) => (
	<div className="gc-conversations-screen">
		<button className="gc-back-link" onClick={onBack} type="button">
			<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
			Back
		</button>
		<div className="gc-screen-intro gc-history-intro">
			<span className="gc-eyebrow">YOUR SUPPORT</span>
			<h1>Conversations</h1>
			<p>Pick up where you left off.</p>
		</div>
		<div className="gc-conversation-list">
			{conversations.map((conversation) => (
				<article className="gc-conversation-card" key={conversation.id}>
					<div className="gc-conversation-topline">
						<span className={`gc-status-badge gc-status-${conversation.status.toLowerCase()}`}>{conversation.status}</span>
						<time>{conversation.date}</time>
					</div>
					<h2>{conversation.title}</h2>
					<p>{conversation.lastMessage}</p>
					<button onClick={() => onContinue(conversation)} type="button">
						Continue conversation
						<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
					</button>
				</article>
			))}
		</div>
		<button className="gc-primary-button gc-new-request-button" onClick={onStartNew} type="button">
			Start new support request
			<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14m-7-7h14" /></svg>
		</button>
	</div>
)

export default ConversationList
