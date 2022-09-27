import { useEffect, useRef } from 'react'

export const useTitle = (title: string): void => {
  const documentDefined = typeof document !== 'undefined'
  const originalTitle = useRef(documentDefined ? document.title : null)

  useEffect(() => {
    if (!documentDefined) return
    const OT = originalTitle?.current

    if (document.title !== title) document.title = title

    return () => {
      if (OT) document.title = OT
    }
  }, [documentDefined, title])
}
