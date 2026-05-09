const PREFIX = 'aigsp:'

export function storageKey(key) {
  return `${PREFIX}${key}`
}

export function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(storageKey(key))
    if (raw == null) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function writeJSON(key, value) {
  localStorage.setItem(storageKey(key), JSON.stringify(value))
}

export function removeKey(key) {
  localStorage.removeItem(storageKey(key))
}

