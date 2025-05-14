import { Link } from "react-router"
import { useContext } from "react"
import { authContext } from "../../context/AuthContext"


function NavBar() {
  const {user, logout} = useContext(authContext)


  return (
    <div className='navbar'>
      
      <div className="nav-content">
          
        <Link to='/' className="dark-green-text"><h1 color="white">TADWEER</h1></Link>

        <ul className="nav-list">
          <Link to="/company-disposes"><h4 className="dark-green-text">Disposes</h4></Link>
          <Link to="/material-list"><h4 className="dark-green-text">Material</h4></Link>
          <Link to="/form-details"><h4 className="dark-green-text">Details</h4></Link>
          <Link to="/list-dispose-form"><h4 className="dark-green-text">Forms</h4></Link>
          <Link to="/display-dispose"><h4 className="dark-green-text">Disposes</h4></Link>
          <Link to="/address-form"><h4 className="dark-green-text">Address Form</h4></Link>
          <Link to="/login"><h4 className="light-text">Login</h4></Link>
          <Link to="/signup"><h4 className="borded-button">Sign Up</h4></Link>
        </ul>

      </div>
      
    </div>
  )
}

export default NavBar