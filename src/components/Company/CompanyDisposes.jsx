import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { getDisposalByCompanyId } from '../../services/disposalServices';
import { authContext } from '../../context/AuthContext';

function CompanyDisposes() {
    const [companyDisposes, setCompanyDisposes] = useState([{}])
    const [filter, setFilter] = useState([{}])
    const { user } = useContext(authContext)
    const navigate = useNavigate()

    async function getCompanyDisposes() {
        try {
            const disposes = await getDisposalByCompanyId(user?.companyId)
            setCompanyDisposes(disposes)
            setFilter(disposes)
        } catch (error) {
            
        }
    }

    const handleFilterChange = (event) => {
        const filterValue = event.target.value;
        let filteredCompanies = companyDisposes;

        if (filterValue !== 'all') {
            filteredCompanies = companyDisposes.filter(
                (company) => company.status.toLowerCase() === filterValue.toLowerCase()
            );
        } else {
            filteredCompanies = companyDisposes
        }

        setFilter(filteredCompanies);
    }

    useEffect(() => {
        if (user) {getCompanyDisposes()}
    }, [user])

    return (
        <div className="page">

            <div className="container">
            <div className='identifier'>
                <div className="green-borded">Company</div>
                <div className="dark-green-text">Disposes</div>
            </div>
            <br />
            <div className="header">Schedule a specific date or day to collect materials from your site to help preserve green life.</div>
            </div>

            <div className="table-container-right">
            <div className="button-row">
                <div className='dispose-card'>
                    <div>
                        <select id="filter" defaultValue="All" onChange={handleFilterChange}>
                            <option value="all">All</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>
                <button className="green-button" onClick={() => navigate('/dispose-request')}>New Request +</button>
            </div>

            {filter.map((req, i) => (

                <div key={i} className="row">

                    <div className="info">
                        <div className="company-name-with-location">
                            <span className="company-name">{req.addressName}</span>
                            <div className={`request-status-${req.status ? req.status.toLowerCase() : "pending"}`}>{req.status}</div>
                        </div>

                        <div className="time">
                            {new Date(req.disposalDate).toLocaleString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true
                            })}
                        </div>

                    </div>

                    <div className="buttons">
                        <button onClick={() => navigate(`./${req._id}`)} className="more-details-button">More Details</button>
                    </div>
                
                </div>

            ))}
            </div>

        </div>
    )
}

export default CompanyDisposes
