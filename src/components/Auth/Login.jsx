import {useState, useContext} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { authContext } from '../../context/AuthContext'


function Login() {
      const [formData, setFormData] = useState({
          username:"",
          password:""
      })

      const [error, setError] = useState(null)

      const {validateToken} = useContext(authContext)
      const navigate = useNavigate()

      function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    async function handleSubmit(e){
      setError(null)
      e.preventDefault()
      try{
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`,formData)
          console.log(response.data)
          localStorage.setItem("token",response.data.token)
          validateToken() 
          console.log(response.data.companyId)
      }
      catch(err){
          console.log(err)
          setError("Wrong username or password, please try again.")
      }
  }

  return (
    <div className='homepage'>

      <div className="login-card">
        <h4>Login</h4>
        <h6 className='auth-text'>Welcome back! Please log in to continue.</h6>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />

          {error ? <div className='error-div'><p className='error-message'>{error}</p> </div> : ""}

          <button type="submit">Login</button>
        </form>
      </div>

    </div>
  )
}

export default Login
