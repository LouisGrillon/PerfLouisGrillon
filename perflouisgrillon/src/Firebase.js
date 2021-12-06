import {initializeApp} from 'firebase/app'
import {serverTimestamp, getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import {getAuth} from'firebase/auth'


const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_API_KEY,
    authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_APP_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_APP_ID
    // measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig)
export const timestamp = serverTimestamp()
export const projectFirestore= getFirestore(app)
export const projectStorage= getStorage(app)
export const auth = getAuth(app)



export default app