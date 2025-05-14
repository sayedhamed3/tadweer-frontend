import React, { useEffect, useState, useContext } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { getOneCompany } from '../../services/companyServices';
import { authContext } from '../../context/AuthContext';
import { useParams } from 'react-router';

const mapContainerStyle = {
  height: '400px',
  width: '100%',
};

function AddressDetails() {
  const { user } = useContext(authContext);
  const [company, setCompany] = useState(null);
  const [address, setAddress] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_API_KEY}`
  });

  const { addressId } = useParams();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const companyData = await getOneCompany(user.companyId);
        setCompany(companyData);
        const foundAddress = companyData.addresses.find(a => a._id === addressId);
        setAddress(foundAddress);
      } catch (error) {
        console.error('Error fetching address details:', error);
      }
    };

    if (user?.companyId) {
      fetchCompany();
    }
  }, [user, addressId]);

  if (!address) return <p>Loading address details...</p>;

  const hasCoordinates =
    address.coordinates &&
    typeof address.coordinates.lat === 'number' &&
    typeof address.coordinates.lng === 'number';

  return (
    <div className="page">
      <div className="container">
        <div className="identifier">
          <div className="green-borded">Company</div>
          <div className="dark-green-text">Address Details</div>
        </div>
        <br />
        <div className="header">
          Here is the saved address and its location, if available.
        </div>
      </div>

      <div className="table-container">
        <div className="dispose-card">
          <div className="info">
            <div className="company-name-with-location">
              <span className="company-name">{company ? company.name : 'No Company Provided'}</span>
            </div>
          </div>

          <div className="form-group">
            <p><strong>Name:</strong> {address.name}</p>
            <p><strong>Street:</strong> {address.street}</p>
            <p><strong>City:</strong> {address.city}</p>
            <p><strong>State:</strong> {address.state}</p>
            <p><strong>Postal Code:</strong> {address.postalCode}</p>
            <p><strong>Country:</strong> {address.country}</p>
          </div>

          {hasCoordinates && isLoaded && (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={12}
              center={address.coordinates}
            >
              <Marker position={address.coordinates} />
            </GoogleMap>
          )}

          {hasCoordinates && loadError && <p>Error loading map</p>}
          {!hasCoordinates && <p>This address does not have location coordinates.</p>}
        </div>
      </div>
    </div>
  );
}

export default AddressDetails;
