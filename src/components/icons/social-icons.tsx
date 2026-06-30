type IconProps = {
  size?: number
}

export function GithubIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function LinkedinIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-12h4v2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="2"
        y="9"
        width="4"
        height="12"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  )
}

export function MailIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 6h16v12H4V6Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="m4 7 8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArrowUpRightIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function WhatsappIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17.49 15.3a1.09 1.09 0 0 1-.72-.31 19 19 0 0 1-2.52-2.52 1.09 1.09 0 0 1-.1-.83 6 6 0 0 0 .61-1.67 1.09 1.09 0 0 0-.25-.94l-2.09-2.09a1.09 1.09 0 0 0-1.54 0l-.82.82a2.38 2.38 0 0 0-.58 2.35 15.11 15.11 0 0 0 6.11 6.11 2.38 2.38 0 0 0 2.35-.58l.82-.82a1.09 1.09 0 0 0 0-1.54l-2.09-2.09a1.09 1.09 0 0 0-.94-.25 6 6 0 0 0-1.67.61.94.94 0 0 1-.31.06Z" />
      <path d="M22 11.5a10 10 0 0 1-17.56 6.55L2 22l4-1.95A10 10 0 1 1 22 11.5Z" />
    </svg>
  )
}