import { db } from '../Firebase'
import { useEffect, useState} from 'react'
import { collection, query, onSnapshot, orderBy} from 'firebase/firestore'


function useFirestoreVid (collectionName) {
        const [vidDocs, setVidDocs] = useState([]);
        useEffect(() => {
          const q = query(collection(db, "videos"), orderBy('createdAt', 'desc'))
          const unsub = onSnapshot(q, (querySnapshot) =>{
            const documents = []
            querySnapshot.forEach((videoDoc)=>{
              documents.push({...videoDoc.data(), id: videoDoc.id})
            }) 
            setVidDocs(documents)
          })
          return () => unsub()
    }, [collectionName]);  
    return { vidDocs };
  } 
  export default useFirestoreVid;