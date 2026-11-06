const TypingIndicator = () => (
  <div aria-label="Agent is typing" className="gc-typing-row" role="status">
    <span className="gc-agent-avatar gc-message-avatar" aria-hidden="true">G</span>
    <div className="gc-typing-bubble"><i /><i /><i /></div>
  </div>
)

export default TypingIndicator