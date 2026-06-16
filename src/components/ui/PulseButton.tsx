import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { useState } from 'react'
import './PulseButton.css'

type PulseButtonProps = {
  children: ReactNode
  className?: string
  pulseClassName?: string
  showLoaderOnClick?: boolean
} & ComponentPropsWithoutRef<'a'>

export function PulseButton({
  children,
  className = '',
  pulseClassName = '',
  showLoaderOnClick = false,
  onClick,
  ...props
}: PulseButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleClick: PulseButtonProps['onClick'] = (event) => {
    onClick?.(event)
    if (!showLoaderOnClick || event.defaultPrevented) return

    setLoading(true)
    window.setTimeout(() => setLoading(false), 900)
  }

  return (
    <span className={cn('pulse-button', pulseClassName, loading && 'pulse-button--loading')}>
      <span className="pulse-button__rings" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
      <a className={cn('pulse-button__link', className)} onClick={handleClick} {...props}>
        <span className="pulse-button__loader" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="pulse-button__label">{children}</span>
      </a>
    </span>
  )
}