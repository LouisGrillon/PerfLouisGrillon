import {useContext, useState, useEffect, createContext} from 'react'
import { auth } from '../../Firebase'

const AuthContext = createContext()

export function useAuth() {
     return useContext(AuthContext)
}

export  function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    
    function register(email, password){
        return auth.createUserWithEmailAndPassword(email, password)
    }
    
    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        auth.signOut()
    }

    useEffect(() =>{
      const unsubscribe =  auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        register,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}