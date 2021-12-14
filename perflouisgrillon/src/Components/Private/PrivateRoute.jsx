import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import { auth } from '../../Firebase'

function PrivateRoute() {
    const user = auth.currentUser
    return user ? <Outlet/> : <Navigate to='/login'  /> 
    }
export default PrivateRoute