import { useState, useCallback, Dispatch, SetStateAction } from 'react'

export const useToggle = (
  defaultValue?: boolean,
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [value, setValue] = useState<boolean>(Boolean(defaultValue))
  // Define and memorize toggler function in case we pass down the component,
  const toggle = useCallback(() => setValue(val => !val), [])
  return [value, toggle]
}
