import type { ReactNode } from 'react'
import type { ButtonVariant } from '../types/ButtonVariant.ts'

export function Button({
  variant = 'secondary',
  href,
  isLarge = false,
  isDisabled = false,
  onClick,
  children
}: {
  variant?: ButtonVariant
  href?: string
  isLarge?: boolean
  isDisabled?: boolean
  onClick?: () => void
  children: ReactNode
}) {
  const className = `button button--${variant}${isLarge ? ' button--large' : ''}`
  if (href) {
    return <a className={className} href={href}>{children}</a>
  }
  return (
    <button type="button" className={className} disabled={isDisabled} onClick={onClick}>
      {children}
    </button>
  )
}
