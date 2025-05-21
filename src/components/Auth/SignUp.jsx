import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

function AuthForm() {
  const navigate = useNavigate()

  const [isCompany, setIsCompany] = useState(true)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    role: isCompany ? 'Company' : 'Worker',
  })
  const [error, setError] = useState(null)

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    
    // Add role
      const updatedFormData = {
    ...formData,
    role: isCompany ? 'Company' : 'Worker'
  };

    if(updatedFormData.password !== updatedFormData.confirmPassword){
      setError("Passwords do not match!")
      setFormData({...formData, password: "", confirmPassword: ""})
      return
    }

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/sign-up`, updatedFormData)
      navigate('/login')
    } catch (err) {
      console.error(err)
      setError("Error sigining up, please try again.")
      setFormData({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    role: isCompany ? 'Company' : 'Worker',
  })
    }
  }

  return (
    <div className="homepage">
      <div className="login-card">
        <div className="form-toggle-new">
          <button
            className={isCompany ? "active" : ""}
            onClick={() => setIsCompany(true)}
            type="button">
            Business
          </button>
          <button
            className={!isCompany ? "active" : ""}
            onClick={() => setIsCompany(false)}
            type="button">
            Worker
          </button>
        </div>

        <h4>{!isCompany ? 'Sign up as Worker' : 'Sign up as Business'}</h4>
        <h6 className="auth-text">
          {isCompany
            ? 'Create your Green World Business account below.'
            : 'Create your Green World Worker account below.'}
        </h6>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

            <>
              <label htmlFor="phone">Phone:</label>
              <input
                type="phone"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </>

            <>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </>

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

            <>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </>
              {error ? <div className='error-div'><p className='error-message'>{error}</p> </div> : ""}

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default AuthForm
