import { rmSync } from 'node:fs'
import { join } from 'node:path'

const cacheDir = join(process.cwd(), 'node_modules', '.vite')

try {
  rmSync(cacheDir, { recursive: true, force: true })
  console.log('[vite] Cleared stale dependency cache (node_modules/.vite)')
} catch {
  // Cache may not exist yet — safe to ignore.
}