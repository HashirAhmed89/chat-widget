const Header = ({ onMinimize }) => (
	<header className="gc-header">
		<div className="gc-brand">
			<span className="gc-brand-mark" aria-hidden="true">G</span>
			<div className="gc-brand-copy">
				<strong>Grey Chat</strong>
				<span><i className="gc-online-dot" /> We&apos;re online</span>
			</div>
		</div>
		<button aria-label="Minimize chat" className="gc-icon-button" onClick={onMinimize} title="Minimize chat" type="button">
			<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14" /></svg>
		</button>
	</header>
)

export default Header
