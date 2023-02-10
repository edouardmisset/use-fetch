import { useEffect, useRef } from 'react'

export const useTitle = (title: string): void => {
  const isDocumentDefined = document !== undefined
  const titleRef = useRef(isDocumentDefined ? document.title : undefined)

  useEffect(() => {
    const previousTitle = titleRef?.current
    if (isDocumentDefined && document.title !== title) {
      document.title = title
    }

    return () => {
      if (previousTitle !== undefined) document.title = previousTitle
    }
  }, [isDocumentDefined, title])
}
