import React from 'react'
import { useNavigate } from 'react-router';

function ListingRequests(pros) {
  const navigate = useNavigate()
    const requests = [
        { id: 1, company: 'Acme Logistics', time: 'Monday, 10:30 AM' },
        { id: 2, company: 'GreenCycle Co.', time: 'Tuesday, 1:15 PM' },
        { id: 3, company: 'EcoDrop', time: 'Wednesday, 9:00 AM' },
        { id: 4, company: 'EcoDrop', time: 'Wednesday, 9:00 AM' },
        { id: 5, company: 'EcoDrop', time: 'Wednesday, 9:00 AM' },
        { id: 6, company: 'EcoDrop', time: 'Wednesday, 9:00 AM' },
        { id: 7, company: 'EcoDrop', time: 'Wednesday, 9:00 AM' },
        { id: 8, company: 'EcoDrop', time: 'Wednesday, 9:00 AM' },
        { id: 9, company: 'EcoDrop', time: 'Wednesday, 9:00 AM' },
    ];
    
    const handleAccept = (company) => alert(`Accepted: ${company}`);
    const handleReject = (company) => alert(`Rejected: ${company}`);
    
  return (
    <div className="page">

      <div className="container">
        <div className='identifier'>
            <div className="green-borded">Worker</div>
            {
                !pros.isForm ? 
                    <div className="dark-green-text">Forms</div> : 
                    <div className="dark-green-text">Disposes</div>
            }
        </div>
        <br />
        <div className="header">Help protect the environment by collecting items and recycling them</div>
      </div>

      <div className="table-container">
        {requests.map((req) => (

          <div key={req.id} className="row">

            <div className="info">

              <div className="company-name-with-location">
                <span className="company-name">{req.company}</span>
                <button className="location-button">Location</button>
              </div>

              <div className="time">{req.time}</div>
            </div>

            <div className="buttons">
              {
                !pros.isForm ? 
                <button className="button form" onClick={() => navigate('/form-details')}>Form</button> :
                <>
                    <button className="button accept" onClick={() => handleAccept(req.company)}>Accept</button>
                    <button className="button reject" onClick={() => handleReject(req.company)}>Reject</button>
                </>
              }
            </div>
            
          </div>

        ))}
      </div>

    </div>
  )
}

export default ListingRequests
