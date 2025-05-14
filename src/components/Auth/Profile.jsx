import React from 'react'

function Profile() {
    const requests = [
        { id: 3, company: 'EcoDrop', time: 'Wednesday, 9:00 AM' },
        { id: 4, company: 'EcoDrop', time: 'Wednesday, 9:00 AM' },
        { id: 5, company: 'EcoDrop', time: 'Wednesday, 9:00 AM' },
        { id: 6, company: 'EcoDrop', time: 'Wednesday, 9:00 AM' },
        { id: 7, company: 'EcoDrop', time: 'Wednesday, 9:00 AM' },
        { id: 8, company: 'EcoDrop', time: 'Wednesday, 9:00 AM' },
        { id: 9, company: 'EcoDrop', time: 'Wednesday, 9:00 AM' },
    ];

// Worker -> Name, Phone, Password
// Company -> Username, phone, image, Password, addresses
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
        <button className="button reject">Delete Profile</button>
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
                        placeholder="TADWEER"
                        defaultValue="TADWEER"
                        required
                        disabled
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone</label>
                        <input
                        type="text"
                        id="phone"
                        placeholder="+973 34563456"
                        defaultValue="+973 34563456"
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
                    <button className="green-button" onClick={() => navigate('/dispose-request')}>New Address +</button>
                </div>
                {requests.map((req) => (

                    <div key={req.id} className="row">

                        <div className="info">
                            <div className="company-name-with-location">
                                <span className="company-name">Address Name</span>
                                <button className="location-button">View Location</button>
                            </div>

                            <div className="time">House 000, Road 0000, Block 0000</div>
                        </div>

                        <div className="buttons">
                        <button className="button form">Edit</button>
                        <button className="button reject">Remove</button>
                        </div>

                    </div>

                ))}
            </div>
        </div>

</div>
  )
}

export default Profile
