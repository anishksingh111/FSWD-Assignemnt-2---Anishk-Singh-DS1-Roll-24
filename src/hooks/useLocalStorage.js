import { useEffect, useState } from 'react'
import { readJSON, writeJSON } from '../utils/storage'

// Beginner note: this hook keeps React state + localStorage in sync.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readJSON(key, initialValue))

  useEffect(() => {
    writeJSON(key, value)
  }, [key, value])

  return [value, setValue]
}

