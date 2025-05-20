import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { authContext } from '../../context/AuthContext';
import { getAllMaterials } from '../../services/materialServices';
import { addMaterialToDisposal, getDisposalByWorkerId, getOneDisposal, removeMaterialFromDisposal } from '../../services/disposalServices';

function FormDetails(pros) {
  const navigate = useNavigate()
  const { user } = useContext(authContext)
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
      await addMaterialToDisposal(requestId, formData)
    } catch (error) {
      console.log('Something Occurred')
    }
  }

  async function removeMaterial(id) {
    try {
      await removeMaterialFromDisposal(requestId, id)
      navigate('/list-dispose-form')
    } catch (error) {
      console.log('Something Occurred')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       if(formData.addressName !== "") {
            addMaterial()
            setFormData({
              material: "",
              quantity: "",
            });
            navigate('/list-dispose-form')
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
          Help protect the environment by collecting items and recycling them
        </div>
      </div>

      <div className="table-container">
        <div className="dispose-card">
          <div className="info">
          <div className="company-name-with-location">
              <span className="company-name">{address.name || ""}</span>
              <div className="location-button">Location</div>
          </div>
          <div className="time">{`Address: ${address.country}, ${address.state}. ${address.city}, ${address.street}`}</div>
          <div className="time">{Date(date)}</div>
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
            <div>
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
            </div>
            <button type="submit">Submit</button>
          </form>

          {requestMaterial.map((req, i) => {
            const foundM = materials.find(mat => mat._id === req.material);
            if (!foundM) return null;

            return (
              <div key={i} className="row">
                <div className="info">
                  <div className="company-name-with-location">
                    <span className="company-name">{foundM.name}</span>
                  </div>
                  <div className="time">{`Quantity: ${req.quantity}`}</div>
                </div>
                {/* <div className="buttons">
                  <button className="button reject" onClick={() => removeMaterial(req._id)}>Delete</button>
                </div> */}
              </div>
            );
          })}

          </div>
        </div>
    </div>
  );
}

export default FormDetails;
