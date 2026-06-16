import { spawn } from 'node:child_process'
import { execSync } from 'node:child_process'
import { rmSync } from 'node:fs'
import { join } from 'node:path'
import { platform } from 'node:os'

const PORT = 5173
const force = process.argv.includes('--force')
const viteBin = join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js')

function cleanViteCache() {
  const cacheDir = join(process.cwd(), 'node_modules', '.vite')
  try {
    rmSync(cacheDir, { recursive: true, force: true })
    console.log('[vite] Cleared stale dependency cache (node_modules/.vite)')
  } catch {
    // Cache may not exist yet.
  }
}

function killPort(port) {
  const os = platform()

  try {
    if (os === 'win32') {
      const output = execSync(`netstat -ano | findstr :${port}`, {
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'ignore'],
      })

      const pids = new Set()
      for (const line of output.split('\n')) {
        if (!line.includes('LISTENING')) continue
        const parts = line.trim().split(/\s+/)
        const pid = parts.at(-1)
        if (pid && pid !== '0') pids.add(pid)
      }

      for (const pid of pids) {
        try {
          execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' })
          console.log(`[vite] Stopped stale process ${pid} on port ${port}`)
        } catch {
          // Process may have already exited.
        }
      }
      return
    }

    execSync(`lsof -ti:${port} | xargs kill -9`, { stdio: 'ignore', shell: true })
    console.log(`[vite] Freed port ${port}`)
  } catch {
    // Port is free — nothing to stop.
  }
}

if (force) {
  cleanViteCache()
}

// Always free 5173 so strictPort never silently fails or falls back to a stale server.
killPort(PORT)

const viteArgs = [viteBin, ...(force ? ['--force'] : [])]
const child = spawn(process.execPath, viteArgs, { stdio: 'inherit' })

child.on('exit', (code) => {
  process.exit(code ?? 0)
})