import Header from './Header.jsx'

const ChatWindow = ({ isOpen, screen, onMinimize, onShowConversations, children }) => (
	<section
		aria-label="Grey Chat support"
		aria-hidden={!isOpen}
		className={`gc-window${isOpen ? ' is-open' : ''}`}
		inert={!isOpen}
	>
		<Header onMinimize={onMinimize} />
		{screen === 'chat' && (
			<button className="gc-history-link" onClick={onShowConversations} type="button">
				<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6M9 12h11" /></svg>
				All conversations
			</button>
		)}
		<div className="gc-window-content">{children}</div>
	</section>
)

export default ChatWindow
