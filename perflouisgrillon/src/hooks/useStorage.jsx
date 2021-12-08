import { useEffect, useState } from 'react'
import {storage, db, timestamp} from '../Firebase'
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection} from 'firebase/firestore'

function useStorage(file) {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);
   
    useEffect(() => {
        const storageReference = storageRef(storage, file.name);
        const uploadTask = uploadBytesResumable(storageReference, file);
      
        uploadTask.on("state_changed", (snapshot) => {
            let percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(percent >> 0); 
            }, (err) => {
                setError(err);
            }, async () =>{
                const url =  await getDownloadURL(storageReference);
                const collectionRef = collection(db, "images")
                const createdAt = timestamp
                addDoc(collectionRef, {url, createdAt})

                setUrl(url);
        });
      }, [file])

    return {progress, url, error};
}

export default useStorage;

// useEffect(() => {

//     const storageRef = storage.ref(file.name)
//     const collectionRef = projectFirestore.collection('images');

//     storageRef.put(file).on('state_changed', (snap) => {
//         let percent = (snap.bytesTransferred / snap.totalBytes) * 100;
//         setProgress(percent >> 0); // or Math.trunc() 
//     }, (err) => {
//         setError(err);
//     }, async () =>{
//         const url = await storageRef.getDownloadURL();
//         const createdAt = timestamp();
//         collectionRef.add({ url, createdAt});
//         setUrl(url);
//     });

// }, [file]);