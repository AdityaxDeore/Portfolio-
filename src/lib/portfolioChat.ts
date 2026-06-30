import { ADITYA_INFO } from '@/data/adityaInfo'

export type ChatRole = 'system' | 'user' | 'assistant'

export type ChatHistoryMessage = {
  role: ChatRole
  content: string
}

const OFF_TOPIC_REFUSAL =
  "I am configured as Aditya Deore's portfolio assistant. While I can answer general technical or design questions, I'd love to tell you how that relates to Aditya's work!"

export const PORTFOLIO_SYSTEM_PROMPT = `You are Aditya Deore's advanced AI portfolio assistant. Here is all the professional info about Aditya:

${ADITYA_INFO}

Instructions:
1. You are a highly intelligent, warm, and helpful AI assistant representing Aditya Deore.
2. Answer questions about Aditya's skills, experience, projects, achievements, and background with detailed, professional, and structured responses.
3. If asked about unrelated topics (e.g. general coding questions, design methodologies, writing code, explainable AI, math, or computer vision concepts), answer them accurately and nicely, but always find a creative way to relate the concepts back to Aditya's work, experience, or skills where possible. Show your engineering capability as a representation of Aditya's high standards.
4. Use professional markdown formatting: headings, bullet points, bold keywords, lists, and tables where appropriate to make the info highly readable.
5. Provide clickable markdown links ([label](url)) for GitHub, LinkedIn, and resume links.
`

export const RECRUITER_SYSTEM_PROMPT = `${PORTFOLIO_SYSTEM_PROMPT}

You are also a concise recruiter / ATS reviewer for Aditya's resume.
- For resume fit, strengths, keywords, gaps, or improvements: give recruiter-style bullets
- Mention ML, computer vision, and full-stack role fit when relevant
- Stay grounded in Aditya's actual experience and projects
`

export const PORTFOLIO_SUGGESTIONS = [
  'Tell me about Aditya',
  'What are his core skills?',
  'Show me his projects',
  'Code Campus details',
  'Brain tumor ML project',
  'Where has he worked?',
  'How do I view his resume?',
  'How can I contact him?',
  'Is he open to internships?',
] as const

export const RECRUITER_SUGGESTIONS = [
  'Who is Aditya?',
  'Featured Projects',
  'Technical Expertise',
  'AI & Machine Learning',
  'Experience & Leadership',
  'Achievements & Certifications',
  'Why Work With Me?',
  'Get in Touch',
] as const

export type RecruiterSuggestion = (typeof RECRUITER_SUGGESTIONS)[number]

export const RECRUITER_PRESET_RESPONSES: Record<RecruiterSuggestion, string> = {
  'Who is Aditya?':
    '**Aditya Deore** is a Software Developer at ITSA and former AI/ML Intern at Personify. He is pursuing his B.Tech in Information Technology at PCCOE, Pune (2024-2028), and builds intelligent full-stack products.',
  'Featured Projects':
    '• **CodeCampus**: Educational platform serving 90+ students.\n• **Project Clarity**: Event platform for ITSA supporting 3,500+ participants.\n• **Brain Tumor detection**: Custom CNN classifier reaching 96.3% accuracy.',
  'Technical Expertise':
    '• **Frontend**: React, TypeScript, Tailwind CSS, HTML/CSS.\n• **Backend**: Node.js, Express, REST APIs, WebSockets.\n• **Databases**: MongoDB, PostgreSQL, SQL.',
  'AI & Machine Learning':
    '• **Frameworks**: TensorFlow, PyTorch, Keras, NumPy, Pandas.\n• **Focus areas**: Computer Vision, CNN optimization, Transfer Learning, automated data pipelines.',
  'Experience & Leadership':
    '• **ITSA (Software Development Associate)**: Built and deployed the registration system for 3,500+ students.\n• **Personify (AI/ML Intern)**: Built TensorFlow models and reduced latency by 30%.',
  'Achievements & Certifications':
    '• IBM Data Analyst Certified.\n• MLSC Hackathon Qualifier.\n• Shipped production products serving hundreds of active users.',
  'Why Work With Me?':
    'Aditya bridges the gap between AI codebases and full-stack systems. He understands database schemas, API design, and model inference latency, writing production-ready code.',
  'Get in Touch':
    '• **Email**: adityadeore011@gmail.com\n• **LinkedIn**: [linkedin.com/in/aditya-deore-3a725a263](https://linkedin.com/in/aditya-deore-3a725a263)\n• **GitHub**: [github.com/AdityaxDeore](https://github.com/AdityaxDeore)\n• **Phone**: +91 80107 67685',
}

