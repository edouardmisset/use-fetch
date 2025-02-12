import { useState, useCallback, Dispatch, SetStateAction } from 'react'

export const useToggle = (defaultValue = false): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [bool, setBool] = useState(defaultValue)
  // Define and memorize toggler function in case we pass down the component,
  const toggle = useCallback(() => setBool(b => !b), [])
  return [bool, toggle]
}
