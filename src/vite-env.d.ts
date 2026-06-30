/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NVIDIA_API_KEY?: string
  readonly VITE_NVIDIA_BASE_URL?: string
  readonly VITE_NVIDIA_MODEL?: string
  readonly VITE_GEMINI_API_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

import * as React from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-player': any;
    }
  }
}