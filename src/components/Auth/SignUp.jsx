import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

function AuthForm() {
  const [isLogin, setIsLogin] = useState(false)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
  })

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const endpoint = isLogin ? '/auth/login' : '/auth/sign-up'
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}${endpoint}`, formData)
      navigate(isLogin ? '/dashboard' : '/login')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="homepage">
      <div className="login-card">
        <div className="form-toggle-new">
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
            type="button">
            Business
          </button>
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
            type="button">
            Worker
          </button>
        </div>

        <h4>{isLogin ? 'Sign up as Worker' : 'Sign up as Business'}</h4>
        <h6 className="auth-text">
          {isLogin
            ? 'Create your Green World account below.'
            : 'Create your Green World account below.'}
        </h6>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
          />

          {!isLogin && (
            <>
              <label htmlFor="phone">Phone:</label>
              <input
                type="phone"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </>
          )}

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />

          {!isLogin && (
            <>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </>
          )}

          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </form>
      </div>
    </div>
  )
}

export default AuthForm
