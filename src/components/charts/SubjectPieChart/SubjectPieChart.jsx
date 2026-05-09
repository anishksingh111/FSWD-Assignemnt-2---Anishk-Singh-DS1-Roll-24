import { Doughnut } from 'react-chartjs-2'
import '../charts'

export default function SubjectPieChart({ items }) {
  const data = {
    labels: items.map((x) => x.label),
    datasets: [
      {
        data: items.map((x) => x.value),
        backgroundColor: items.map((x) => x.color),
        borderColor: items.map(() => 'rgba(255,255,255,0.12)'),
        borderWidth: 1,
        hoverOffset: 8,
      },
    ],
  }

  const options = {
    plugins: { legend: { position: 'bottom', labels: { color: 'rgba(255,255,255,0.78)' } } },
    cutout: '64%',
  }

  return <Doughnut data={data} options={options} />
}

