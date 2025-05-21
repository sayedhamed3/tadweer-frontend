import React from 'react'
import ListingRequests from '../components/ListingRequests'
import { getDisposalByWorkerId } from '../../services/disposalServices'
import { useContext, useEffect, useState } from 'react'
import { authContext } from '../../context/AuthContext'

function ListDisposeForm() {

  // get worker id from AuthContext
  const {user } = useContext(authContext)
  const workerId = user?.workerId

  const [disposals, setDisposals] = React.useState([])

  // get disposal by worker id
  const getDisposals = async () => {
    try {
      const response = await getDisposalByWorkerId(workerId)
      const acceptedDisposals = response.filter(d => d.status === "Accepted")
      setDisposals(acceptedDisposals)
    } catch (error) {
      console.error("Error fetching disposal by worker id:", error)
    }
  }

  useEffect(() => {
    if(user) {
      console.log(user?.workerId)
      getDisposals()
    }
  }, [user])

  

  return (
    <>
      <ListingRequests disposals={disposals} />
    </>
  )
}

export default ListDisposeForm
