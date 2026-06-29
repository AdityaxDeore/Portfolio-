import { ADITYA_INFO } from '@/data/adityaInfo'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { MessageSquare, X, Send, Bot, Sparkles, Settings, Maximize2, Minimize2 } from 'lucide-react'
import './FloatingChatbot.css'

interface Message {
  id: string
  sender: 'user' | 'assistant'
  text: string
  timestamp: Date
}

const SYSTEM_PROMPT = `You are Aditya Deore's friendly AI portfolio assistant. Here is all the professional info about Aditya:

${ADITYA_INFO}

Strict Guidelines:
1. You must ONLY answer questions about Aditya Deore based on the professional info provided above.
2. If the user asks about ANY other topic (including writing code, writing essays, math, general queries, definitions, or general chat that is not about Aditya Deore), you must politely decline and state that you are only configured to assist with questions regarding Aditya Deore's portfolio, background, experience, skills, and projects.
   Example refusal: "I'm sorry, I am configured as Aditya Deore's portfolio assistant and can only answer questions related to Aditya's skills, experience, projects, or background."
3. Keep responses concise, clear, and helpful.
4. Format your responses with bullet points and bold text where appropriate to make them easy to read.
5. Provide clickable markdown links ([label](url)) for GitHub, LinkedIn, and resume links so the user can click them directly in the chat.
`

const SUGGESTIONS = [
  'Tell me about Aditya',
  'What are his core skills?',
  'Show me his projects',
  'Where has he worked?',
  'How do I view his resume?',
  'How can I contact him?',
]

