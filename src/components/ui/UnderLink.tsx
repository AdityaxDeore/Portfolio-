import type { ComponentPropsWithoutRef, ElementType } from 'react'
import './UnderLink.css'

type UnderLinkProps<T extends ElementType = 'a'> = {
  as?: T
  className?: string
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className'>

export function UnderLink<T extends ElementType = 'a'>({
  as,
  className = '',
  ...props
}: UnderLinkProps<T>) {
  const Component = as ?? 'a'
  return <Component className={`underlink ${className}`.trim()} {...props} />
}