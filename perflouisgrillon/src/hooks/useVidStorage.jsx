import {projectStorage, projectFirestore, timestamp} from '../Firebase'
import { useEffect, useState } from 'react'


function useVidStorage(vidfile) {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [vidUrl, setVidUrl] = useState(null);
   
    useEffect(() => {

        const storageRef = projectStorage.ref(vidfile.name)
        const collectionRef = projectFirestore.collection('videos');

        storageRef.put(vidfile).on('state_changed', (snap) => {
            let percent = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percent >> 0); // or Math.trunc() 
        }, (err) => {
            setError(err);
        }, async () =>{
            const vidUrl = await storageRef.getDownloadURL();
            const createdAt = timestamp();
            collectionRef.add({ vidUrl, createdAt});
            setVidUrl(vidUrl);
        });

    }, [vidfile]);

    return {progress, vidUrl, error};
}

export default useVidStorage;