function generateLocalResponse(query: string): string {
  const q = query.toLowerCase()
  
  if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('welcome') || q.includes('greet')) {
    return "Hi! I am Aditya's conversational AI assistant. How can I help you today? You can ask me about:\n\n• **Aditya's background**\n• **His skills**\n• **His projects**\n• **His experience**\n• **His resume**\n• **How to contact him**"
  }
  if (q.includes('codecampus') || q.includes('code campus')) {
    return "**Code Campus** (Sept 2025 – Feb 2026) is a proctored coding and learning platform.\n\n• **Tech Stack**: React, Node.js, MongoDB, TypeScript\n• **Features**: VS Code-style IDE for real-time code execution, secure proctoring algorithms to maintain integrity, and student analytics dashboard.\n• **Repository**: [GitHub Repo](https://github.com/AdityaxDeore/codecampus)"
  }
  if (q.includes('clarity')) {
    return "**Clarity** (Jan – Apr 2025) is an AI-powered mental wellness platform.\n\n• **Tech Stack**: React, Node.js, PostgreSQL, TensorFlow\n• **Features**: Real-time sentiment analysis, mood tracking dashboard, personalized self-care recommendations, and WebSocket peer chat.\n• **Repository**: [GitHub Repo](https://github.com/AdityaxDeore/Clarity)"
  }
  if (q.includes('tumor') || q.includes('brain') || q.includes('mri')) {
    return "**Brain Tumor Detection System** (Aug – Oct 2025) is a medical image classification application.\n\n• **Tech Stack**: Python, OpenCV, Scikit-learn, NumPy\n• **Features**: MRI scan image preprocessing, tumor classification model with confidence scoring, and 3D bounding box visualizer.\n• **Repository**: [GitHub Repo](https://github.com/AdityaxDeore/brain-tumor-detection)"
  }
  if (q.includes('project') || q.includes('portfolio') || q.includes('built') || q.includes('developed')) {
    return "Aditya has built several interesting projects:\n\n1. **Code Campus**: A proctored coding platform with a VS Code-style IDE. Built with React, Node.js, MongoDB, and TypeScript.\n2. **Clarity**: An AI mental wellness platform utilizing sentiment analysis. Built with React, Node.js, PostgreSQL, and TensorFlow.\n3. **Brain Tumor Detection**: A computer vision model to identify brain tumors from MRI scans. Built using Python, OpenCV, and Scikit-learn.\n\nWhich of these would you like to hear more about?"
  }
  if (q.includes('skill') || q.includes('technolog') || q.includes('languages') || q.includes('frameworks') || q.includes('python') || q.includes('react') || q.includes('database') || q.includes('frontend') || q.includes('backend') || q.includes('java') || q.includes('c++')) {
    return "Here is a summary of Aditya's technical skills:\n\n• **Languages**: Python, C++, JavaScript, TypeScript, Java\n• **AI/ML**: TensorFlow, PyTorch, Scikit-learn, OpenCV, Pandas, NumPy, ML Pipelines\n• **Frontend**: React, Next.js, HTML5, CSS3, Tailwind CSS\n• **Backend & DB**: Node.js, Express, MongoDB, PostgreSQL, MySQL\n• **Tools**: Git, GitHub, Linux, Docker, Cursor AI, VS Code\n\nWould you like details on any specific project where he used these?"
  }
  if (q.includes('experience') || q.includes('wipro') || q.includes('itsa') || q.includes('intern') || q.includes('job') || q.includes('work') || q.includes('history')) {
    return "Aditya's experience includes:\n\n• **Web Development Associate @ ITSA - PCCOE** (2025 – Present): Developing and maintaining event websites and student initiative platforms. Contributed to frontend/backend logic and AI projects using React, JS, and Node.js.\n• **Intern Team Leader @ Wipro DICE** (Mar – Apr 2025): Led a team of 4 interns in building TensorFlow machine learning models for real-time object detection."
  }
  if (q.includes('resume') || q.includes('cv') || q.includes('download') || q.includes('pdf') || q.includes('docx')) {
    return "You can view or download Aditya's resume:\n\n• **Download PDF**: [Aditya_Deore_Resume.pdf](file:///assets/files/Aditya_Deore_Resume.pdf)\n• **Download Word Document**: [Aditya_Deore_Resume.docx](file:///assets/files/Aditya_Deore_Resume.docx)\n• **View on Google Drive**: [Google Drive Link](https://drive.google.com/drive/folders/1RB-_rTcFMZ1rljaqO_W91Gng4fIYWAq8?usp=sharing)"
  }
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('linkedin') || q.includes('github') || q.includes('hire') || q.includes('reach') || q.includes('mail')) {
    return "Here is how you can contact Aditya Deore:\n\n• **Email**: adityadeorework@gmail.com\n• **Phone**: +91 8010767685\n• **LinkedIn**: [linkedin.com/in/aditya-deore](https://linkedin.com/in/aditya-deore-3a725a263)\n• **GitHub**: [github.com/AdityaxDeore](https://github.com/AdityaxDeore)\n\nYou can also send a direct message through the **Contact Form** on the homepage!"
  }
  if (q.includes('about') || q.includes('who are you') || q.includes('who is') || q.includes('profile') || q.includes('aditya') || q.includes('background') || q.includes('intro')) {
    return "Aditya Chandrajit Deore is an **AI/ML Engineer & Full-Stack Developer** currently pursuing his B.Tech in IT at PCCOE, Pune (2024-2028).\n\nHe is passionate about combining intelligent machine learning systems with modern, scalable full-stack web applications to solve real-world problems. Feel free to ask me about his skills, projects, or experience!"
  }
  
  return "I'm sorry, I am configured as Aditya Deore's portfolio assistant and can only answer questions related to Aditya's skills, experience, projects, or background."
}

async function fetchNvidiaResponse(messages: { role: 'system' | 'user' | 'assistant', content: string }[]): Promise<string> {
  let apiKey = localStorage.getItem('nvidia_nim_api_key')
  if (!apiKey) {
    apiKey = import.meta.env.VITE_NVIDIA_API_KEY
  }

  if (!apiKey) {
    throw new Error('NVIDIA API Key not configured')
  }

  const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'meta/llama-3.1-8b-instruct',
      messages,
      temperature: 0.2,
      max_tokens: 1024,
      top_p: 0.7,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`NVIDIA API response error: ${response.status} ${errorText}`)
  }

  const data = await response.json()
  const content = data.choices?.[0]?.message?.content
  if (!content) {
    throw new Error('Empty response from NVIDIA NIM API')
  }

  return content
}

