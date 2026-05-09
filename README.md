# AI Graphic Study Planner

A modern college-level React web application to **plan studies**, **manage tasks**, **take notes**, and **track progress visually** — using **localStorage only (no database)**.

## Tech stack

- React + React Router
- HTML / CSS / JavaScript
- localStorage persistence (no backend)
- Chart.js (`react-chartjs-2`) for analytics
- Framer Motion for animations
- React Icons

## Features (what’s included)

- **Landing page**: hero, animated graphics, features, testimonials, footer
- **Dashboard**: daily progress ring, study streak, upcoming tasks, motivational quote, weekly analytics graph
- **AI Study Planner**: subject inputs → priority-based weekly timetable with color-coded blocks
- **Task Manager**: add/delete/complete tasks, priority + deadlines, **drag & drop reorder**
- **Notes**: add/edit/delete notes, search, auto-save
- **Progress Analytics**: completion ring, subject pie chart, weekly productivity graph, study hour metrics
- **Pomodoro**: 25/5 timer, sound notification, animated countdown
- **Calendar Planner**: monthly calendar with exam/task highlights + quick scheduling
- **Settings**: dark/light mode, avatar text, daily goal, reset planner data

## Folder structure

```
src/
  components/
  hooks/
  pages/
  styles/
  utils/
```

## Setup instructions

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview the production build:

```bash
npm run preview
```

## Notes

- All app data is saved in your browser using `localStorage` (keys are prefixed with `aigsp:`).
- Use **Settings → Reset planner data** to clear saved data.

