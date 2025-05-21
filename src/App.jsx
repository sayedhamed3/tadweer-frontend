import './App.css'
import {Routes ,Route} from 'react-router'
import NavBar from './components/Navbar/NavBar'
import SignUp from './components/Auth/SignUp'
import Login from './components/Auth/Login'
import Homepage from './components/Home/Homepage'
import DisplayDispose from './components/Worker/DisplayDispose'
import ListDisposeForm from './components/Worker/ListDisposeForm'
import FormDetails from './components/Worker/FormDetails'
import MaterialPage from './components/Company/MaterialPage'
import CompanyDisposes from './components/Company/CompanyDisposes'
import AddressForm from './components/Address/AddressForm'
import AddressDetails from './components/Address/AddressDetails'
import NewDispose from './components/Company/NewDispose'
import Achievement from './components/Company/Achievement'
import Profile from './components/Auth/Profile'
import DisposalDetails from './components/Company/DisposalDetails'

import MaterialDetails from './components/Company/MaterialDetails'

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
        <Route path="/address-form" element={<AddressForm/>}/>
        <Route path="/address-details/:addressId" element={<AddressDetails />}/>
        <Route path="/materials" element={<MaterialPage/>}/>
        <Route path="/company-disposes" element={<CompanyDisposes/>}/>
        <Route path="/dispose-request" element={<NewDispose/>}/>
        <Route path="/achievement" element={<Achievement/>}/>
        <Route path="/materials/:materialId" element={<MaterialDetails />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/company-disposes/:disposalId" element={<DisposalDetails />} />
      </Routes>
    </>
  )
}

export default App
