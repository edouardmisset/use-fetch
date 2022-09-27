import { useReducer } from 'react'

interface State {
  loading: boolean
  error: Error | unknown | null
  value: any | null
}

interface Action {
  type: 'start' | 'finish' | 'error'
  value?: any
  error?: Error | unknown
}

export const useAsync = (fn: Function) => {
  const initialState: State = { loading: false, error: null, value: null }
  const stateReducer = (_: State, action: Action): State => {
    switch (action.type) {
      case 'start':
        return { loading: true, error: null, value: null }
      case 'finish':
        return { loading: false, error: null, value: action.value }
      case 'error':
        return { loading: false, error: action.error, value: null }
    }
  }

  const [state, dispatch] = useReducer(stateReducer, initialState)

  const run = async (args = null) => {
    try {
      dispatch({ type: 'start' })
      const value = await fn(args)
      dispatch({ type: 'finish', value })
    } catch (error) {
      dispatch({ type: 'error', error })
    }
  }

  return { ...state, run }
}
