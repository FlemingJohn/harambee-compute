import { useEffect, useRef } from 'react'

export function useScrollToEnd<ElementType extends HTMLElement>(contentSize: number) {
  const elementRef = useRef<ElementType>(null)
  useEffect(() => {
    const element = elementRef.current
    if (element) element.scrollTop = element.scrollHeight
  }, [contentSize])
  return elementRef
}
