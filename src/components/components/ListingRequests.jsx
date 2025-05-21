import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { acceptDisposal, getAllDisposals, getAllPendingDisposals, getDisposalByWorkerId, rejectDisposal } from '../../services/disposalServices';
import { authContext } from '../../context/AuthContext';


function ListingRequests(props) {
    
  const { disposals, isForm } = props;
  const { user } = useContext(authContext)
  const navigate = useNavigate()
  const [disposes, setDisposes] = useState([{}])

  async function acceptRequest(id) {
    try {
      const accepted = await acceptDisposal(id)
      if(accepted) {
        window.location.reload()
      }
    } catch (error) {
      console.log("Something Occurred")
    }
  }

  async function rejectRequest(id) {
    try {
      const accepted = await rejectDisposal(id)
      if(accepted) {
        window.location.reload()
      }
    } catch (error) {
      console.log("Something Occurred")
    }
  }

  function openGoogleMaps(lat, long) {
    const url = `https://www.google.com/maps?q=${lat},${long}`;
    window.open(url, '_blank');
  }

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
        <div className="header">Accept collection requests at your convenience to gather recyclable materials and deliver them to our main location in support of protecting green life.</div>
      </div>

      <div className="table-container">
        {disposals.map((req, i) => (
          <div key={i} className="row">

            <div className="info">

              <div className="company-name-with-location">
                <span className="company-name">{req.addressName}</span>
                <button className="location-button" onClick={() => {
                  const matchedAddress = req.company.addresses.find(
                    (address) => address.name === req.addressName
                  )
                  openGoogleMaps(matchedAddress ? matchedAddress.coordinates.lat : 0.0, matchedAddress ? matchedAddress.coordinates.lng : 0.0)
                }}>Location</button>
              </div>

              <div className="time">{Date(req.disposalDate)}</div>
            </div>

            <div className="buttons">
              {
                !isForm ? 
                <button className="button form" onClick={() => {
                  const matchedAddress = req.company.addresses.find(
                    (address) => address.name === req.addressName
                  )
                  navigate('/form-details', {
                    state: {
                      requestId: req._id,
                      address: matchedAddress,
                      date: req.disposalDate
                    }
                  })
                }}>Form</button> :
                <>
                    <button className="button accept" onClick={() => acceptRequest(req._id)}>Accept</button>
                    <button className="button reject" onClick={() => rejectRequest(req._id)}>Reject</button>
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
