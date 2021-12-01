import { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {useHistory} from 'react-router-dom';
import './Login.css'


export default  function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const {login} = useAuth()
    const [error, setError]= useState('')
    const [loading, setLoading]= useState(false)
    const history= useHistory()
    
    
    async function handleSubmit(e) {
        e.preventDefault()
        try{
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/admin")
        }
        catch{
        setError('Fail to log in')
        }
        setLoading(false)
    }
    
    
    return (
    <>
        <span className="oupslog">Oups ...</span>
        <div className="pageContainer">
            <div className="logComp">
                <div className="logText">
                    Login
                </div>
                    
                <div className="formContainer">

                    <form className="logForm" onSubmit={handleSubmit}>
                        <div>

                            <label 
                            className="logLabel">
                                Email
                            </label>
                            
                            <input
                            type="email" 
                            name="email" 
                            className="logInput" 
                            id="email"
                            ref={emailRef}
                            required
                            />
                                
                            <label 
                            className="logLabel">
                                Password
                            </label>
                            
                            <input
                            type="password" 
                            name="password" 
                            className="logInput"
                            id="password"
                            ref={passwordRef}
                            required
                            />

                        </div>

                        <button 
                        type="submit" 
                        className="logButton" disabled={loading} onSubmit={handleSubmit} >
                            Login
                        </button>

                    </form>
                    </div>
                </div>
        </div>
    </>
    )
}

