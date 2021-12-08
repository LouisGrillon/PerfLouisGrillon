import { useEffect, useState } from 'react'
import {storage, timestamp, db } from '../Firebase'
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from 'firebase/firestore'

function useVidStorage(vidfile) {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [vidUrl, setVidUrl] = useState(null);
   
    useEffect(() => {

        const storageReference = storageRef(storage, vidfile.name);
        const uploadTask = uploadBytesResumable(storageReference, vidfile);

        uploadTask.on('state_changed', (snap) => {
            let percent = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percent >> 0); // or Math.trunc() 
        }, (err) => {
            setError(err);
        }, async () =>{
            const vidUrl = await getDownloadURL(storageReference);
            const createdAt = timestamp();
            const videoCollectionRef = collection(db, "videos")
            addDoc(videoCollectionRef, {vidUrl, createdAt})
            setVidUrl(vidUrl);
        });

    }, [vidfile]);

    return {progress, vidUrl, error};
}

export default useVidStorage;