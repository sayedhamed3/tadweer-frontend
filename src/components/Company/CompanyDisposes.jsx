import React from 'react'

function CompanyDisposes() {
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
                <button className="green-button ">New Request +</button>
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
