/// <reference types="vite/client" />

import * as React from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-player': any;
    }
  }
}