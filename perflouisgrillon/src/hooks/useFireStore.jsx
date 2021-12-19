import { useEffect, useState} from 'react'
import { db } from '../Firebase'
import { collection, query, onSnapshot, orderBy} from 'firebase/firestore'


function useFirestore (collectionName) {
        const [docs, setDocs] = useState([]);

        useEffect(() => {
          const q = query(collection(db, "images"), orderBy('createdAt', 'desc'))
          const unsubscribe = onSnapshot(q, (querySnap) => {
            const documents = []
            querySnap.forEach((doc) =>{
              documents.push({...doc.data(), id: doc.id})
            })
            setDocs(documents)
          })
          return () => unsubscribe()
    }, [collectionName]);  
    return { docs };
  } 
  export default useFirestore;

