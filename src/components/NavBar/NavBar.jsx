import { Link } from "react-router"
import { useContext } from "react"
import { authContext } from "../../context/AuthContext"


function NavBar() {
  const {user, logout} = useContext(authContext)


  return (
    <div className='navbar'>
      
      <div className="nav-content">
          
        <h1>TADWEER</h1>

        <ul className="nav-list">
          <Link to="/login"><h4 className="light-text">Login</h4></Link>
          <Link to="/signup"><h4 className="borded-button">Sign Up</h4></Link>
        </ul>

      </div>
      
    </div>
  )
}

export default NavBar