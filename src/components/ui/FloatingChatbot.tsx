import { ChatMessageText } from '@/components/ui/ChatMessageText'
import { ChatSuggestions } from '@/components/ui/ChatSuggestions'
import {
  PORTFOLIO_SYSTEM_PROMPT,
  sendPortfolioChatMessage,
  type ChatHistoryMessage,
} from '@/lib/portfolioChat'
import { resumePdfUrl } from '@/data/resume'
import { AnimatePresence, motion } from 'motion/react'
import {
  Maximize2,
  MessageSquare,
  Minimize2,
  Send,
  Sparkles,
  X,
  Trash2,
  FileText,
  User,
  Cpu,
  Trophy,
  Mail,
  Download,
  Brain
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons/social-icons'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './FloatingChatbot.css'

interface Message {
  id: string
  sender: 'user' | 'assistant'
  text: string
  timestamp: Date
}

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false) // Minimized popout by default
  const [showSettings, setShowSettings] = useState(false)
  const [apiKeyInput, setApiKeyInput] = useState(() => localStorage.getItem('gemini_api_key') || '')
  const avatarClicksRef = useRef(0)

  const { pathname } = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hi! I am Aditya's conversational AI assistant. Ask me anything about his work, background, achievements, or how to reach him!",
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [typingState, setTypingState] = useState('Thinking...')
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>(() => [
    'Tell me about Aditya',
    'What are his core skills?',
    'Show me his projects',
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatPanelRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Cycle typing state text for high-fidelity reasoning look
  useEffect(() => {
    if (!isTyping) return
    const states = ['Thinking...', 'Analyzing...', 'Generating response...']
    let idx = 0
    setTypingState(states[idx])
    const interval = setInterval(() => {
      idx = (idx + 1) % states.length
      setTypingState(states[idx])
    }, 1500)
    return () => clearInterval(interval)
  }, [isTyping])

  // Auto-grow textarea height
  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return
    textarea.style.height = 'auto'
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`
  }, [inputText])



  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (chatPanelRef.current && chatPanelRef.current.contains(event.target as Node)) {
        return
      }
      const trigger = document.querySelector('.floating-chatbot-trigger')
      if (trigger && trigger.contains(event.target as Node)) {
        return
      }
      setIsOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isOpen])

  const handleSendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed) return

      const userMsg: Message = {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: trimmed,
        timestamp: new Date(),
      }

      setCurrentSuggestions([])
      setMessages((prev) => [...prev, userMsg])
      setInputText('')

      const userMessageCount = messages.filter((m) => m.sender === 'user').length
      if (userMessageCount >= 1 && !isMaximized) {
        setIsTyping(true)
        setTypingState("Interested to know more? Let's expand...")
        await new Promise((resolve) => setTimeout(resolve, 1200))
        setIsMaximized(true)
        setTypingState("Thinking...")
      }

      setIsTyping(true)

      try {
        const history: ChatHistoryMessage[] = messages.map((m) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text,
        }))

        const responseText = await sendPortfolioChatMessage(
          PORTFOLIO_SYSTEM_PROMPT,
          history,
          trimmed
        )

        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            sender: 'assistant',
            text: responseText,
            timestamp: new Date(),
          },
        ])

        const ALL_SUGGESTIONS = [
          'Tell me about Aditya',
          'What are his core skills?',
          'Show me his projects',
          'CodeCampus details',
          'Dementia Diagnostic AI details',
          'Brain Tumor Detection details',
          'Project Clarity details',
          'Where has he worked?',
          'How can I contact him?',
          'Is he open to internships?',
          'Show me his resume',
        ]
        const filtered = ALL_SUGGESTIONS.filter(
          (s) => s.toLowerCase() !== trimmed.toLowerCase()
        )
        const shuffled = [...filtered].sort(() => 0.5 - Math.random())
        setCurrentSuggestions(shuffled.slice(0, 3))
      } catch (err) {
        console.error(err)
        setCurrentSuggestions([
          'Show me his projects',
          'How can I contact him?',
          'Show me his resume',
        ])
      } finally {
        setIsTyping(false)
      }
    },
    [messages, isMaximized]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(inputText)
  }

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text: "Hi! I am Aditya's conversational AI assistant. Ask me anything about his work, background, achievements, or how to reach him!",
        timestamp: new Date(),
      },
    ])
    setCurrentSuggestions([
      'Tell me about Aditya',
      'What are his core skills?',
      'Show me his projects',
    ])
  }

  const handleSaveApiKey = () => {
    localStorage.setItem('gemini_api_key', apiKeyInput.trim())
    setShowSettings(false)
  }

  const handleClearApiKey = () => {
    localStorage.removeItem('gemini_api_key')
    setApiKeyInput('')
    setShowSettings(false)
  }

  // Sidebar navigation options
  const sidebarNavItems = [
    { id: 'about', label: 'About Me', icon: User, prompt: 'Tell me about Aditya Deore' },
    { id: 'projects', label: 'Projects', icon: Cpu, prompt: 'Show me your projects' },
    { id: 'skills', label: 'Skills', icon: Sparkles, prompt: 'What are your core technical skills?' },
    { id: 'achievements', label: 'Achievements', icon: Trophy, prompt: 'What certifications and achievements do you have?' },
    { id: 'resume', label: 'Resume', icon: FileText, prompt: 'How can I view or download your resume?' },
    { id: 'contact', label: 'Contact', icon: Mail, prompt: 'How can I get in touch with you?' },
  ]

  // Suggested cards for welcome screen
  const welcomeSuggestions = [
    { id: 'projects', label: 'Explore Projects', icon: Cpu, prompt: 'Show me your projects' },
    { id: 'skills', label: 'View Skills', icon: Sparkles, prompt: 'What are your core technical skills?' },
    { id: 'achievements', label: 'Achievements', icon: Trophy, prompt: 'What certifications and achievements do you have?' },
    { id: 'resume', label: 'Resume', icon: FileText, prompt: 'How can I view or download your resume?' },
    { id: 'ai', label: 'AI Interests', icon: Brain, prompt: 'What are your interests in AI and ML?' },
    { id: 'contact', label: 'Contact', icon: Mail, prompt: 'How can I get in touch with you?' },
  ]

  // Detect active tab in sidebar dynamically from context
  const getActiveSidebarTab = () => {
    if (messages.length <= 1) return ''
    const lastUserMsg = [...messages].reverse().find(m => m.sender === 'user')?.text.toLowerCase() || ''
    if (lastUserMsg.includes('project') || lastUserMsg.includes('codecampus') || lastUserMsg.includes('clarity') || lastUserMsg.includes('tumor') || lastUserMsg.includes('palantir')) return 'projects'
    if (lastUserMsg.includes('skill') || lastUserMsg.includes('toolkit') || lastUserMsg.includes('languages') || lastUserMsg.includes('framework')) return 'skills'
    if (lastUserMsg.includes('achievement') || lastUserMsg.includes('certif') || lastUserMsg.includes('hackathon')) return 'achievements'
    if (lastUserMsg.includes('resume') || lastUserMsg.includes('cv') || lastUserMsg.includes('pdf')) return 'resume'
    if (lastUserMsg.includes('contact') || lastUserMsg.includes('email') || lastUserMsg.includes('linkedin')) return 'contact'
    if (lastUserMsg.includes('about') || lastUserMsg.includes('who is') || lastUserMsg.includes('background') || lastUserMsg.includes('deore')) return 'about'
    return ''
  }
  const activeTab = getActiveSidebarTab()

  return (
    <div className={`floating-chatbot-wrapper ${isOpen ? (isMaximized ? 'floating-chatbot-wrapper--open' : 'floating-chatbot-wrapper--minimized') : ''}`}>
      <AnimatePresence>
        {isOpen && isMaximized && (
          <motion.div
            className="chat-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {!isOpen && (
        <div className="floating-chatbot-trigger-container">
          <div className="floating-chatbot-prompt-stack">
            {[
              { label: "Who is Aditya?", prompt: "Who is Aditya Deore?" },
              { label: "What is his experience?", prompt: "What is his professional experience?" },
              { label: "Show me his projects", prompt: "Show me your projects" }
            ].map((item, idx) => (
              <button
                key={idx}
                type="button"
                className="floating-chatbot-prompt-pill"
                style={{ animationDelay: `${idx * 0.25}s` }}
                onClick={() => {
                  setIsOpen(true)
                  handleSendMessage(item.prompt)
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="floating-chatbot-trigger"
            onClick={() => setIsOpen(true)}
            aria-label="Show chatbot workspace"
          >
            <MessageSquare className="chatbot-icon" size={24} />
          </button>
        </div>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatPanelRef}
            className={`floating-chatbot-panel ${isMaximized ? 'floating-chatbot-panel--maximized' : 'floating-chatbot-panel--minimized'}`}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header Area */}
            <div className="chat-header">
              <div
                className="chat-header-info"
                style={{ cursor: 'pointer', userSelect: 'none' }}
                onClick={() => {
                  avatarClicksRef.current += 1
                  if (avatarClicksRef.current >= 5) {
                    setShowSettings(true)
                    avatarClicksRef.current = 0
                  }
                }}
              >
                <div className="chat-avatar" style={{ overflow: 'hidden' }}>
                  <img
                    src="/motion/yo programando.jfif"
                    alt="Aditya Deore"
                    className="avatar-icon"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
                  />
                  <span className="online-indicator" />
                </div>
                <div>
                  <h3 className="chat-title">Aditya's AI Assistant</h3>
                  <p className="chat-status">
                    AI Powered Portfolio
                  </p>
                </div>
              </div>
              <div className="chat-header-actions">
                <button
                  type="button"
                  className="chat-header-action-btn"
                  onClick={handleClearChat}
                  title="Clear Chat History"
                  aria-label="Clear Chat History"
                >
                  <Trash2 size={16} />
                </button>
                <button
                  type="button"
                  className="chat-header-action-btn"
                  onClick={() => setIsMaximized(!isMaximized)}
                  title={isMaximized ? 'Restore Window Size' : 'Maximize Workspace'}
                  aria-label={isMaximized ? 'Restore Window Size' : 'Maximize Workspace'}
                >
                  {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
                <button
                  type="button"
                  className="chat-header-action-btn close-action-btn"
                  onClick={() => setIsOpen(false)}
                  title="Close Workspace"
                  aria-label="Close Workspace"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Main Layout Area */}
            <div className="chat-main-layout">
              {/* Left Navigation Sidebar */}
              <div className="chat-sidebar">
                <div className="chat-sidebar-section">
                  <span className="chat-sidebar-label">WORKSPACE</span>
                  <div className="chat-sidebar-nav">
                    {sidebarNavItems.map((item) => {
                      const Icon = item.icon
                      const isActive = activeTab === item.id
                      return (
                        <button
                          key={item.id}
                          type="button"
                          className={`chat-sidebar-nav-item ${isActive ? 'chat-sidebar-nav-item--active' : ''}`}
                          onClick={() => handleSendMessage(item.prompt)}
                          disabled={isTyping}
                        >
                          <Icon size={16} className="nav-item-icon" />
                          <span>{item.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="chat-sidebar-bottom">
                  <a
                    href="https://github.com/AdityaxDeore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chat-sidebar-nav-link"
                  >
                    <GithubIcon size={14} /> GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/aditya-deore-3a725a263"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chat-sidebar-nav-link"
                  >
                    <LinkedinIcon size={14} /> LinkedIn
                  </a>
                  <a
                    href={resumePdfUrl}
                    download="Aditya_Deore_Resume.pdf"
                    className="chat-sidebar-nav-link highlight-link"
                  >
                    <Download size={14} /> Download Resume
                  </a>
                </div>
              </div>

              {/* Right Conversation Space */}
              <div className="chat-conversation-area">
                <div className="chat-body-wrapper">
                  {showSettings && (
                    <div className="chat-settings-overlay">
                      <div className="settings-card">
                        <div className="settings-header">
                          <h4>API Configuration</h4>
                          <button type="button" className="settings-close" onClick={() => setShowSettings(false)}>
                            <X size={16} />
                          </button>
                        </div>
                        <div className="settings-body">
                          <p className="settings-desc">
                            Provide your <strong>Gemini API Key</strong> to activate live AI reasoning.
                            The key is stored in your browser only.
                          </p>

                          <div className="settings-field">
                            <label className="settings-label">Gemini API Key</label>
                            <input
                              type="password"
                              className="settings-input"
                              placeholder="AIzaSy..."
                              value={apiKeyInput}
                              onChange={(e) => setApiKeyInput(e.target.value)}
                            />
                          </div>

                          <div className="settings-actions">
                            <button type="button" className="settings-btn settings-btn-save" onClick={handleSaveApiKey}>
                              Save Changes
                            </button>
                            <button type="button" className="settings-btn settings-btn-clear" onClick={handleClearApiKey}>
                              Delete Key
                            </button>
                          </div>

                          <div className="settings-info-box">
                            <p>
                              <strong>Configured Model:</strong> gemini-1.5-flash
                            </p>
                            <p>
                              <strong>Base Endpoint:</strong> generativelanguage.googleapis.com
                            </p>
                            <p>
                              <strong>Env Key:</strong>{' '}
                              {import.meta.env.VITE_GEMINI_API_KEY
                                ? 'Loaded from .env'
                                : 'Not set — add VITE_GEMINI_API_KEY to .env'}
                            </p>
                            <p>
                              <strong>Guardrail:</strong> Relates off-topic topics back to Aditya Deore's engineering achievements.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {messages.length <= 1 ? (
                    /* Welcome Screen */
                    <div className="chat-welcome-container">
                      <div className="chat-welcome-content">
                        <h2 className="chat-welcome-title">Hi, I'm Aditya's AI Assistant</h2>
                        <p className="chat-welcome-subtitle">
                          I can answer questions about my projects, technical skills, achievements, and professional journey.
                        </p>
                        <div className="chat-welcome-suggestions">
                          {welcomeSuggestions.map((card) => {
                            const IconComponent = card.icon
                            return (
                              <button
                                key={card.id}
                                type="button"
                                className="chat-suggestion-card"
                                onClick={() => handleSendMessage(card.prompt)}
                              >
                                <IconComponent size={18} className="suggestion-card-icon-lucide" />
                                <span className="suggestion-card-label">{card.label}</span>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Messages Scrolling Container */
                    <div className="chat-messages-container">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`chat-message-row ${msg.sender === 'user' ? 'msg-user' : 'msg-assistant'}`}
                        >
                          {msg.sender === 'assistant' && (
                            <div className="msg-avatar">
                              <Sparkles size={12} />
                            </div>
                          )}
                          <div className="chat-bubble-wrapper">
                            <div className="chat-bubble">
                              <ChatMessageText text={msg.text} isAssistant={msg.sender === 'assistant'} isMaximized={isMaximized} />
                            </div>
                          </div>
                        </div>
                      ))}

                      {isTyping && (
                        <div className="chat-message-row msg-assistant">
                          <div className="msg-avatar">
                            <Sparkles size={12} />
                          </div>
                          <div className="chat-bubble-wrapper">
                            <div className="chat-bubble typing-bubble">
                              <span className="typing-status-text">{typingState}</span>
                              <span className="typing-cursor">▍</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Render follow-up suggestions at the bottom of flow */}
                      {!isTyping && currentSuggestions.length > 0 && (
                        <div className="chat-suggestions-in-flow">
                          <ChatSuggestions
                            items={currentSuggestions}
                            onSelect={handleSendMessage}
                            disabled={isTyping}
                            label="Follow-up questions"
                          />
                        </div>
                      )}

                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </div>

                {/* Floating Input Area */}
                <div className="chat-input-area">
                  <div className="chat-input-wrapper">
                    <form className="chat-input-form" onSubmit={handleSubmit}>
                      <textarea
                        ref={textareaRef}
                        className="chat-textarea"
                        rows={1}
                        placeholder="Ask anything about Aditya's projects, skills, achievements, or experience..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            handleSubmit(e)
                          }
                        }}
                        disabled={isTyping}
                      />
                      <button
                        type="submit"
                        className="chat-send-btn"
                        disabled={!inputText.trim() || isTyping}
                        aria-label="Send Message"
                      >
                        <Send size={16} />
                      </button>
                    </form>
                  </div>
                  <p className="chat-input-tip">
                    Enter to send, Shift + Enter for newline
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
