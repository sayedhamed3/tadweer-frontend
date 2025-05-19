import { Link } from "react-router"
import { useContext } from "react"
import { authContext } from "../../context/AuthContext"

function NavBar() {
  const { user, logout } = useContext(authContext)
  console.log("User in Nav:", user)

  return (
    <div className='navbar'>
      <div className="nav-content">
        <Link to='/'><h1 className="dark-green-text">TADWEER</h1></Link>
        <div className="nav-list">
          {user?.workerId && (
            <>
              <Link to="/list-dispose-form"><h4 className="dark-green-text">Forms</h4></Link>
              <Link to="/display-dispose"><h4 className="dark-green-text">Disposes</h4></Link>
            </>
          )}
          {user?.companyId && (
            <>
              <Link to='/achievement'><h4 className="dark-green-text">Achievement</h4></Link>
              <Link to="/company-disposes"><h4 className="dark-green-text">Disposes</h4></Link>
              <Link to="/materials"><h4 className="dark-green-text">Material</h4></Link>
              <Link to="/address-form"><h4 className="dark-green-text">Address Form</h4></Link>
              <Link to='/profile'><h4 className="dark-green-text">Profile</h4></Link>
            </>
          )}
          {!user && (
            <>
              <Link to="/login"><h4 className="light-text">Login</h4></Link>
              <Link to="/signup"><h4 className="borded-button">Sign Up</h4></Link>
            </>
          )}
          {user && (
            <h4 className="borded-button" onClick={logout}>Logout</h4>
          )}
        </div>
      </div>
    </div>
  )
}

export default NavBar
