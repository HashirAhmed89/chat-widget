import { useEffect, useRef, useState } from 'react'
import ChatWindow from './Chatwindow.jsx'
import ConversationList from './ConversationList.jsx'
import LauncherButton from './LauncherButton.jsx'
import MessageInput from './MessageInput.jsx'
import MessageList from './MessageList.jsx'
import PreChatForm from './PreChatForm.jsx'
import './styles/widget.css'

const sampleConversations = [
  {
    id: 'order-help',
    title: 'Order delivery update',
    lastMessage: 'Thanks for checking that for me.',
    date: 'Today',
    status: 'Open',
    messages: [
      { id: 'order-1', role: 'agent', text: 'Hi there! What can I help you with today?', time: '10:24 AM' },
      { id: 'order-2', role: 'customer', text: 'Could you check the status of my order?', time: '10:25 AM' },
      { id: 'order-3', role: 'agent', text: 'Of course. I can look into that for you.', time: '10:26 AM' },
    ],
  },
  {
    id: 'billing-question',
    title: 'Question about my invoice',
    lastMessage: 'I have sent the updated invoice to your email.',
    date: 'Yesterday',
    status: 'Pending',
    messages: [
      { id: 'billing-1', role: 'customer', text: 'I have a question about a charge on my invoice.', time: '3:12 PM' },
      { id: 'billing-2', role: 'agent', text: 'I have sent the updated invoice to your email.', time: '3:18 PM' },
    ],
  },
  {
    id: 'account-access',
    title: 'Account access',
    lastMessage: 'You are all set. Have a great day!',
    date: 'Oct 28',
    status: 'Closed',
    messages: [
      { id: 'account-1', role: 'customer', text: 'I could not sign in to my account.', time: '9:41 AM' },
      { id: 'account-2', role: 'agent', text: 'You are all set. Have a great day!', time: '9:53 AM' },
    ],
  },
]

// Keeps the chat screens and their sample data in one place.
const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [screen, setScreen] = useState('prechat')
  const [customer, setCustomer] = useState(null)
  const [activeConversation, setActiveConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const replyTimer = useRef(null)

  // Clear the pending reply timer when the widget is removed.
  useEffect(() => {
    return () => {
      window.clearTimeout(replyTimer.current)
    }
  }, [])

  // Start a new chat and show a welcome message for the customer.
  const handleStartChat = (details) => {
    setCustomer(details)
    setActiveConversation(null)
    setMessages([{
      id: `welcome-${Date.now()}`,
      role: 'agent',
      text: `Hi ${details.name}! 👋 How can I help you today?`,
      time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
    }])
    setScreen('chat')
  }

  // Load a selected sample conversation into the chat screen.
  const handleContinueConversation = (conversation) => {
    setActiveConversation(conversation)
    setMessages(conversation.messages)
    setScreen('chat')
  }

  // Reset the current conversation and return to the customer form.
  const handleStartNewRequest = () => {
    setCustomer(null)
    setActiveConversation(null)
    setMessages([])
    setScreen('prechat')
  }

  // Add the customer's message and show a sample agent reply.
  const handleSend = (text) => {
    const time = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    // Use the latest messages so a new message does not replace older ones.
    setMessages((current) => [...current, {
      id: `customer-${Date.now()}`,
      role: 'customer',
      text,
      time,
    }])
    setIsTyping(true)
    window.clearTimeout(replyTimer.current)
    // Wait briefly so the typing indicator appears before the sample reply.
    replyTimer.current = window.setTimeout(() => {
      setIsTyping(false)
      // Add the reply to whatever messages are current when the timer ends.
      setMessages((current) => [...current, {
        id: `agent-${Date.now()}`,
        role: 'agent',
        text: 'Thanks for reaching out. An agent will be with you shortly.',
        time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      }])
    }, 1400)
  }

  // Show the customer's conversation history.
  const handleShowConversations = () => setScreen('conversations')

  // Return to the chat or form that was open before the history screen.
  const handleBackFromConversations = () => setScreen(customer ? 'chat' : 'prechat')

  // Close the chat window from its header button.
  const handleMinimize = () => setIsOpen(false)

  // Toggle the chat window from the launcher button.
  const handleToggle = () => {
    // Use the latest open state so repeated clicks toggle correctly.
    setIsOpen((open) => !open)
  }

  return (
    <div className="gc-widget">
      <ChatWindow
        isOpen={isOpen}
        screen={screen}
        onMinimize={handleMinimize}
        onShowConversations={handleShowConversations}
      >
        {screen === 'prechat' && (
          <PreChatForm onSubmit={handleStartChat} onShowConversations={handleShowConversations} />
        )}
        {screen === 'conversations' && (
          <ConversationList
            conversations={sampleConversations}
            onContinue={handleContinueConversation}
            onStartNew={handleStartNewRequest}
            onBack={handleBackFromConversations}
          />
        )}
        {screen === 'chat' && (
          <div className="gc-chat-screen">
            <div className="gc-chat-context">
              <span className="gc-agent-avatar" aria-hidden="true">G</span>
              <div>
                <strong>{activeConversation?.title || 'Customer support'}</strong>
                <span>Typically replies in a few minutes</span>
              </div>
            </div>
            <MessageList messages={messages} isTyping={isTyping} />
            <MessageInput onSend={handleSend} />
          </div>
        )}
      </ChatWindow>
      <LauncherButton isOpen={isOpen} onClick={handleToggle} />
    </div>
  )
}

export default ChatWidget
