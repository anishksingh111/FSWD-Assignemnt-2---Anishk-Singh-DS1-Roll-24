import { toISODate, daysBetween } from './dates'

const DEFAULT_COLORS = ['#22d3ee', '#3b82f6', '#a855f7', '#34d399', '#fbbf24', '#fb7185']

function pickColor(i) {
  return DEFAULT_COLORS[i % DEFAULT_COLORS.length]
}

// Beginner note: this is a simple "AI-like" heuristic (not a real ML model).
// It prioritizes subjects with closer exams + marked weak topics.
export function generatePlan({ subjects, dailyHours, startDateISO }) {
  const startISO = startDateISO || toISODate(new Date())
  const hours = Math.max(0.5, Number(dailyHours) || 2)

  const normalized = (subjects ?? [])
    .filter((s) => s?.name?.trim())
    .map((s, i) => ({
      name: s.name.trim(),
      examDate: s.examDate || '',
      weakTopics: (s.weakTopics || '').split(',').map((t) => t.trim()).filter(Boolean),
      color: s.color || pickColor(i),
    }))

  const scored = normalized.map((s) => {
    const days = s.examDate ? Math.max(0, daysBetween(startISO, s.examDate)) : 60
    const examUrgency = 1 / Math.max(1, days)
    const weaknessBoost = Math.min(0.6, (s.weakTopics.length || 0) * 0.12)
    const score = 0.55 * examUrgency + 0.45 * weaknessBoost + 0.04
    return { ...s, score }
  })

  const totalScore = scored.reduce((sum, s) => sum + s.score, 0) || 1
  const allocations = scored
    .sort((a, b) => b.score - a.score)
    .map((s) => ({ ...s, hoursPerDay: Number(((s.score / totalScore) * hours).toFixed(2)) }))

  const week = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(startISO + 'T00:00:00')
    d.setDate(d.getDate() + i)
    const iso = toISODate(d)
    const blocks = allocations.map((s) => ({
      subject: s.name,
      hours: s.hoursPerDay,
      color: s.color,
      focus: s.weakTopics[0] || 'Core concepts + practice',
    }))
    week.push({ date: iso, totalHours: hours, blocks })
  }

  return { startISO, dailyHours: hours, subjects: normalized, allocations, week }
}

