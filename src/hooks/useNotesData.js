import { useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'

export function useNotesData() {
  const [notes, setNotes] = useLocalStorage('notes', [])

  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0))
  }, [notes])

  function addNote(input) {
    const id = crypto?.randomUUID?.() ?? String(Date.now() + Math.random())
    const now = Date.now()
    const note = {
      id,
      title: input.title?.trim() || 'New note',
      content: input.content ?? '',
      updatedAt: now,
    }
    setNotes((n) => [note, ...n])
    return note
  }

  function deleteNote(id) {
    setNotes((n) => n.filter((x) => x.id !== id))
  }

  function updateNote(id, patch) {
    setNotes((n) =>
      n.map((x) => (x.id === id ? { ...x, ...patch, updatedAt: Date.now() } : x)),
    )
  }

  return { notes, sortedNotes, setNotes, addNote, deleteNote, updateNote }
}

