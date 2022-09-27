import { useState, useCallback } from 'react'

export const useToggle = (initialState = false): [boolean, VoidFunction] => {
  const [state, setState] = useState<boolean>(initialState)
  // Define and memorize toggler function in case we pass down the component,
  const toggle = useCallback<VoidFunction>(() => setState(state => !state), [])
  return [state, toggle]
}
