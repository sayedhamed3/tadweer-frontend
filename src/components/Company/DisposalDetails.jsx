import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getOneDisposal } from '../../services/disposalServices'

function DisposalDetails() {

    const { disposalId } = useParams()

    const [disposal, setDisposal] = useState(null)
    const navigate = useNavigate()

    const getDisposal = async () => {
        try {
            const res = await getOneDisposal(disposalId)

            setDisposal(res)
        } catch (err) {
            console.log(err)
        }
    }

    const goBack = () => navigate('/company-disposes')


    useEffect(() => {
        getDisposal()
    })


  return (
   <div className="page">
      <div className="container">
        <div className="identifier">
          <div className="green-borded">Company</div>
          <div className="dark-green-text">Disposal Details</div>
        </div>
        <br />
        <div className="header">
          Details of disposal
        </div>
      </div>

      <div className="table-container">
        <div className="dispose-card">
          <div className="info-material">
            <div className="info">
              <h1 className="company-name">Disposal Details</h1>
              <p className="time"><strong>Company:</strong> {disposal?.company.name}</p>
              <p className="time"><strong>Date:</strong> {disposal?.disposalDate}</p>
              <p className="time"><strong>Address</strong> {disposal?.addressName}</p>
              <p className="time"><strong>Status:</strong> {disposal?.status}</p>
              {disposal?.status == "Rejected" && (<p className="time"><strong>Rejection Message:</strong> {disposal?.rejectionMessage}</p>)}
              <p className="time"><strong>Total Price:</strong> {disposal?.totalPrice} BHD</p>
              <p className="time"><strong>Assigned Worker:</strong> {disposal?.worker ? disposal?.worker.name : "No worker assigned yet"}</p>
            </div>
          </div>

          <div className="container" style={{ marginTop: "5px" }}>
            <h3 className="company-name">Material Collected:</h3>
            <div className='disposal-material-container'>
                {disposal?.materials ? disposal?.materials.map((req) => (
                    <div key={req._id} className='material-card'>
                        <p><span className='material-card-title'>Material:</span> {req.material.name}</p>
                        <p><span className='material-card-title'>Quantity:</span> {req.quantity}</p>
                        <p><span className='material-card-title'>Price:</span> {req.calculatedPrice}</p>
                    </div>
                )) : ""}
                </div>
          </div>
        </div>
        <button onClick={goBack}>Back</button>
      </div>
    </div>

  )
}

export default DisposalDetails