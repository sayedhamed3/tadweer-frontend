import React from 'react';

function FormDetails() {
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
              <span className="company-name">Green Earth Ltd</span>
              <div className="location-button">Location</div>
          </div>
          <div className="time">Address: House 000, Road 0000, Block 0000</div>
          <div className="time">10:00 AM, May 10</div>
          </div>

          <form>
          <div>
              <label htmlFor="material">Material</label>
              <input
              type="text"
              id="material"
              placeholder="Plastic"
              defaultValue="Plastic"
              required
              />
          </div>
          <div>
              <label htmlFor="quantity">Quantity</label>
              <input
              type="number"
              id="quantity"
              placeholder="5"
              defaultValue="5"
              required
              />
          </div>
          <div>
              <label htmlFor="weight">Weight (kg)</label>
              <input
              type="number"
              id="weight"
              placeholder="12"
              defaultValue="12"
              required
              />
          </div>
          <div>
              <label htmlFor="notes">Notes</label>
              <input
              type="text"
              id="notes"
              placeholder="Collected from downtown"
              defaultValue="Collected from downtown"
              />
          </div>
          <button type="button">Submit</button>
          </form>
          </div>
        </div>
    </div>
  );
}

export default FormDetails;
