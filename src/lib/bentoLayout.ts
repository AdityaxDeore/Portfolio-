/** Deterministic pseudo-random bento tile spans from a seed string. */
export type BentoSpan = {
  col: 1 | 2
  row: 1 | 2
}

const BENTO_POOL: BentoSpan[] = [
  { col: 2, row: 2 },
  { col: 1, row: 1 },
  { col: 1, row: 2 },
  { col: 2, row: 1 },
  { col: 1, row: 1 },
  { col: 1, row: 1 },
  { col: 2, row: 1 },
  { col: 1, row: 2 },
]

function hashString(value: string): number {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

export function getBentoSpan(seed: string, index: number): BentoSpan {
  const poolIndex = (hashString(`${seed}-${index}`) + index) % BENTO_POOL.length
  return BENTO_POOL[poolIndex] ?? { col: 1, row: 1 }
}

export const PROJECT_CARD_VARIANTS = ['tall', 'medium', 'short', 'wide', 'compact'] as const
export type ProjectCardVariant = (typeof PROJECT_CARD_VARIANTS)[number]

const CARD_VARIANT_PATTERN: ProjectCardVariant[] = [
  'tall',
  'medium',
  'short',
  'wide',
  'compact',
  'medium',
  'tall',
  'short',
  'wide',
]

export function getProjectCardVariant(index: number): ProjectCardVariant {
  return CARD_VARIANT_PATTERN[index % CARD_VARIANT_PATTERN.length] ?? 'medium'
}
