import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { createDisposal } from '../../services/disposalServices'
import { authContext } from '../../context/AuthContext'
import { addScheduleToCompany, getOneCompany, removeScheduleFromCompany, clearScheduleFromCompany } from '../../services/companyServices'

function NewDispose() {
    const navigate = useNavigate()
    const { user } = useContext(authContext)
    const [isSchedule, setIsSchedule] = useState(false)
    const [userDetails, setUserDetails] = useState({})
    const [daysAvailable, setDaysAvailable] = useState([])
    const timesAvailable = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30","11:00", "11:30", "12:00", "12:30", "13:00", "13:30","14:00", "14:30", "15:00", "15:30", "16:00", "16:30","17:00", "17:30", "18:00"
    ];
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
            const allDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const scheduledDays = userInfo.pickUpSchedule?.map(schedule => schedule.day) || [];
            setDaysAvailable(allDays.filter(day => !scheduledDays.includes(day)));
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

    const removeSchedule = async (scheduleId) => {
        try {
            await removeScheduleFromCompany(user?.companyId, scheduleId)

            getUserDetails()
        } catch (err) {
            console.log(err)
        }
    }

    async function createNewDispose() {
        try {
            const selectedDate = formData.day !== "" ? formData.day : `${formData.date}T${formData.time}:00.000+00:00`

            console.log("Selected Date: ",selectedDate)
            const disposalForm = formData.day == "" ? {
                company: user?.companyId,
                disposalDate: selectedDate,
                addressName: formData.addressName
            } : {
                company: user?.companyId,
                day: selectedDate,
                time: formData.time,
                addressName: formData.addressName
            }



            console.log(disposalForm)
            if(formData.day == "") {
                await createDisposal(disposalForm) 
                navigate('/company-disposes')
            } else {
                await addScheduleToCompany(disposalForm.company,disposalForm)
                getUserDetails()
                setFormData({
                    company: "",
                    day: "",
                    date: "",
                    time: "",
                    addressName: "",
                });
            }
            
        } catch (err) {
            console.log(err)
        }
    }

    const returnToDisposals = () => navigate('/company-disposes')


    const clearSchedule = async () => {
        try {
            await clearScheduleFromCompany(user?.companyId)

            getUserDetails()
        } catch (err) {
            console.log(err)
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
            Submit your request by reserving a date and time that suits you, at your preferred location.
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

            {!isSchedule && userDetails?.pickUpSchedule && userDetails?.pickUpSchedule.map((req) => (

                    <div key={req._id} className="row">

                        <div className="info">
                            <div className="company-name-with-location">
                                <span className="company-name">{req.day}</span>
                            </div>

                            <div className="time">{`${req.time}, ${req.addressName}`}</div>
                        </div>

                        <div className="buttons">
                        {/* <button className="button form" onClick={() => navigate('/address-form', { state: { id: req._id, isEdited: true } })}>Edit</button> */}
                        <button className="button reject" onClick={() => (removeSchedule(req._id))}>Remove</button>
                        </div>

                    </div>

                ))}

            <form onSubmit={handleSubmit}>

                {
                    !isSchedule ? 
                    <>
                        <div>
                            <label htmlFor="day">Day</label>
                            <select id="day" name='day' defaultValue="Select Day" onChange={handleChange}>
                                <option value="Select Day">Select Day</option>
                                {daysAvailable?.map((day) => (
                                    <option key={day} value={day}>
                                        {day}
                                    </option>
                                ))}
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
                                value={formData.date}
                                required
                                onChange={handleChange}
                            />
                        </div>
                    </>
                }

                <div>
                    <label htmlFor="time">Time</label>
                    <select
                        id="time"
                        name='time'

                        value={formData.time}
                        required
                        onChange={handleChange}
                    >
                        <option value="">Select time</option>
                        {timesAvailable.map((time) => {
                            if(time < "12:00")
                                return (
                                    <option key={time} value={time}> {time} A.M.</option>
                                )
                            else
                                return (
                                    <option key={time} value={time}>
                                        {(parseInt(time.split(":")[0], 10) % 12 || 12) + ":" + time.split(":")[1]} P.M.
                                    </option>
                                )
                        })}


                    </select>
                </div>

                <div>
                    <label htmlFor="addressName">Address</label>
                    <select
                        id="addressName"
                        name="addressName"
                        defaultValue=""
                        value={formData.addressName}
                        required
                        onChange={handleChange}>
                        <option value="" disabled>Select Address</option>
                        {userDetails?.addresses?.map((req, i) => (
                            <option key={i} value={req.name}>{req.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <button type='cancel' onClick={returnToDisposals}>Back to Disposals</button>
                    {!isSchedule && (
                        <button type="button" onClick={clearSchedule}>
                            Clear Schedule
                        </button>
                    )}
                    <button type="submit">{isSchedule ? "Book Disposal" : "Add Schedule"}</button>    
                </div>
            </form>
            </div>
        </div>

    </div>
  )
}

export default NewDispose
