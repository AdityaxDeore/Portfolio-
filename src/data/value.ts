export const valueSection = {
  label: '03 — Expertise',
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
  },
  {
    id: 'fullstack',
    label: 'Full-Stack Applications',
    tag: 'UI · API · Infra',
    description: 'End-to-end web apps — polished interfaces backed by reliable APIs.',
    visual: 'stack',
  },
  {
    id: 'data',
    label: 'Data-Driven Problem Solving',
    tag: 'Insight · Signal · Impact',
    description: 'Turning messy data into clear insights and measurable outcomes.',
    visual: 'dataflow',
  },
  {
    id: 'ai-agents',
    label: 'AI Agents',
    tag: 'Reason · Act · Integrate',
    description: 'Autonomous agents that reason, act, and integrate into real workflows.',
    visual: 'agents',
  },
  {
    id: 'automation',
    label: 'Intelligent Automation',
    tag: 'Flow · Logic · Speed',
    description: 'Smart pipelines that eliminate repetitive work without sacrificing control.',
    visual: 'pipeline',
  },
  {
    id: 'ml-systems',
    label: 'Machine Learning Systems',
    tag: 'Inference · Monitor · Iterate',
    description: 'Scalable training, inference, and monitoring built for production.',
    visual: 'tensor',
  },
] as const

export type ValuePillar = (typeof valuePillars)[number]

export const valueMarqueeText = valuePillars
  .map((pillar) => pillar.label)
  .join('  ·  ')