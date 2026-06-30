import { ChatMessageText } from '@/components/ui/ChatMessageText'
import { ChatSuggestions } from '@/components/ui/ChatSuggestions'
import {
  RECRUITER_SUGGESTIONS,
  RECRUITER_SYSTEM_PROMPT,
  getGeminiApiKey,
  sendPortfolioChatMessage,
  type ChatHistoryMessage,
} from '@/lib/portfolioChat'
import { Send } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import './ResumeRecruiterChat.css'

type Message = {
  id: string
  sender: 'user' | 'assistant'
  text: string
}

export function ResumeRecruiterChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `### AI INSIGHTS

* **Education**: B.Tech in Information Technology at Pimpri Chinchwad College of Engineering (PCCOE), Pune (2024 - 2028).
* **Experience in short**:
  * **ITSA (Software Developer)**: Engineered event platform serving 3,500+ registrations.
  * **Personify (AI/ML Intern)**: Developed TensorFlow computer vision models with 94%+ accuracy.
* **Skills**: Python, TensorFlow, React, Node.js, Machine Learning, Data Structures, Git.
* **Certifications**: IBM Data Analyst, MLSC Hackathon Qualifier.

---

> **Aditya is a highly curious, execution-driven engineer** who excels at bridging complex machine learning architectures with production full-stack systems. He designs robust APIs, optimizes edge models, and obsession-polishes UI interactions so AI features feel native inside real products.`,
    },
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [aiEnabled, setAiEnabled] = useState(() => Boolean(getGeminiApiKey()))
  const messagesContainerRef = useRef<HTMLDivElement>(null)



  useEffect(() => {
    const syncAiStatus = () => setAiEnabled(Boolean(getGeminiApiKey()))
    syncAiStatus()
    window.addEventListener('storage', syncAiStatus)
    return () => window.removeEventListener('storage', syncAiStatus)
  }, [])

  const handleSendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed) return

      const userMsg: Message = {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: trimmed,
      }

      setMessages((prev) => [...prev, userMsg])
      setInputText('')
      setIsTyping(true)

      try {
        const history: ChatHistoryMessage[] = messages.map((m) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text,
        }))

        const responseText = await sendPortfolioChatMessage(
          RECRUITER_SYSTEM_PROMPT,
          history,
          trimmed
        )

        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            sender: 'assistant',
            text: responseText,
          },
        ])
      } finally {
        setIsTyping(false)
      }
    },
    [messages]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(inputText)
  }

  return (
    <div className="resume-recruiter-chat">
      <header className="resume-recruiter-chat__header">
        <div className="resume-recruiter-chat__brand">
          <span className="resume-recruiter-chat__avatar" aria-hidden="true" style={{ background: '#F5F2EB', borderColor: '#E3D7C5' }}>
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" style={{ width: '16px', height: '16px' }}>
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                fill="#D97706"
              />
            </svg>
          </span>
          <div className="resume-recruiter-chat__titles">
            <span className="resume-recruiter-chat__name">Claude</span>
            <span className="resume-recruiter-chat__tag">Recruiter</span>
          </div>
        </div>
        <div className="resume-recruiter-chat__meta">
          <span className="resume-recruiter-chat__ai-badge resume-recruiter-chat__ai-badge--live">
            <span className="resume-recruiter-chat__ai-dot" aria-hidden="true" />
            AI INSIGHTS
          </span>
        </div>
      </header>

      <div className="resume-recruiter-chat__messages" ref={messagesContainerRef}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`resume-recruiter-chat__row${
              msg.sender === 'user' ? ' resume-recruiter-chat__row--user' : ''
            }`}
          >
            <div className="resume-recruiter-chat__bubble">
              {msg.id === 'welcome' ? (
                <div className="recruiter-welcome-insights">
                  <header className="recruiter-welcome-insights__header">
                    <h4>AI INSIGHTS REPORT</h4>
                    <p>A quick summary of Aditya's professional profile</p>
                  </header>
                  
                  <div className="recruiter-welcome-insights__grid">
                    <div className="recruiter-insight-box">
                      <div className="recruiter-insight-box__content">
                        <h5>Education</h5>
                        <p>B.Tech IT @ PCCOE, Pune (2024-2028)</p>
                      </div>
                    </div>

                    <div className="recruiter-insight-box">
                      <div className="recruiter-insight-box__content">
                        <h5>Experience</h5>
                        <p>Software Developer at ITSA &amp; AI Intern at Personify</p>
                      </div>
                    </div>

                    <div className="recruiter-insight-box">
                      <div className="recruiter-insight-box__content">
                        <h5>Top Skills</h5>
                        <p>TensorFlow, Python, React, Node.js, ML &amp; Web Stacks</p>
                      </div>
                    </div>

                    <div className="recruiter-insight-box">
                      <div className="recruiter-insight-box__content">
                        <h5>Certifications</h5>
                        <p>IBM Data Analyst, Hackathon Qualifier</p>
                      </div>
                    </div>
                  </div>

                  <div className="recruiter-welcome-insights__summary">
                    <p>
                      <strong>Aditya is an execution-focused engineer</strong> who integrates high-accuracy machine learning architectures directly into live full-stack products.
                    </p>
                  </div>
                </div>
              ) : (
                <ChatMessageText text={msg.text} isAssistant={msg.sender === 'assistant'} isMaximized={false} />
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="resume-recruiter-chat__row">
            <div className="resume-recruiter-chat__bubble resume-recruiter-chat__bubble--typing">
              <span className="resume-recruiter-chat__dot" />
              <span className="resume-recruiter-chat__dot" />
              <span className="resume-recruiter-chat__dot" />
            </div>
          </div>
        )}
      </div>

      <ChatSuggestions
        items={RECRUITER_SUGGESTIONS}
        onSelect={handleSendMessage}
        disabled={isTyping}
        label="Quick questions"
      />

      <form className="resume-recruiter-chat__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="resume-recruiter-chat__input"
          placeholder={aiEnabled ? 'Ask anything about resume fit...' : 'Ask about resume fit...'}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isTyping}
          aria-label="Ask the recruiter assistant"
        />
        <button
          type="submit"
          className="resume-recruiter-chat__send"
          disabled={!inputText.trim() || isTyping}
          aria-label="Send message"
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  )
}
