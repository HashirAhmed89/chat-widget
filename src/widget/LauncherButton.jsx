const LauncherButton = ({ isOpen, onClick }) => (
	<button
		aria-label={isOpen ? 'Close chat' : 'Open chat'}
		aria-expanded={isOpen}
		className={`gc-launcher${isOpen ? ' is-open' : ''}`}
		onClick={onClick}
		type="button"
	>
		{isOpen ? (
			<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
		) : (
			<svg viewBox="0 0 24 24" aria-hidden="true">
				<path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H5l1.7-3.1A7.5 7.5 0 1 1 20 11.5Z" />
				<path d="M8.5 11.5h7M8.5 14.5h4" />
			</svg>
		)}
        
	</button>
)

export default LauncherButton