export function getRecruiterPresetResponse(query: string): string | null {
  const normalized = query.trim().toLowerCase()
  for (const suggestion of RECRUITER_SUGGESTIONS) {
    if (suggestion.toLowerCase() === normalized) {
      return RECRUITER_PRESET_RESPONSES[suggestion]
    }
  }
  return null
}

export function getGeminiApiKey(): string | undefined {
  return localStorage.getItem('gemini_api_key') || 
         import.meta.env.VITE_GEMINI_API_KEY
}

export function getNvidiaApiKey(): string | undefined {
  return localStorage.getItem('nvidia_nim_api_key') || 
         import.meta.env.VITE_NVIDIA_API_KEY
}

export async function fetchGeminiResponse(
  systemPrompt: string,
  history: ChatHistoryMessage[]
): Promise<string> {
  const apiKey = getGeminiApiKey()

  if (!apiKey) {
    throw new Error('Gemini API Key not configured')
  }

  // Format messages for Gemini api contents format: role 'user' or 'model'
  const contents = history.map((msg) => {
    const role = msg.role === 'user' ? 'user' : 'model'
    return {
      role,
      parts: [{ text: msg.content }]
    }
  })

  // Use the standard Gemini 1.5 Flash endpoint
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents,
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 1024,
      }
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Gemini API response error: ${response.status} ${errorText}`)
  }

  const data = await response.json()
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (!content) {
    throw new Error('Empty response from Gemini API')
  }

  return content
}

export async function fetchNvidiaResponse(
  systemPrompt: string,
  history: ChatHistoryMessage[]
): Promise<string> {
  const apiKey = getNvidiaApiKey()
  if (!apiKey) {
    throw new Error('NVIDIA API Key not configured')
  }

  const baseUrl = import.meta.env.VITE_NVIDIA_BASE_URL ?? 'https://integrate.api.nvidia.com/v1'
  const model = import.meta.env.VITE_NVIDIA_MODEL ?? 'meta/llama-3.1-8b-instruct'

  // Format history messages for OpenAI/NIM style completions API
  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.map((h) => ({ role: h.role, content: h.content }))
  ]

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.2,
      max_tokens: 1024,
      top_p: 0.7,
      stream: false,
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

export function generateLocalResponse(query: string): string {
  const preset = getRecruiterPresetResponse(query)
  if (preset) return preset

  const q = query.toLowerCase()

  const words = q.split(/\W+/)
  const isGreeting = words.includes('hi') || words.includes('hello') || words.includes('hey')

  if (isGreeting) {
    return "Hi! Ask me about Aditya's **background**, **skills**, **projects**, **experience**, or **resume**."
  }
  if (q.includes('codecampus') || q.includes('code campus')) {
    return "**CodeCampus** — Distributed ed-tech platform featuring real-time proctored coding execution, video streaming, subscription monetization, and multiple subsystems.\n\n[GitHub](https://github.com/AdityaxDeore/codecampus)"
  }
  if (q.includes('clarity') || q.includes('prayaas')) {
    return "**Project Clarity (Prayaas Education)** — Multi-module educational platform organizing curriculum planning, evaluation metrics, learning analytics, and administration.\n\n[GitHub](https://github.com/AdityaxDeore/Clarity)"
  }
  if (q.includes('tumor') || q.includes('brain') || q.includes('mri')) {
    return "**Brain Tumor Detection** — End-to-end ML classification pipeline parsing brain scans to locate and segment tumor areas with 96.3% accuracy.\n\n[GitHub](https://github.com/AdityaxDeore/brain-tumor-detection)"
  }
  if (q.includes('dementia')) {
    return "**Dementia Diagnostic AI** — Research-heavy ML system involving medical imaging, volumetric MRI processing, and diagnostic pipelines."
  }
  if (q.includes('palantir') || q.includes('ontology')) {
    return "**Palantir Integration** — Enterprise data engineering, ontology mapping, structured/unstructured data pipelines."
  }
  if (q.includes('audio') || q.includes('cnn')) {
    return "**Explainable Audio CNNs** — Deep learning research project with CNNs and biological neural signal interpretation."
  }
  if (q.includes('shihiko') || q.includes('e-commerce')) {
    return "**shihiko-E-Commerce-Website** — Frontend e-commerce implementation emphasizing UI/UX and responsive design."
  }
  if (q.includes('obamify')) {
    return "**Obamify** — Specialized graphics application focused on image transformations and packaging."
  }
  if (q.includes('project') || q.includes('portfolio') || q.includes('built')) {
    return "Key projects: **CodeCampus**, **Dementia Diagnostic AI**, **Project Clarity (Prayaas Education)**, **Palantir Integration**, **Brain Tumor Detection**, **Explainable Audio CNNs**, **PORTFOLIO**, **shihiko-E-Commerce-Website**, **Obamify**."
  }
  if (q.includes('skills') || q.includes('toolkit') || q.includes('languages') || q.includes('frameworks')) {
    return "**Technical Toolkit**\n\n• **Frontend**: React, TypeScript, Tailwind CSS\n• **Backend**: Node.js, Express, REST APIs\n• **AI/ML**: TensorFlow, Python, NumPy, Pandas, Scikit-learn"
  }
  if (q.includes('experience') || q.includes('intern') || q.includes('itsa') || q.includes('personify')) {
    return "Experience: **Software Development Associate @ ITSA** and **AI/ML Intern @ Personify**."
  }
  if (q.includes('resume') || q.includes('cv') || q.includes('pdf')) {
    return "Resume:\n\n• [PDF](/assets/files/Aditya_Deore_Resume.pdf)\n• [Word](/assets/files/Aditya_Deore_Resume.docx)"
  }
  if (q.includes('contact') || q.includes('email') || q.includes('linkedin') || q.includes('hire')) {
    return "**Contact**\n\n• adityadeorework@gmail.com\n• [LinkedIn](https://linkedin.com/in/aditya-deore-3a725a263)\n• [GitHub](https://github.com/AdityaxDeore)"
  }
  if (q.includes('intern')) {
    return "Aditya is pursuing B.Tech IT at PCCOE and is open to **AI/ML and full-stack internships** where he can ship production-minded work."
  }
  if (q.includes('about') || q.includes('who') || q.includes('aditya')) {
    return "Aditya Chandrajit Deore — **AI/ML Engineer & Full-Stack Developer** at PCCOE, Pune."
  }

  return OFF_TOPIC_REFUSAL
}

export async function sendPortfolioChatMessage(
  systemPrompt: string,
  history: ChatHistoryMessage[],
  userText: string
): Promise<string> {
  const fullHistory: ChatHistoryMessage[] = [
    ...history,
    { role: 'user', content: userText }
  ]

  // Priority 1: Google Gemini API
  if (getGeminiApiKey()) {
    try {
      return await fetchGeminiResponse(systemPrompt, fullHistory)
    } catch (error) {
      console.warn('Gemini API failed, attempting NVIDIA NIM fallback.', error)
    }
  }

  // Priority 2: NVIDIA NIM API Fallback
  if (getNvidiaApiKey()) {
    try {
      return await fetchNvidiaResponse(systemPrompt, fullHistory)
    } catch (error) {
      console.warn('NVIDIA NIM API failed, using local response fallback.', error)
    }
  }

  // Priority 3: Local response fallback
  await new Promise((resolve) => setTimeout(resolve, 450))
  return getRecruiterPresetResponse(userText) ?? generateLocalResponse(userText)
}
