import React, { useEffect, useState } from 'react';
import { getOneMaterial } from '../../services/materialServices';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';

function capitalize(word) {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function MaterialDetails() {
  const { materialId } = useParams();
  const [material, setMaterial] = useState(null);
  const [error, setError] = useState(null);

  const getMaterial = async () => {
    try {
      const res = await getOneMaterial(materialId);
      setMaterial(res);
    } catch (error) {
      console.log(error);
      setError("Failed to load material");
    }
  };

  const nav = useNavigate()
  const goBack = () => {
    nav("/materials")
  }

  useEffect(() => {
    getMaterial();
  }, [materialId]);

  if (error) {
    return <div className="page"><p style={{ color: "red" }}>{error}</p></div>;
  }

  if (!material) {
    return <div className="page"><p>Loading...</p></div>;
  }

  return (
    <div className="page">
      <div className="container">
        <div className="identifier">
          <div className="green-borded">Company</div>
          <div className="dark-green-text">Material Details</div>
        </div>
        <br />
        <div className="header">
          The material details are thoroughly described, please take your time to read the information carefully.
        </div>
      </div>

      <div className="table-container">
        <div className="dispose-card">
          <div className="info-material">
            <div className="info">
              <h1 className="company-name">{material.name}</h1>
              <img  src={`/images/${material.type}/${material.imageUrl}`} alt={material.name} width="150" />
              <p><strong>Type:</strong> {capitalize(material.type)}</p>
              <p><strong>Unit:</strong> {material.unit}</p>
              <p><strong>Price per Unit:</strong> {material.pricePerUnit} BHD</p>
              <p><strong>Description:</strong> {material.description}</p>
              <p><strong>Recycling Process:</strong> {material.recyclingProcess}</p>
            </div>
          </div>

          <div className="container" style={{ marginTop: "20px"}}>
            <h3 className="company-name">Environmental Impact per {material.unit}</h3>
            <ul>
              <li>CO₂ Saved: {material.environmentalImpact.co2SavedPerUnit} kg</li>
              <li>Water Saved: {material.environmentalImpact.waterSavedPerUnit} liters</li>
              <li>Energy Saved: {material.environmentalImpact.energySavedPerUnit} kWh</li>
              <li>Trees Saved: {material.environmentalImpact.treesSavedPerUnit}</li>
              <li>Landfill Space Saved: {material.environmentalImpact.landfillSpaceSavedPerUnit} m³</li>
              <li>Oil Saved: {material.environmentalImpact.oilSavedPerUnit} liters</li>
            </ul>
          </div>
        </div>
        <button onClick={goBack} style={{ marginBottom: "20px"}}>Back</button>
      </div>
    </div>
  );
}

export default MaterialDetails;
