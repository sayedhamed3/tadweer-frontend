import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker} from '@react-google-maps/api'
import { addAddressToCompany } from '../../services/companyServices';
import { authContext } from '../../context/AuthContext';
import { getOneCompany } from '../../services/companyServices';
import { useNavigate } from 'react-router';

const mapContainerStyle = {
  height: "400px",
  width: "100%"
};

const center = {
  lat: 29.3759,
  lng: 47.9774
};


function AddressForm(props) {

    const { user } = useContext(authContext);

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        coordinates: {
            lat: '',
            lng: ''
        }
    });

    const [company, setCompany] = useState(null);

    // check if edit mode is enabled
    const isEdit = props.isEdit || false;

    const loadAddress = async () => {
  
        if(user) {const companyId = user.companyId;
        const company = await getOneCompany(companyId);
        setCompany(company);
        if (isEdit) {
            const addressId = props.addressId;
            const address = company.addresses.find(address => address._id === addressId);

            if (address) {
                setFormData({
                    name: address.name,
                    street: address.street,
                    city: address.city,
                    state: address.state,
                    postalCode: address.postalCode,
                    country: address.country,
                    // set coordinates if available
                    coordinates: {
                        lat: address.coordinates ? address.coordinates.lat : '',
                        lng: address.coordinates ? address.coordinates.lng : ''
                    }
                });
            }
        }}
    }

    useEffect(() => {
        // loadAddress();
    }, [isEdit, props.addressId]);

    const { isLoaded, loadError } = useLoadScript({
  googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_API_KEY}`
        });


    const [mapRef, setMapRef] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleMapClick = (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        
        setFormData((prevFormData) => ({
            ...prevFormData,
            coordinates: {
            lat,
            lng
            }
        }));
    }
    const handleCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Set map center
        mapRef?.panTo(pos);

        // Update form data
        setFormData((prev) => ({
          ...prev,
          coordinates: pos,
        }));
      },
      () => {
        alert("Failed to get your location.");
      }
    );
  } else {
    alert("Geolocation not supported by your browser.");
  }
};


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const companyId = user.companyId; 

        try {
            await addAddressToCompany(companyId, formData)
            setFormData({
                name: '',
                quantity: '',
                weight: '',
                notes: ''
            });
            navigate('/profile')
        } catch (err) {
            console.log(err)
            setError('An error occurred while submitting the form.');
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="page">
      <div className="container">
        <div className="identifier">
          <div className="green-borded">Company</div>
          <div className="dark-green-text">Address Form</div>
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
                <span className="company-name">{company ? company.name : "No Company Provided"}</span>
                
            </div>
            </div>

            {loading && <p style={{ color: "blue" }}>Submitting, please wait...</p>}


            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Address Name</label>
                <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter address name"
                defaultValue={formData.name}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label htmlFor="street">Street</label>
                <input
                type="text"
                id="street"
                name="street"
                placeholder="Enter street name"
                defaultValue={formData.street}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label htmlFor="city">City</label>
                <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter city name"
                defaultValue={formData.city}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label htmlFor="state">State</label>
                <input
                type="text"
                id="state"
                name="state"
                placeholder="Enter state name"
                defaultValue={formData.state}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label htmlFor="postalCode">Postal Code</label>
                <input
                type="text"
                id="postalCode"
                name='postalCode'
                placeholder="Enter postal code"
                defaultValue={formData.postalCode}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label htmlFor="country">Country</label>
                <input
                type="text"
                id="country"
                name='country'
                placeholder="Enter country name"
                defaultValue={formData.country}
                onChange={handleChange}
                required
                />
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}


            {loadError && <p>Error loading map</p>}
            {!isLoaded ? (
            <p>Loading Map...</p>
            ) : (
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={formData.coordinates.lat ? formData.coordinates : center}
                onClick={handleMapClick}
            >
                {formData.coordinates.lat && (
                <Marker position={formData.coordinates} />
                )}

             <div
            style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: 5,
            background: "#fff",
            padding: "6px 12px",
            borderRadius: "4px",
            color:"black",
            boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
            cursor: "pointer"
            }}
            onClick={handleCurrentLocation}
        >
            📍 Use Current Location
             </div>
            </GoogleMap>
            )}
        
          


          

            <button type="submit">Submit</button>
            </form>
            </div>
        </div>

    </div>
  );
}

export default AddressForm;
