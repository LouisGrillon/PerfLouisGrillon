import React from 'react'
import {Navigate} from 'react-router-dom'
import { auth} from '../../Firebase'

function PrivateRoute({component: Component}) {
    const user = auth.currentUser
    return user ? <Component /> : <Navigate to='/login'/> 
    }
export default PrivateRoute