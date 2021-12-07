import {projectStorage, timestamp} from '../Firebase'
import { useEffect, useState } from 'react'
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";


function useStorage(file) {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);
   
    useEffect(() => {
        const storageReference = storageRef(projectStorage, file.name);
        const uploadTask = uploadBytesResumable(storageReference, file);
      
        uploadTask.on("state_changed", (snapshot) => {
            console.log(snapshot + "hello je suis la snapshot");
            let percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(percent >> 0); 
            }, (err) => {
                setError(err);
            }, async () =>{
                const url = await getDownloadURL(storageRef);
                setUrl(url);
                console.log('hey ' + url );
        });
      }, [file])

    return {progress, url, error};
}

export default useStorage;

// useEffect(() => {

//     const storageRef = projectStorage.ref(file.name)
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