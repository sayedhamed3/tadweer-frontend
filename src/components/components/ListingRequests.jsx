import React from 'react'
import { useNavigate } from 'react-router';


function ListingRequests(props) {
    
  const { disposals, isForm } = props;
    
    const handleAccept = (company) => alert(`Accepted: ${company}`);
    const handleReject = (company) => alert(`Rejected: ${company}`);
    
  return (
    <div className="page">

      <div className="container">
        <div className='identifier'>
            <div className="green-borded">Worker</div>
            {
                !isForm ? 
                    <div className="dark-green-text">Forms</div> : 
                    <div className="dark-green-text">Disposes</div>
            }
        </div>
        <br />
        <div className="header">Help protect the environment by collecting items and recycling them</div>
      </div>

      <div className="table-container">
        {disposals.map((req) => (
          <div key={req._id} className="row">

            <div className="info">

              <div className="company-name-with-location">
                <span className="company-name">{req.company.name}</span>
                <button className="location-button">Location</button>
              </div>

              <div className="time">{req.disposalDate}</div>
            </div>

            <div className="buttons">
              {
                !isForm ? 
                <button className="button form" onClick={() => handleAccept(req.company)}>Form</button> :
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
