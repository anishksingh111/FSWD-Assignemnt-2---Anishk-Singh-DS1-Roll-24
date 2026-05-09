import { useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'

export function useTasksData() {
  const [tasks, setTasks] = useLocalStorage('tasks', [])

  const sorted = useMemo(() => {
    return [...tasks].sort((a, b) => {
      const ad = a.deadline ? new Date(a.deadline).getTime() : Number.POSITIVE_INFINITY
      const bd = b.deadline ? new Date(b.deadline).getTime() : Number.POSITIVE_INFINITY
      if (ad !== bd) return ad - bd
      return (a.order ?? 0) - (b.order ?? 0)
    })
  }, [tasks])

  function addTask(input) {
    const id = crypto?.randomUUID?.() ?? String(Date.now() + Math.random())
    const now = Date.now()
    const task = {
      id,
      title: input.title?.trim() ?? 'Untitled task',
      subject: input.subject?.trim() ?? '',
      priority: input.priority ?? 'medium', // low | medium | high
      deadline: input.deadline ?? '',
      completed: false,
      createdAt: now,
      order: now,
    }
    setTasks((t) => [task, ...t])
    return task
  }

  function deleteTask(id) {
    setTasks((t) => t.filter((x) => x.id !== id))
  }

  function toggleTask(id) {
    setTasks((t) => t.map((x) => (x.id === id ? { ...x, completed: !x.completed } : x)))
  }

  function updateTask(id, patch) {
    setTasks((t) => t.map((x) => (x.id === id ? { ...x, ...patch } : x)))
  }

  function reorderTask(sourceId, targetId) {
    setTasks((t) => {
      const list = [...t]
      const s = list.findIndex((x) => x.id === sourceId)
      const d = list.findIndex((x) => x.id === targetId)
      if (s < 0 || d < 0) return t
      const [item] = list.splice(s, 1)
      list.splice(d, 0, item)
      return list.map((x, i) => ({ ...x, order: i }))
    })
  }

  return { tasks, setTasks, sortedTasks: sorted, addTask, deleteTask, toggleTask, updateTask, reorderTask }
}

