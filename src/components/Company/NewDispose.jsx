import React, { useState } from 'react'

function NewDispose() {
    const [isSchedule, setIsSchedule] = useState(false)

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
                    onClick={() => setIsSchedule(true)}
                    type="button">
                    Custom
                </button>
            </div>

            <form>

                {
                    !isSchedule ? 
                    <>
                        <div>
                            <label htmlFor="day">Day</label>
                            <select id="day" defaultValue="Select Day">
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
                            />
                        </div>
                    </>
                }

                <div>
                    <label htmlFor="time">Material</label>
                    <input
                        type="time"
                        id="time"
                        defaultValue="12:00"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="address">Address</label>
                    <select id="address" defaultValue="Select Address">
                        <option value="Select Address">Select Address</option>
                        <option value="Uptown Market">Uptown Market</option>
                        <option value="Riverside Street">Riverside Street</option>
                        <option value="City Center">City Center</option>
                    </select>
                </div>

                <button type="button">Submit</button>
            </form>
            </div>
        </div>

    </div>
  )
}

export default NewDispose
