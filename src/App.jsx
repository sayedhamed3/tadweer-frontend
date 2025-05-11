import './App.css'
import {Routes ,Route} from 'react-router'
import NavBar from './components/Navbar/NavBar'
import SignUp from './components/Auth/SignUp'
import Login from './components/Auth/Login'
import Homepage from './components/Home/Homepage'
import DisplayDispose from './components/Worker/DisplayDispose'
import ListDisposeForm from './components/Worker/ListDisposeForm'
import FormDetails from './components/Worker/FormDetails'

function App() {


  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/display-dispose" element={<DisplayDispose/>}/>
        <Route path="/list-dispose-form" element={<ListDisposeForm/>}/>
        <Route path="/form-details" element={<FormDetails/>}/>
      </Routes>
    </>
  )
}

export default App
