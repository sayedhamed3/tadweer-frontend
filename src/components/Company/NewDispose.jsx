import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { createDisposal } from '../../services/disposalServices'
import { authContext } from '../../context/AuthContext'
import { addScheduleToCompany, getOneCompany } from '../../services/companyServices'

function NewDispose() {
    const navigate = useNavigate()
    const { user } = useContext(authContext)
    const [isSchedule, setIsSchedule] = useState(false)
    const [userDetails, setUserDetails] = useState({})
    const [formData, setFormData] = useState({
        company: "",
        day: "",
        date: "",
        time: "",
        addressName: "",
    })

    async function getUserDetails() {
        try {
            const userInfo = await getOneCompany(user?.companyId);
            setUserDetails(userInfo);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }

    useEffect(() => {
        if(user) {
            getUserDetails()
        }
    }, [user])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    async function createNewDispose() {
        try {
            const selectedDate = formData.day !== "" ? formData.day : Date(`${formData.date}${formData.time}`)

            const disposalForm = formData.day !== "" ? {
                company: user?.companyId,
                disposalDate: selectedDate,
                addressName: formData.addressName
            } : {
                company: user?.companyId,
                day: selectedDate,
                time: formData.time,
                addressName: formData.addressName
            }

            console.log(disposalForm.addressName)
            if(user?.company) {
                await createDisposal(disposalForm) 
            } else {
                addScheduleToCompany(disposalForm)
            }
            
        } catch (error) {
            
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           if(formData.addressName !== "") {
                createNewDispose()
                setFormData({
                    company: "",
                    day: "",
                    date: "",
                    time: "",
                    addressName: "",
                });
                navigate('/company-disposes')
           }
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <div className="page">
      <div className="container">
        <div className="identifier">
          <div className="green-borded">Company</div>
          <div className="dark-green-text">Create New Dispose</div>
        </div>
        <br />
        <div className="header">
          Help protect the environment by collecting items and recycling them
        </div>
      </div>

      <div className="table-container">
        <div className="dispose-card">
            <div className="info">
            <span className="company-name">Create New Dispose</span>
            <div className="time">Complete the form with the necessary details to help protect the green world</div>
            </div>

            <br />
            <div className="form-toggle">
                <button
                    className={!isSchedule ? "green-borded" : ""}
                    onClick={() => setIsSchedule(false)}
                    type="button">
                    Schedule
                </button>
                <button
                    className={isSchedule ? "green-borded" : ""}
                    onClick={() => {
                        formData.day = ""
                        setIsSchedule(true)
                    }}
                    type="button">
                    Custom
                </button>
            </div>

            <form onSubmit={handleSubmit}>

                {
                    !isSchedule ? 
                    <>
                        <div>
                            <label htmlFor="day">Day</label>
                            <select id="day" name='day' defaultValue="Select Day" onChange={handleChange}>
                                <option value="Select Day">Select Day</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>
                        </div>
                    </> : 
                    <>
                        <div>
                            <label htmlFor="date">Date</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                required
                                onChange={handleChange}
                            />
                        </div>
                    </>
                }

                <div>
                    <label htmlFor="time">Material</label>
                    <input
                        type="time"
                        id="time"
                        name='time'
                        required
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="addressName">Address</label>
                    <select
                        id="addressName"
                        name="addressName"
                        defaultValue=""
                        required
                        onChange={handleChange}>
                        <option value="" disabled>Select Address</option>
                        {userDetails?.addresses?.map((req, i) => (
                            <option key={i} value={req.name}>{req.name}</option>
                        ))}
                    </select>
                </div>

                <button type="submit">Submit</button>
            </form>
            </div>
        </div>

    </div>
  )
}

export default NewDispose
