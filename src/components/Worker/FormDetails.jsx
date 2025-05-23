import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { authContext } from '../../context/AuthContext';
import { getAllMaterials } from '../../services/materialServices';
import { addMaterialToDisposal, completeDisposal, getDisposalByWorkerId, getOneDisposal, removeMaterialFromDisposal } from '../../services/disposalServices';

function FormDetails(pros) {
  const navigate = useNavigate()
  const { user } = useContext(authContext)
  const [ disposal, setDisposal] = useState(null)
  const [ materials, setMaterials ] = useState([{}])
  const passedData = useLocation()
  const { address, requestId, date } = passedData.state || {}
  const [formData, setFormData] = useState({
          material: "",
          quantity: "",
      })
  
  const [ requestMaterial, setRequestMaterial ] = useState([{}])

  async function getRequestMaterial() {
    try {
      const foundedMaterials = await getOneDisposal(requestId)
      setRequestMaterial(foundedMaterials.materials)
      setDisposal(foundedMaterials)
    } catch (error) {
      console.log('Something Occurred')
    }
  }

  async function getMaterials() {
    try {
      const foundMaterials = await getAllMaterials()
      setMaterials(foundMaterials)
    } catch (error) {
      console.log('Something Occurred')
    }
  }

  useEffect(() => {
    if(user) {
      getMaterials()
      getRequestMaterial()
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
  }

  async function addMaterial() {
    try {
      await addMaterialToDisposal(requestId, {...formData,
        quantity: Number(formData.quantity),
      })
    } catch (error) {
      console.log('Something Occurred')
    }
  }

  async function removeMaterial(id) {
    try {
      await removeMaterialFromDisposal(requestId, id)
      await getRequestMaterial();
    } catch (error) {
      console.log('Something Occurred')
    }
  }

  async function completedRequest() {
    try {
      console.log(`REQ ID ${requestId}`)
      await completeDisposal(requestId)
      navigate('/display-dispose')
    } catch (error) {
      console.log('Something Occurred')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       if(formData.material && formData.quantity) {
            await addMaterial()
            setFormData({
              material: "",
              quantity: "",
            });
            await getRequestMaterial()
            // navigate('/list-dispose-form')
       }
    } catch (err) {
        console.log(err)
    }
}

  return (
    <div className="page">
      <div className="container">
        <div className="identifier">
          <div className="green-borded">Worker</div>
          <div className="dark-green-text">Details</div>
        </div>
        <br />
        <div className="header">
          Enter the details of the collected materials for the green life records.
        </div>
      </div>

      <div className="table-container">
        <div className="dispose-card">
          <div className="info">
          <button className="green-button" disabled={!requestMaterial.length || requestMaterial[0].material == null} onClick={() => completedRequest()}>Completed</button>
          <div className="company-name-with-location">
              <span className="company-name">{address?.name || ""}</span>
              <div className="location-button">Location</div>
          </div>
          <div className="time">Company: {disposal?.company?.name}</div>
          <div className="time">{`Address: ${address.country}, ${address.state}. ${address.city}, ${address.street}`}</div>
          <div className="time">Date: {(date)}</div>
          <div className="time">Total: {disposal?.totalPrice} BHD</div>
          <div className="time">Status: {disposal?.status}</div>
          </div>

          <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="material">Materials</label>
                <select
                    id="material"
                    name="material"
                    defaultValue=""
                    onChange={handleChange}
                    required>
                    <option value="" disabled>Select Materials</option>
                    {materials.map((req, i) => (
                        <option key={i} value={req._id}>{req.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="quantity">Quantity</label>
                <input
                type="number"
                id="quantity"
                name='quantity'
                required
                onChange={handleChange}
                />
            </div>
            {/* <div>
                <label htmlFor="weight">Weight (kg)</label>
                <input
                type="number"
                id="weight"
                required
                />
            </div>
            <div>
                <label htmlFor="notes">Notes</label>
                <input
                type="text"
                id="notes"
                />
            </div> */}
            <button type="submit">Add Material</button>
          </form>

          {requestMaterial.map((req, i) => {

            return (
              <div key={i} className="row">
                <div className="info">
                  <div className="company-name-with-location">
                    <span className="company-name">{ req.material?.name}</span>
                  </div>
                  <div className="time">{`Quantity: ${req.quantity}`}</div>
                  <div className="time">{`Price: ${req.calculatedPrice?.toFixed(2)} BHD`}</div>


                </div>
                <div className="buttons">
                  <button className="button reject" onClick={() => {
                    console.log("Removing material with ID:", req.material?._id);

                    removeMaterial(req.material?._id)}}>Remove</button>
                </div>
              </div>
            );
          })}

          </div>
        </div>
    </div>
  );
}

export default FormDetails;
