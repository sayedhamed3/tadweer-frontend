import React from 'react';
import ListingRequests from '../components/ListingRequests';
import { getAllPendingDisposals } from '../../services/disposalServices';
import { useEffect, useState } from 'react';


function DisplayDispose() {

  // get all pending disposals
  const [disposals, setDisposals] = useState([])

  const getDisposals = async () => {
    try {
      const response = await getAllPendingDisposals()
      setDisposals(response)
    } catch (error) {
      console.error("Error fetching disposal by worker id:", error)
    }
  }

  useEffect(() => {
    getDisposals()
  }, [])



  return (
    <>
      <ListingRequests isForm="yes" disposals={disposals}/>
    </>
  );
}

export default DisplayDispose;
