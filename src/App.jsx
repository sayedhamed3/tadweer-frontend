import './App.css'
import {Routes ,Route} from 'react-router'
import NavBar from './components/Navbar/NavBar'
import SignUp from './components/Auth/SignUp'
import Login from './components/Auth/Login'
import Homepage from './components/Home/Homepage'
import DisplayDispose from './components/Worker/DisplayDispose'

function App() {


  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/display-dispose" element={<DisplayDispose/>}/>
      </Routes>
    </>
  )
}

export default App
