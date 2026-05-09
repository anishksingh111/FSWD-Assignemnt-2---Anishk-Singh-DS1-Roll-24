import { useLocalStorage } from './useLocalStorage'

const DEFAULT_SETTINGS = {
  dailyStudyGoalHours: 3,
  avatarSeed: 'AI',
}

export function useSettingsData() {
  const [settings, setSettings] = useLocalStorage('settings', DEFAULT_SETTINGS)

  function resetAllData() {
    // Beginner note: clearing localStorage removes saved data for this app only (we use a prefix).
    Object.keys(localStorage)
      .filter((k) => k.startsWith('aigsp:'))
      .forEach((k) => localStorage.removeItem(k))
    window.location.reload()
  }

  return { settings, setSettings, resetAllData }
}

