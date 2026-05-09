import { Line } from 'react-chartjs-2'
import '../charts'

export default function WeeklyLineChart({ points }) {
  const labels = points.map((p) => p.iso.slice(5))
  const data = {
    labels,
    datasets: [
      {
        label: 'Study hours',
        data: points.map((p) => p.hours),
        fill: true,
        borderColor: 'rgba(34,211,238,0.9)',
        backgroundColor: 'rgba(34,211,238,0.12)',
        pointBackgroundColor: 'rgba(168,85,247,0.9)',
        pointBorderColor: 'rgba(255,255,255,0.35)',
        tension: 0.35,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: 'rgba(255,255,255,0.65)' } },
      y: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: 'rgba(255,255,255,0.65)' } },
    },
  }

  return <Line data={data} options={options} />
}

