import { createContext, useContext, useMemo, useState } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const api = useMemo(() => {
    function pushToast(toast) {
      const id = crypto?.randomUUID?.() ?? String(Date.now() + Math.random())
      const next = {
        id,
        type: toast?.type ?? 'info', // info | success | warning | error
        title: toast?.title ?? 'Notification',
        message: toast?.message ?? '',
        timeoutMs: toast?.timeoutMs ?? 2800,
      }
      setToasts((t) => [next, ...t].slice(0, 4))
      window.setTimeout(() => {
        setToasts((t) => t.filter((x) => x.id !== id))
      }, next.timeoutMs)
    }

    return { toasts, pushToast }
  }, [toasts])

  return <ToastContext.Provider value={api}>{children}</ToastContext.Provider>
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx
}

