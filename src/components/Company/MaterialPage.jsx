import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { searchMaterial } from '../../services/materialServices'
import { Link } from 'react-router'
import './Material.css'

function MaterialPage() {

  const [materials, setMaterials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [type, setType] = useState("")
  const [totalPages, setTotalPages] = useState(null)
  const [totalItems, setTotalItems] = useState(null)

  const getMaterials = async (page, search, type) => {
    try {
      const res = await searchMaterial(page, search, type);
      console.log(res)

      setMaterials(res.materials)
      setTotalPages(res.totalPages)
      setTotalItems(res.totalItems)
    } catch (err) {
      console.log(err)
      setError("Failed to Retrieve Materials")
    }
    finally {
      setLoading(false)
    }
  }

  const handlePrev = () => {
    if (page == 1) return

    setPage(page - 1)
  }

  const handleNext = () => {
    if (page == totalPages) return

    setPage(page + 1)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setPage(totalPages > 0 ? 1 : 0)
  }

  const handleType = (e) => {
    setType(e.target.value)
    setPage(totalPages > 0 ? 1 : 0)
  }

  const resetSearch = () => {
    setPage(1)
    setSearch("")
    setType("")
  }

  useEffect(() => {
    getMaterials(page, search, type)
  }, [page, search, type])

  return (
    <div className="page">
      {error && (<p>{error}</p>)}
      <div className="container">
        <div className='identifier'>
          <div className="green-borded">Company</div>
          <div className="dark-green-text">Accepted Material</div>
        </div>
        <br />
        <div className="header">Here is the list of materials we are able to collect and accept from your location.</div>
      </div>

      <div className='right-content'>
        <div className="search-filter-wrapper">
          <input
            id="search-bar"
            type="text"
            placeholder="Search materials..."
            value={search}
            onChange={handleSearch}
          />
          <select id="type" value={type} onChange={handleType}>
            <option value="" disabled>Select Type</option>
            <option value="plastic">Plastic</option>
            <option value="paper">Paper</option>
            <option value="metal">Metal</option>
            <option value="organic">Organic</option>
            <option value="electronic">Electronic</option>
            <option value="glass">Glass</option>
          </select>
          <button id="reset-btn" onClick={resetSearch}>Reset</button>
        </div>

        <div className="table-container-m">
          {materials.map((material) => (

            <div key={material.id} className="rowd">
              <Link to={`/materials/${material._id}` } >
                <div className="info-material">
                  <img className='material-img' src={`/images/${material.type}/${material.imageUrl}`} alt={material.name} width="100" />
                  <div className="info">
                    <span className="time">{material.name}</span>
                    <div className="time">{material.details}</div>
                  </div>
                </div>
              </Link>
            </div>



          ))}
        </div>

        <div id="navigation">
          <button id="prev-btn" disabled={page === 1} onClick={handlePrev}>Prev</button>
          <p><span id='page-number'>{page} </span>/ <span id="total-page">{totalPages}</span></p>
          <button id="next-btn" disabled={page === totalPages} onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  )
}

export default MaterialPage
