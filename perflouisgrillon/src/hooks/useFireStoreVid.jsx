import { projectFirestore } from '../Firebase'
import { useEffect, useState, useContext, createContext} from 'react'

function useFirestoreVid (collection) {
        const [vidDocs, setVidDocs] = useState([]);
        useEffect(() => {
              const unsub = projectFirestore.collection(collection)
                .orderBy('createdAt', 'desc')
                .onSnapshot(snap => {
                      let documents = [];
            
                      snap.forEach(doc => {
            documents.push({...doc.data(), id: doc.id});
          });

          setVidDocs(documents);
        });

      return () => unsub();
    }, [collection]);  
    return { vidDocs };
  } 
  export default useFirestoreVid;