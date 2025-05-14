import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Achievement() {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                data: [1200, 1900, 1500, 2200, 1800],
                backgroundColor: [
                    'rgba(63, 131, 248, 0.7)',
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(255, 205, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                ],
                borderRadius: 10,
                borderSkipped: false,
                barThickness: 40,
                maxBarThickness: 50,
            },
        ],
    };
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
            display: false,
            position: 'bottom',
            labels: {
                    color: '#fff',
                    font: {
                        size: 14,
                        weight: '400',
                        family: 'Inter, sans-serif',
                    },
                },
            },
            title: {
                display: true,
                text: 'Monthly Revenue Overview',
                font: {
                    size: 20,
                    weight: '400',
                    family: 'Inter, sans-serif',
                },
                color: '#fff',
                padding: {
                    bottom: 20,
                },
            },
            tooltip: {
                backgroundColor: '#ffffffcc',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: '#ddd',
                borderWidth: 1,
                titleFont: { weight: '400' },
            },
        },

        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    color: '#fff',
                    font: {
                        size: 12,
                        family: 'Inter, sans-serif',
                    },
                },
            },
            y: {
                beginAtZero: true,
                grid: { color: '#fff' },
                ticks: {
                color: '#fff',
                font: {
                    size: 12,
                    family: 'Inter, sans-serif',
                },
                callback: value => value,
                },
            },
        },
    };
    
    return (
        <div className="page">
            <div className="achievement-container">
                <div className='chart-style'>
                    {[1, 2].map((_, i) => (
                     <div style={{
                        width: '100%',
                     }}>
                           <div key={i} className='bar-div'>
                            <Bar data={data} options={options} />
                            
                        </div>
                        <div className='table-container-achievement'>
                        <div className="row">

                            <div className="info">
                                <div className="badge-info">
                                    <img className='material-img' src='https://i.pinimg.com/736x/07/78/56/07785646b7d848b9d01c73dba0fef73c.jpg' alt='Stainless Steel' width="35"/>
                                    <div className="company-name">Pending</div>
                                </div>
                            </div>

                            <div className="request-status-pending">Pending</div>

                        </div>
                    </div>
                     </div>
                    ))}
                </div>    
            </div>
        </div>
    );
}
  
export default Achievement;
