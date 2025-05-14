import React from 'react'
import { useNavigate } from 'react-router';

function CompanyDisposes() {
    const navigate = useNavigate()
    const requests = [
        { id: 3, company: 'EcoDrop', time: 'Wednesday, 9:00 AM' },
        { id: 4, company: 'EcoDrop', time: 'Wednesday, 9:00 AM' },
        { id: 5, company: 'EcoDrop', time: 'Wednesday, 9:00 AM' },
        { id: 6, company: 'EcoDrop', time: 'Wednesday, 9:00 AM' },
        { id: 7, company: 'EcoDrop', time: 'Wednesday, 9:00 AM' },
        { id: 8, company: 'EcoDrop', time: 'Wednesday, 9:00 AM' },
        { id: 9, company: 'EcoDrop', time: 'Wednesday, 9:00 AM' },
    ];

    return (
        <div className="page">

            <div className="container">
            <div className='identifier'>
                <div className="green-borded">Company</div>
                <div className="dark-green-text">Disposes</div>
            </div>
            <br />
            <div className="header">Help protect the environment by collecting items and recycling them</div>
            </div>

            <div className="table-container-right">
            <div className="button-row">
                <div className='dispose-card'>
                    <div>
                        <select id="filter" defaultValue="All">
                            <option value="all">All</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="Completed">Completed</option>
                            <option value="canceled">Canceled</option>
                        </select>
                    </div>
                </div>
                <button className="green-button" onClick={() => navigate('/dispose-request')}>New Request +</button>
            </div>

            {requests.map((req) => (

                <div key={req.id} className="row">

                    <div className="info">
                        <div className="company-name-with-location">
                            <span className="company-name">{req.company}</span>
                            <div className="request-status-pending">Pending</div>
                        </div>

                        <div className="time">{req.time}</div>
                    </div>

                    <div className="buttons">
                        <button className="more-details-button">More Details</button>
                    </div>
                
                </div>

            ))}
            </div>

        </div>
    )
}

export default CompanyDisposes
