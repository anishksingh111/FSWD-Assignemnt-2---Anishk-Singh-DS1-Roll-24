import { useMemo, useState } from 'react'
import GlassCard from '../../components/ui/GlassCard/GlassCard'
import Button from '../../components/ui/Button/Button'
import { useNotesData } from '../../hooks/useNotesData'
import { useToast } from '../../hooks/useToast'
import styles from './NotesPage.module.css'

export default function NotesPage() {
  const { sortedNotes, addNote, deleteNote, updateNote } = useNotesData()
  const { pushToast } = useToast()
  const [query, setQuery] = useState('')
  const [activeId, setActiveId] = useState(sortedNotes[0]?.id ?? null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return sortedNotes
    return sortedNotes.filter((n) => `${n.title}\n${n.content}`.toLowerCase().includes(q))
  }, [query, sortedNotes])

  const active = sortedNotes.find((n) => n.id === activeId) ?? filtered[0] ?? null

  function onNew() {
    const note = addNote({ title: 'New note', content: '' })
    setActiveId(note.id)
    pushToast({ type: 'success', title: 'Note created', message: 'Saved to localStorage.' })
  }

  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        <GlassCard
          title="Notes"
          subtitle="Capture study notes. Search, edit, delete. Auto-saved in localStorage."
          actions={
            <Button variant="primary" onClick={onNew} type="button">
              + New note
            </Button>
          }
        >
          <input
            className={styles.search}
            placeholder="Search notes…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className={styles.list}>
            {filtered.length === 0 ? (
              <div className={styles.empty}>No notes found.</div>
            ) : (
              filtered.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  className={`${styles.noteRow} ${n.id === active?.id ? styles.active : ''} focusRing`}
                  onClick={() => setActiveId(n.id)}
                >
                  <div className={styles.noteTitle}>{n.title}</div>
                  <div className={styles.notePreview}>{(n.content || '').slice(0, 70) || 'Empty note…'}</div>
                </button>
              ))
            )}
          </div>
        </GlassCard>

        <GlassCard
          title="Editor"
          subtitle={active ? `Last updated: ${new Date(active.updatedAt).toLocaleString()}` : 'Create a note to begin.'}
          actions={
            active && (
              <Button
                variant="danger"
                onClick={() => {
                  deleteNote(active.id)
                  setActiveId(null)
                  pushToast({ type: 'success', title: 'Deleted', message: 'Note removed.' })
                }}
                type="button"
              >
                Delete
              </Button>
            )
          }
        >
          {!active ? (
            <div className={styles.empty}>No active note. Create one to start writing.</div>
          ) : (
            <div className={styles.editor}>
              <input
                className={styles.title}
                value={active.title}
                onChange={(e) => updateNote(active.id, { title: e.target.value })}
                placeholder="Note title"
              />
              <textarea
                className={styles.textarea}
                value={active.content}
                onChange={(e) => updateNote(active.id, { content: e.target.value })}
                placeholder="Write your study notes here…"
              />
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  )
}

