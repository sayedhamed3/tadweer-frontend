import React from 'react'

function MaterialPage() {
    const materials = [
        {
            id: 1,
            name: 'Pine Wood',
            image: 'https://www.guptapinewood.in/img/pro-detail-1.jpg',
            details: 'Lightweight softwood with a pale yellow color and straight grain. Common in furniture and cabinetry.'
        },
        {
            id: 2,
            name: 'Stainless Steel',
            image: 'https://www.guptapinewood.in/img/pro-detail-1.jpg',
            details: 'Corrosion-resistant alloy used in appliances, medical tools, and construction. Known for its durability and sleek finish.'
        },
        {
            id: 3,
            name: 'Granite',
            image: 'https://www.guptapinewood.in/img/pro-detail-1.jpg',
            details: 'Hard, speckled natural stone ideal for countertops and flooring due to its strength and resistance to scratching.'
        },
        {
            id: 4,
            name: 'Tempered Glass',
            image: 'https://www.guptapinewood.in/img/pro-detail-1.jpg',
            details: 'Safety glass processed to be stronger and shatter-resistant. Commonly used in doors, windows, and screens.'
        },
        {
            id: 5,
            name: 'Genuine Leather',
            image: 'https://www.guptapinewood.in/img/pro-detail-1.jpg',
            details: 'Durable material made from animal hide. Used in clothing, furniture, and automotive interiors.'
        },
        {
            id: 6,
            name: 'PVC Plastic',
            image: 'https://www.guptapinewood.in/img/pro-detail-1.jpg',
            details: 'Synthetic plastic polymer used in pipes, flooring, and packaging. Known for its flexibility and resistance to chemicals.'
        }
    ];
    
  return (
    <div className="page">

      <div className="container">
        <div className='identifier'>
            <div className="green-borded">Company</div>
            <div className="dark-green-text">Accepted Material</div>
        </div>
        <br />
        <div className="header">Help protect the environment by collecting items and recycling them</div>
      </div>

      <div className="table-container">
        {materials.map((material) => (

          <div key={material.id} className="row">

            <div className="info-material">
                <img className='material-img' src={material.image} alt={material.name} width="100"/>
                <div className="info">
                    <span className="company-name">{material.name}</span>
                    <div className="time">{material.details}</div>
                </div>
            </div>
            
          </div>

        ))}
      </div>

    </div>
  )
}

export default MaterialPage
