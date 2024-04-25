import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    LineElement,
    BarElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    BarElement
);

const nombres = ["Agustin", "Santiago", "Bruno"]

const midata = {
    labels: nombres,
    datasets: [
        {
            label: 'Beneficios',
            data: [10, 25, -14],
            backgroundColor: 'rgb(75, 192, 192)',
        },
    ],
};

const misoptions = {
    
}

const BarChart = () => {
  return (
    <Bar data={midata} options={misoptions}/>
  )
}

export default BarChart