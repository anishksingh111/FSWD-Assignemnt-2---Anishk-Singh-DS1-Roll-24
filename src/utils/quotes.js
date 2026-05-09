const QUOTES = [
  'Small progress daily beats one big sprint.',
  'Focus is a superpower—protect it.',
  'Study smart: identify weak topics, then attack them early.',
  'Consistency builds confidence.',
  'Turn revision into a ritual: same time, same place.',
  'Active recall > re-reading. Test yourself.',
  'You don’t need more time—you need a better plan.',
  'Prioritize high-weightage topics first.',
  'Done is better than perfect. Start now.',
]

export function getRandomQuote() {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)]
}

export function getMotivationalQuote() {
  const extras = [
    'Your future self is watching—make them proud.',
    'Every session is a vote for the engineer you’re becoming.',
    'Discipline today, freedom tomorrow.',
  ]
  const all = [...QUOTES, ...extras]
  return all[Math.floor(Math.random() * all.length)]
}

