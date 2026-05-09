import { useEffect, useState } from 'react'

export function useAppBoot() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 900)
    return () => clearTimeout(t)
  }, [])

  return { ready }
}

