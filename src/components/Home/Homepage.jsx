import {useContext,useEffect} from 'react'
import { authContext } from '../../context/AuthContext'
import axios from 'axios'

function Homepage() {
  // useContext(): allows me to consume the context

  // sending request to protected route that needs a token
  // async function callProtectedRoute(){
  //   const token = localStorage.getItem("token")
  //   const response= await axios.get(`${import.meta.env.VITE_BACKEND_URL}/test-jwt/checkout`,{headers:{Authorization:`Bearer ${token}`}})
  //   console.log(response.data)
  // }

  // callProtectedRoute()
  return (
    <div className='homepage'>
      <div className='landing-content'>
        <h3 className='vision-text'>"Discover easy and impactful ways to recycle with Tadweer transforming waste into a sustainable future, one step at a time"</h3>
        <h4 className='landing-text'>Join the Tadweer Movement Recycle Today for a Greener Tomorrow</h4>
      </div>
    </div>
  )
}

export default Homepage
