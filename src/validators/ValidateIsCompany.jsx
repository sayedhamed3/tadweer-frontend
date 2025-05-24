import {useContext} from 'react'
import { authContext } from '../context/AuthContext'
import { Navigate } from 'react-router'

function ValidateIsCompany(props) {
    const {user} = useContext(authContext)

    if(user){
        if(user.companyId){
            return( props.children)
        }
    }
    else{
        return(<Navigate to="/login"/>)
    }
}

export default ValidateIsCompany
