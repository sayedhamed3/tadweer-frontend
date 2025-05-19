import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './Achievement.css'
import { getAllAchievements } from '../../services/achievementServices';
import { getOneCompany } from '../../services/companyServices';
import { useContext } from 'react';
import { authContext } from '../../context/AuthContext'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Achievement() {

    const { user } = useContext(authContext)

    const companyId = user?.companyId

    const [achievements, setAchievements] = useState(null)
    const [userAchievements, setUserAchievements] = useState(null)
    const [error, setError] = useState(null)

    const getUserAchievements = async () => {
        try {
            if (user){const res = await getOneCompany(companyId)
            console.log(res)
            setUserAchievements(res.achievements)
            console.log(user)}
        } catch (err) {
            console.log(err)
            setError("Error getting Companie's Achievement")
        }
    }


    const getAchievements = async () => {
        try {
            const res = await getAllAchievements()
            console.log(res)
            setAchievements(res)
        } catch (err) {
            console.log(err)
            setError("Error Getting All Achievements")
        }
    }

    useEffect(() => {
        getAchievements()
        getUserAchievements()
    }, [])

    const environmentData = {
        labels: ['CO2', 'Water', 'Energy', 'Trees', 'Landfill Space', 'Oil'],
        datasets: [
            {
                data: [1200, 1900, 1500, 2200, 1800, 1500],
                backgroundColor: [
                    'rgba(255, 255, 255, 0.7)',
                    'rgba(82, 166, 245, 0.7)',
                    'rgba(252, 255, 55, 0.7)',
                    'rgba(38, 255, 136, 0.7)',
                    'rgba(141, 64, 64, 0.7)',
                    'rgba(0, 0, 0, 0.7)'
                ],
                borderRadius: 10,
                borderSkipped: false,
                barThickness: 40,
                maxBarThickness: 50,
            },
        ],
    };

    const materialData = {
        labels: ['Electronic', 'Glass', 'Metal', 'Organic', 'Paper', 'Plastic'],
        datasets: [
            {
                data: [1200, 1900, 1500, 2200, 1800, 1000],
                backgroundColor: [
                    'rgba(199, 248, 63, 0.7)',
                    'rgba(74, 253, 253, 0.7)',
                    'rgba(197, 0, 223, 0.7)',
                    'rgba(34, 255, 89, 0.7)',
                    'rgba(255, 50, 50, 0.7)',
                    'rgba(190, 190, 190, 0.7)',
                ],
                borderRadius: 10,
                borderSkipped: false,
                barThickness: 40,
                maxBarThickness: 50,
            },
        ],
    };

    const environmentOptions = {
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
                text: 'Environmental Impact Stats',
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

    const materialOptions = {
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
                text: "Material's Recycled Stats",
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

    { if (error) return <p>{error}</p> }

    return (
        <div className="page">
            <div className="achievement-container">
                <div className='chart-style'>
                    <div>
                        <div className='charts'>
                            <div className='bar-div'>
                                <Bar data={environmentData} options={environmentOptions} />
                            </div>
                            <div className='bar-div'>
                                <Bar data={materialData} options={materialOptions} />
                            </div>
                        </div>
                        <div className='achievement-titles'>
                            <h1>Your Achievements</h1>
                            <h1>All Achievements</h1>
                        </div>
                        <div className='achievements-table'>
                            <div className='table-container-achievement'>
                                {Array.isArray(userAchievements) && userAchievements.length > 0 ? userAchievements.map((achievement,i) => {
                                    return (
                                        <div key={i} className="rowa">

                                            <div className="info">
                                                <div className="badge-info">
                                                    <img className='achievement-img' src={`/images/badges/${achievement.badgeIcon}`} alt='Stainless Steel' />
                                                    <div className="company-name">{achievement.title}</div>
                                                </div>
                                            </div>

                                        </div>
                                    )

                                }) : (<div className="rowa">No Achievements Yet</div>)}
                            </div>
                            <div className='table-container-achievement'>
                                {achievements ? achievements.map((achievement,i) => {
                                    return (
                                        <div key={i} className="rowa">

                                            <div className="info">
                                                <div className="badge-info">
                                                    <img className='achievement-img' src={`/images/badges/${achievement.badgeIcon}`} alt='Stainless Steel' />
                                                    <div className="company-name">{achievement.title}</div>
                                                </div>
                                            </div>

                                            <div className="request-status-pending">Needed: {`${achievement.threshold}`}</div>

                                        </div>
                                    )

                                }) : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Achievement;
