import { Line } from 'react-chartjs-2'


const beneficios = [0, 56, 20, 36, 80, 40, 30, -20, 25, 30, 12, 60];
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]


const midata = {
    labels: meses,
    datasets: [
        {
            label: 'Beneficios',
            data: beneficios,
            tension: 0.5,
            fill: true,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            pointRadius: 5,
            pointBorderColor: 'rgba(255, 99, 132)',
            pointBackgroundColor: 'rgba(255, 99, 132)',
        },
    ],
};

const misoptions = {
    animation : false,
}

export const LinesChart = () => {
  return (
    <Line data={midata} options={misoptions}/>
  )
}