const LOCAL_MOTION_GIFS = [
  '/motion/original_f41036de1b2d0374d1408475523d2b47.gif',
  '/motion/original_b519a22912d25d466fdc23c6922c756b.gif',
  '/motion/original_a34421c365ae1536d96aeb68cf555c2e.gif',
  '/motion/original_911b4b8625d678ce2451d7c942328d3b.gif',
  '/motion/original_7f4fccbfcf35e335b56aaf9f204723eb.gif',
  '/motion/original_6d612022a85211811b15aa287dfb396e.gif',
  '/motion/wipe effect.gif',
  '/motion/Forward — Asana.gif',
  '/motion/Ea8ZiFK_gif (800×446).gif',
  '/motion/Yiting Nan _ Caper Illustration Agency _ Illustration & Animation Hire.gif',
]

const REMOTE_MOTION_GIFS = [
  'https://i.pinimg.com/originals/80/7f/2b/807f2b7d0f9a87fc6ec014e45cd48d5c.gif',
  'https://i.pinimg.com/originals/a8/12/88/a8128843733c1b5f067bc436dfc5dc25.gif',
  'https://i.pinimg.com/originals/9a/15/b2/9a15b21eb8de50e57fec68f679c2bbef.gif',
  'https://i.pinimg.com/originals/a6/f5/a6/a6f5a63744bb3c97bc58058bd3684009.gif',
  'https://i.pinimg.com/originals/19/22/cc/1922cc428306e3b8d4ce6cecce74f541.gif',
  'https://i.pinimg.com/originals/f2/9d/c5/f29dc579dc619ff513651282766e6940.gif',
  'https://i.pinimg.com/originals/a7/be/7a/a7be7ac034929a9e47ebcc3d2018e98a.gif',
  'https://i.pinimg.com/originals/c2/ee/9b/c2ee9bf0ca052d5f3e455c9e1ac39ae5.gif',
  'https://i.pinimg.com/originals/3e/71/67/3e71673f8b7fab3ce9b4d712eca3f7a0.gif',
  'https://i.pinimg.com/originals/73/ab/8d/73ab8d95eb845f010361cdd7f144fa6f.gif',
  'https://i.pinimg.com/originals/a1/86/93/a1869324a6880d245e82de22ab1dce58.gif',
  'https://i.pinimg.com/originals/b6/0b/4d/b60b4d99d13e79a2f236fe019ba54bf7.gif',
  'https://i.pinimg.com/originals/05/07/99/0507997fa78a1559febd4172e533abdb.gif',
  'https://i.pinimg.com/originals/9c/2c/dc/9c2cdc4cb2ef4d8626b7bd959042290a.gif',
  'https://i.pinimg.com/originals/d7/0e/88/d70e8876f616d7a93b6e385888cd2c50.gif',
  'https://i.pinimg.com/originals/82/08/0c/82080c99563446755d3f4e11fbb8720f.gif',
  'https://i.pinimg.com/originals/ac/d3/9a/acd39a47dd474ce0de9d985797981469.gif',
]

const MOTION_GIF_POOL = [...LOCAL_MOTION_GIFS, ...REMOTE_MOTION_GIFS]
const PROJECT_MOTION_USAGE = new Map<string, Set<string>>()

function hashSeed(seed: string) {
  let hash = 0
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) >>> 0
  }
  return hash
}

export function pickMotionAsset(seed: string) {
  const projectKey = seed.split(':', 1)[0] || seed
  const usedAssets = PROJECT_MOTION_USAGE.get(projectKey) ?? new Set<string>()

  if (!PROJECT_MOTION_USAGE.has(projectKey)) {
    PROJECT_MOTION_USAGE.set(projectKey, usedAssets)
  }

  const startIndex = hashSeed(seed) % MOTION_GIF_POOL.length

  for (let offset = 0; offset < MOTION_GIF_POOL.length; offset += 1) {
    const candidate = MOTION_GIF_POOL[(startIndex + offset) % MOTION_GIF_POOL.length]
    if (!usedAssets.has(candidate)) {
      usedAssets.add(candidate)
      return candidate
    }
  }

  const fallback = MOTION_GIF_POOL[startIndex]
  usedAssets.add(fallback)
  return fallback
}
