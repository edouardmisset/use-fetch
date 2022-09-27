import { RefObject, useCallback, useEffect } from 'react'

type Handler = (event: MouseEvent) => void

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
): void => {
  const handleClick = useCallback(
    (e: MouseEvent) => {
      const element = ref.current

      if (element && !element.contains(e.target as Node)) handler(e)
    },
    [handler, ref],
  )

  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [handleClick])
}
