import { useMemo, useState } from 'react'
import GlassCard from '../../components/ui/GlassCard/GlassCard'
import Button from '../../components/ui/Button/Button'
import { useTasksData } from '../../hooks/useTasksData'
import { useToast } from '../../hooks/useToast'
import styles from './TaskManagerPage.module.css'

export default function TaskManagerPage() {
  const { sortedTasks, addTask, deleteTask, toggleTask, updateTask, reorderTask } = useTasksData()
  const { pushToast } = useToast()
  const [draft, setDraft] = useState({ title: '', subject: '', priority: 'medium', deadline: '' })
  const [dragId, setDragId] = useState(null)

  const counts = useMemo(() => {
    const total = sortedTasks.length
    const done = sortedTasks.filter((t) => t.completed).length
    return { total, done }
  }, [sortedTasks])

  function onAdd() {
    if (!draft.title.trim()) {
      pushToast({ type: 'warning', title: 'Task title required', message: 'Type a task name first.' })
      return
    }
    addTask(draft)
    setDraft({ title: '', subject: '', priority: 'medium', deadline: '' })
    pushToast({ type: 'success', title: 'Task added', message: 'Saved to localStorage.' })
  }

  return (
    <div className={styles.page}>
      <GlassCard title="Task Manager" subtitle={`Completed ${counts.done} / ${counts.total} · Drag to reorder`}>
        <div className={styles.form}>
          <input
            className={styles.input}
            placeholder="Task title (e.g., Solve DP sheet)"
            value={draft.title}
            onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
          />
          <input
            className={styles.input}
            placeholder="Subject (optional)"
            value={draft.subject}
            onChange={(e) => setDraft((d) => ({ ...d, subject: e.target.value }))}
          />
          <select
            className={styles.input}
            value={draft.priority}
            onChange={(e) => setDraft((d) => ({ ...d, priority: e.target.value }))}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            className={styles.input}
            type="date"
            value={draft.deadline}
            onChange={(e) => setDraft((d) => ({ ...d, deadline: e.target.value }))}
          />
          <Button variant="primary" onClick={onAdd} type="button">
            Add task
          </Button>
        </div>

        <div className={styles.list}>
          {sortedTasks.length === 0 ? (
            <div className={styles.empty}>No tasks yet. Add your first task above.</div>
          ) : (
            sortedTasks.map((t) => (
              <div
                key={t.id}
                className={`${styles.card} glass`}
                draggable
                onDragStart={() => setDragId(t.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (dragId && dragId !== t.id) reorderTask(dragId, t.id)
                  setDragId(null)
                }}
              >
                <div className={styles.cardLeft}>
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => toggleTask(t.id)}
                    aria-label="Mark complete"
                  />
                  <div className={styles.cardMain}>
                    <div className={`${styles.title} ${t.completed ? styles.done : ''}`}>{t.title}</div>
                    <div className={styles.meta}>
                      {!!t.subject && <span className={styles.tag}>{t.subject}</span>}
                      <span className={styles.priority} data-p={t.priority}>
                        {t.priority}
                      </span>
                      {!!t.deadline && <span className={styles.deadline}>Due {t.deadline}</span>}
                    </div>
                  </div>
                </div>

                <div className={styles.cardRight}>
                  <select
                    className={styles.smallSelect}
                    value={t.priority}
                    onChange={(e) => updateTask(t.id, { priority: e.target.value })}
                    aria-label="Priority"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <button className={styles.del} type="button" onClick={() => deleteTask(t.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </GlassCard>
    </div>
  )
}