function ChatMessageText({ text }: { text: string }) {
  const lines = text.split('\n')

  return (
    <div className="chat-message-content">
      {lines.map((line, idx) => {
        let trimmed = line.trim()
        const isBullet = trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*')
        
        if (isBullet) {
          trimmed = trimmed.replace(/^[•\-\*]\s*/, '')
        }

        const parts = []
        let currentText = trimmed
        const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g
        let match
        let lastIndex = 0

        while ((match = regex.exec(currentText)) !== null) {
          const matchIndex = match.index
          const matchStr = match[0]

          if (matchIndex > lastIndex) {
            parts.push({
              type: 'text',
              val: currentText.substring(lastIndex, matchIndex),
            })
          }

          if (matchStr.startsWith('**') && matchStr.endsWith('**')) {
            parts.push({
              type: 'bold',
              val: matchStr.slice(2, -2),
            })
          } else if (matchStr.startsWith('[') && matchStr.includes('](')) {
            const labelEnd = matchStr.indexOf(']')
            const urlStart = matchStr.indexOf('(') + 1
            const urlEnd = matchStr.indexOf(')')
            parts.push({
              type: 'link',
              label: matchStr.substring(1, labelEnd),
              url: matchStr.substring(urlStart, urlEnd),
            })
          }

          lastIndex = regex.lastIndex
        }

        if (lastIndex < currentText.length) {
          parts.push({
            type: 'text',
            val: currentText.substring(lastIndex),
          })
        }

        const contentNode = parts.map((part, pIdx) => {
          if (part.type === 'bold') {
            return <strong key={pIdx}>{part.val}</strong>
          }
          if (part.type === 'link') {
            return (
              <a
                key={pIdx}
                href={part.url}
                target="_blank"
                rel="noopener noreferrer"
                className="chat-message-link"
              >
                {part.label}
              </a>
            )
          }
          return part.val
        })

        if (isBullet) {
          return (
            <div key={idx} className="chat-message-bullet">
              <span className="bullet-dot">•</span>
              <div className="bullet-text">{contentNode}</div>
            </div>
          )
        }

        return (
          <p key={idx} className={trimmed === '' ? 'chat-message-empty-line' : 'chat-message-line'}>
            {contentNode}
          </p>
        )
      })}
    </div>
  )
}

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [apiKeyInput, setApiKeyInput] = useState(() => localStorage.getItem('nvidia_nim_api_key') || '')
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hi! I am Aditya's conversational AI assistant. Ask me anything about his projects, experience, skills, or how to contact him!",
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatPanelRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Auto-scroll when messages update or typing state changes
  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  // Prevent background scrolling on mobile/maximized when open
  useEffect(() => {
    if (isOpen && (window.innerWidth <= 768 || isMaximized)) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, isMaximized])

  const handleSendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInputText('')
    setIsTyping(true)

    try {
      const history = [
        { role: 'system' as const, content: SYSTEM_PROMPT },
        ...messages.map((m) => ({
          role: m.sender === 'user' ? 'user' as const : 'assistant' as const,
          content: m.text,
        })),
        { role: 'user' as const, content: trimmed },
      ]

      let responseText = ''
      const apiKey = localStorage.getItem('nvidia_nim_api_key') || import.meta.env.VITE_NVIDIA_API_KEY
      
      if (apiKey) {
        responseText = await fetchNvidiaResponse(history)
      } else {
        // Fallback with realistic delay
        await new Promise((resolve) => setTimeout(resolve, 600))
        responseText = generateLocalResponse(trimmed)
      }

      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMsg])
    } catch (error) {
      console.warn('NVIDIA NIM API failed, falling back to local query router.', error)
      await new Promise((resolve) => setTimeout(resolve, 400))
      const responseText = generateLocalResponse(trimmed)
      
      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMsg])
    } finally {
      setIsTyping(false)
    }
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(inputText)
  }

  const handleSaveApiKey = () => {
    localStorage.setItem('nvidia_nim_api_key', apiKeyInput.trim())
    setShowSettings(false)
  }

  const handleClearApiKey = () => {
    localStorage.removeItem('nvidia_nim_api_key')
    setApiKeyInput('')
    setShowSettings(false)
  }

  return (
    <div className={`floating-chatbot-wrapper ${isMaximized ? 'floating-chatbot-wrapper--maximized' : ''}`}>
      {/* Blurred Backdrop when Maximized */}
      <AnimatePresence>
        {isOpen && isMaximized && (
          <motion.div
            className="chat-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMaximized(false)}
          />
        )}
      </AnimatePresence>

      {/* Floating Chat Trigger Button */}
      {!isMaximized && (
        <button
          type="button"
          className={`floating-chatbot-trigger ${isOpen ? 'floating-chatbot-trigger--active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Hide chatbot' : 'Show chatbot'}
        >
          {isOpen ? (
            <X className="chatbot-icon" size={24} />
          ) : (
            <MessageSquare className="chatbot-icon" size={24} />
          )}
        </button>
      )}

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatPanelRef}
            className={`floating-chatbot-panel ${isMaximized ? 'floating-chatbot-panel--maximized' : ''}`}
            initial={isMaximized ? { opacity: 0, scale: 0.95 } : { opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={isMaximized ? { opacity: 0, scale: 0.95 } : { opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="chat-header">
              <div className="chat-header-info">
                <div className="chat-avatar">
                  <Bot size={20} className="avatar-icon" />
                  <span className="online-indicator"></span>
                </div>
                <div>
                  <h3 className="chat-title">Aditya's Assistant</h3>
                  <p className="chat-status">Online · AI powered</p>
                </div>
              </div>
              <div className="chat-header-actions">
                <button
                  type="button"
                  className="chat-header-action-btn"
                  onClick={() => setShowSettings(!showSettings)}
                  title="Settings"
                  aria-label="Settings"
                >
                  <Settings size={16} />
                </button>
                <button
                  type="button"
                  className="chat-header-action-btn"
                  onClick={() => setIsMaximized(!isMaximized)}
                  title={isMaximized ? "Minimize Window" : "Maximize Window"}
                  aria-label={isMaximized ? "Minimize Window" : "Maximize Window"}
                >
                  {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
                <button 
                  type="button" 
                  className="chat-header-action-btn close-action-btn" 
                  onClick={() => {
                    setIsOpen(false)
                    setIsMaximized(false)
                  }}
                  title="Close Chat"
                  aria-label="Close Chat"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Main Area (Content + Settings layer) */}
            <div className="chat-body-wrapper">
              {/* Settings Screen */}
              {showSettings && (
                <div className="chat-settings-overlay">
                  <div className="settings-card">
                    <div className="settings-header">
                      <h4>API Configuration</h4>
                      <button 
                        type="button" 
                        className="settings-close" 
                        onClick={() => setShowSettings(false)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="settings-body">
                      <p className="settings-desc">
                        Provide your <strong>NVIDIA NIM API Key</strong> to activate live AI reasoning.
                        The key is securely stored in your browser's local cache (`localStorage`) and never leaves your computer.
                      </p>
                      
                      <div className="settings-field">
                        <label className="settings-label">NVIDIA API Key</label>
                        <input
                          type="password"
                          className="settings-input"
                          placeholder="nvapi-xxxxxxxxxxxxxxxxxxxxxxxxxxx"
                          value={apiKeyInput}
                          onChange={(e) => setApiKeyInput(e.target.value)}
                        />
                      </div>

                      <div className="settings-actions">
                        <button
                          type="button"
                          className="settings-btn settings-btn-save"
                          onClick={handleSaveApiKey}
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          className="settings-btn settings-btn-clear"
                          onClick={handleClearApiKey}
                        >
                          Delete Key
                        </button>
                      </div>
                      
                      <div className="settings-info-box">
                        <p><strong>Configured Model:</strong> meta/llama-3.1-8b-instruct</p>
                        <p><strong>Base Endpoint:</strong> integrate.api.nvidia.com</p>
                        <p><strong>Strict Guardrail:</strong> Asserts answer constraints to Aditya's CV profile details exclusively.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Messages Area */}
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
                    <div className="chat-bubble">
                      <ChatMessageText text={msg.text} />
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="chat-message-row msg-assistant">
                    <div className="msg-avatar">
                      <Sparkles size={12} />
                    </div>
                    <div className="chat-bubble typing-bubble">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Suggestions Preset Options - Wrapped Grid (fully visible) */}
            <div className="chat-suggestions-container">
              <p className="suggestions-header-label">Suggested Questions</p>
              <div className="chat-suggestions-grid">
                {SUGGESTIONS.map((sug, sIdx) => (
                  <button
                    key={sIdx}
                    type="button"
                    className="suggestion-chip"
                    onClick={() => handleSendMessage(sug)}
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Action Form */}
            <form className="chat-input-form" onSubmit={handleSubmit}>
              <input
                type="text"
                className="chat-text-input"
                placeholder="Ask me about Aditya..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


