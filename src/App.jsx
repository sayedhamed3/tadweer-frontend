import './App.css'
import {Routes ,Route} from 'react-router'
import NavBar from './components/Navbar/NavBar'
import SignUp from './components/SignUp/SignUp'
import Login from './components/Login/Login'
import Homepage from './components/Homepage/Homepage'
import ValidateIsLoggedIn from './validators/ValidateIsLoggedIn'
import ValidateIsLoggedOut from './validators/ValidateIsLoggedOut'

function App() {


  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
