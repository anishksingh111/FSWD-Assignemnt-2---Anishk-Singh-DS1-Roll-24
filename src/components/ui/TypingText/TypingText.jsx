import { useEffect, useMemo, useState } from 'react'

export default function TypingText({ phrases, speedMs = 42, pauseMs = 850, className = '' }) {
  const list = useMemo(() => (Array.isArray(phrases) && phrases.length ? phrases : ['Plan', 'Track', 'Win']), [phrases])
  const [idx, setIdx] = useState(0)
  const [pos, setPos] = useState(0)
  const [dir, setDir] = useState(1) // 1 typing, -1 deleting

  useEffect(() => {
    const word = list[idx]
    const doneTyping = dir === 1 && pos >= word.length
    const doneDeleting = dir === -1 && pos <= 0

    const delay = doneTyping || doneDeleting ? pauseMs : speedMs
    const t = setTimeout(() => {
      if (doneTyping) return setDir(-1)
      if (doneDeleting) {
        setDir(1)
        setIdx((i) => (i + 1) % list.length)
        return
      }
      setPos((p) => p + dir)
    }, delay)

    return () => clearTimeout(t)
  }, [dir, idx, list, pauseMs, pos, speedMs])

  const word = list[idx]
  const text = word.slice(0, pos)

  return (
    <span className={className} aria-label={word}>
      {text}
      <span style={{ opacity: 0.6 }}>|</span>
    </span>
  )
}

