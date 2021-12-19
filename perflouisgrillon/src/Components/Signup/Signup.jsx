// import {useRef, useState} from 'react';
// import { useAuth } from '../context/AuthContext'
// import {useNavigate} from 'react-router-dom';
// import './Signup.css'

// export default function Register() {

//     const emailRef = useRef()
//     const passwordRef = useRef()
//     const passwordConfirmRef = useRef()
//     const {register} = useAuth()
//     const [error, setError]= useState('')
//     const [loading, setLoading]= useState(false)
//     const navigate= useNavigate()
    
//     async function handleSubmit(e) {
//         e.preventDefault()
//         if(passwordRef.current.value !== passwordConfirmRef.current.value){
//             return setError('Password do not match')
//         }
//         try{
//             setError('')
//             setLoading(true)
//             await register(emailRef.current.value, passwordRef.current.value)
//             navigate("/admin")
//         }
//         catch{
//         setError('Fail to create an account')
//         }
//         setLoading(false)
//     }
    
//     return (
//         <>
//             <span className="oupsSign">Oups ...</span>
//             <div className="pageContainer">
//                 <div className="signupComp">
//                     <div className="signupText">
//                         Sign Up
//                     </div>           
//                     <div className="formContainer">
//                         <form className="signupForm" onSubmit={handleSubmit}>
//                             <div>
//                                 <label 
//                                 className="labelSignup">
//                                     Email
//                                 </label>
                                    
//                                 <input
//                                 type="email" 
//                                 name="email" 
//                                 className="signupInput" 
//                                 id="email"
//                                 autoComplete="off"
//                                 ref={emailRef}
//                                 required
//                                 />
                                        
//                                 <label 
//                                 className="labelSignup">
//                                     Password
//                                 </label>
                                
//                                 <input
//                                 type="password" 
//                                 name="password" 
//                                 className="signupInput"
//                                 id="password"
//                                 autoComplete="off"
//                                 ref={passwordRef}
//                                 required
//                                 />

//                                 <label 
//                                 className="labelSignup">
//                                     Password Conf
//                                 </label>
//                                 <input
//                                 type="password" 
//                                 name="password" 
//                                 className="signupInput"
//                                 id="password"
//                                 autoComplete="off"
//                                 ref={passwordConfirmRef}
//                                 required
//                                 />
//                             </div>
//                             <button 
//                             type="submit" 
//                             className="signupButton" disabled={loading} onSubmit={handleSubmit} >
//                                 Submit
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }