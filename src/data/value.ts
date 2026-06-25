export const valueSection = {
  label: '02 — Expertise',
  title: 'What I Bring to the Table',
  subtitle: 'Scroll through the work — AI, full-stack, and production systems.',
} as const

export const valuePillars = [
  {
    id: 'ai-ml',
    label: 'AI/ML Solutions',
    tag: 'Train · Deploy · Scale',
    description: 'Production ML pipelines, model deployment, and intelligent features that ship.',
    visual: 'neural',
    image: '/motion/Claude Code Finally Fixes the Huge Issue With MCPs.jfif',
  },
  {
    id: 'fullstack',
    label: 'Full-Stack Applications',
    tag: 'UI · API · Infra',
    description: 'End-to-end web apps — polished interfaces backed by reliable APIs.',
    visual: 'stack',
    image: '/motion/Unlock the Secrets of Claude Skills_ Your Ultimate Guide to Customization.jfif',
  },
  {
    id: 'data',
    label: 'Data-Driven Problem Solving',
    tag: 'Insight · Signal · Impact',
    description: 'Turning messy data into clear insights and measurable outcomes.',
    visual: 'dataflow',
    image: '/motion/Anthropic launches new secure tools for Claude Managed Agents (1).jfif',
  },
  {
    id: 'ai-agents',
    label: 'AI Agents',
    tag: 'Reason · Act · Integrate',
    description: 'Autonomous agents that reason, act, and integrate into real workflows.',
    visual: 'agents',
    image: '/motion/Anthropic makes 1M token context standard for Claude 4_6.jfif',
  },
  {
    id: 'automation',
    label: 'Intelligent Automation',
    tag: 'Flow · Logic · Speed',
    description: 'Smart pipelines that eliminate repetitive work without sacrificing control.',
    visual: 'pipeline',
    image: '/motion/Anthropic’s Claude Code now shows how much AI really writes your code.jfif',
  },
  {
    id: 'ml-systems',
    label: 'Machine Learning Systems',
    tag: 'Inference · Monitor · Iterate',
    description: 'Scalable training, inference, and monitoring built for production.',
    visual: 'tensor',
    image: '/motion/Claude Cowork is Anthropic’s big AI agent bet.jfif',
  },
  {
    id: 'cybersecurity',
    label: 'Cybersecurity & Auditing',
    tag: 'Analyze · Secure · Mitigate',
    description: 'Threat analysis, phishing mitigation strategies, and security awareness guidance.',
    visual: 'security',
    image: '/motion/c6567f5021bf3bb7dd66ea3a1b32b85a.jpg',
  },
] as const

export type ValuePillar = (typeof valuePillars)[number]

export const valueMarqueeText = valuePillars
  .map((pillar) => pillar.label)
  .join('  ·  ')