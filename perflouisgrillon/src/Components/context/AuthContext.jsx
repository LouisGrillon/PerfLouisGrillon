import {useContext, useState, useEffect, createContext} from 'react'
import { auth } from '../../Firebase'
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth";


const AuthContext = createContext()

export function useAuth() {
     return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    
    function register(email, password){
        return createUserWithEmailAndPassword(auth, email, password)
    }
    
    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        signOut(auth)
    }

    useEffect(() =>{
      const unsubscribe = onAuthStateChanged(auth ,(user) => {
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