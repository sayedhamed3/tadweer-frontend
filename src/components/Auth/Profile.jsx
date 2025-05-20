import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router'
import { getOneCompany, removeAddressFromCompany } from '../../services/companyServices';
import { deleteUser } from '../../services/userServices';

function Profile() {
    const [userDetails, setUserDetails] = useState({})

    const { user } = useContext(authContext)
    const navigate = useNavigate()

    async function getUserDetails() {
      try {
          const userInfo = await getOneCompany(user?.companyId);
          setUserDetails(userInfo);
      } catch (error) {
          console.error('Error fetching user details:', error);
      }
    }

  async function deleteAccount() {
    try {
        await deleteUser(user?.companyId)
        navigate("/")
    } catch (error) {
        console.error('Error fetching user details:', error); 
    }
  }

    useEffect(() => {
      if (user) {
          getUserDetails();
      }
  }, [user]);

  function openGoogleMaps(lat, long) {
    const url = `https://www.google.com/maps?q=${lat},${long}`;
    window.open(url, '_blank');
  }

  return (
    <div className="page">

    <div className="container">
    <div className='identifier'>
        <div className="green-borded">Company</div>
        <div className="dark-green-text">Profile</div>
    </div>
    <br />
    <div className="header">Help protect the environment by collecting items and recycling them</div>
    </div>

    <div className="table-container-right">
    <div className="button-row">
        <div></div>
        <button className="button reject" onClick={() => deleteAccount()}>Delete Profile</button>
    </div>
    
    <div className="dispose-card">
        <div className="info">
            <span className="company-name">Profile Details</span>
            </div>

                <form>
                    <div>
                        <label htmlFor="username">Company</label>
                        <input
                        type="text"
                        id="username"
                        value={userDetails?.name || ''}
                        required
                        disabled
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone</label>
                        <input
                        type="text"
                        id="phone"
                        value={userDetails?.phone || ''}
                        required
                        disabled
                        />
                    </div>
                </form>
            </div>
            <div className='info'>
                <span className="company-name" style={{
                    paddingLeft: "25px",
                    paddingRight: "25px",
                }}>Addresses</span>
                <div className="button-row">
                    <div></div>
                    <button className="green-button" onClick={() => navigate('/address-form')}>New Address +</button>
                </div>
                {userDetails?.addresses && userDetails?.addresses.map((req) => (

                    <div key={req._id} className="row">

                        <div className="info">
                            <div className="company-name-with-location">
                                <span className="company-name">{req.name}</span>
                                <button className="location-button" onClick={() => openGoogleMaps(req.coordinates.lat, req.coordinates.lng)}>View Location</button>
                            </div>

                            <div className="time">{`${req.state}, ${req.country}, ${req.city}, ${req.street}`}</div>
                        </div>

                        <div className="buttons">
                        {/* <button className="button form" onClick={() => navigate('/address-form', { state: { id: req._id, isEdited: true } })}>Edit</button> */}
                        <button className="button reject" onClick={() => {
                            removeAddressFromCompany(user?.companyId, req._id)
                            window.location.reload()
                            }}>Remove</button>
                        </div>

                    </div>

                ))}
            </div>
        </div>

</div>
  )
}

export default Profile
