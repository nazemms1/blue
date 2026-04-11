import { useState, useCallback } from 'react'
import type { LoadingState } from '@shared/types'

interface AsyncState<T> {
  data: T | null
  error: string | null
  status: LoadingState
}

interface UseAsyncReturn<T> extends AsyncState<T> {
  execute: (...args: unknown[]) => Promise<void>
  reset: () => void
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
}

const initialState = <T>(): AsyncState<T> => ({
  data: null,
  error: null,
  status: 'idle',
})

export function useAsync<T>(
  asyncFn: (...args: unknown[]) => Promise<T>
): UseAsyncReturn<T> {
  const [state, setState] = useState<AsyncState<T>>(initialState<T>())

  const execute = useCallback(
    async (...args: unknown[]) => {
      setState({ data: null, error: null, status: 'loading' })
      try {
        const data = await asyncFn(...args)
        setState({ data, error: null, status: 'success' })
      } catch (err) {
        setState({
          data: null,
          error: err instanceof Error ? err.message : 'Unknown error',
          status: 'error',
        })
      }
    },
    [asyncFn]
  )

  const reset = useCallback(() => setState(initialState<T>()), [])

  return {
    ...state,
    execute,
    reset,
    isLoading: state.status === 'loading',
    isSuccess: state.status === 'success',
    isError: state.status === 'error',
  }
}
