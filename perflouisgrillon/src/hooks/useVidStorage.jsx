import { useEffect, useState } from 'react'
import { storage, timestamp, db } from '../Firebase'
import {
    ref as storageRef,
    uploadBytesResumable,
    getDownloadURL
} from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore'

function useVidStorage(vidfile, year) {
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(null)
    const [vidUrl, setVidUrl] = useState(null)

    useEffect(() => {
        if (!vidfile) {
            return
        }

        const storageReference = storageRef(
            storage,
            vidfile.name
        )

        const uploadTask = uploadBytesResumable(
            storageReference,
            vidfile
        )

        uploadTask.on(
            'state_changed',
            (snap) => {
                const percent =
                    (snap.bytesTransferred / snap.totalBytes) * 100

                setProgress(Math.floor(percent))
            },
            (err) => {
                console.error(err)
                setError(err)
            },
            async () => {
                try {
                    const uploadedUrl =
                        await getDownloadURL(storageReference)

                    const videoData = {
                        vidUrl: uploadedUrl,
                        createdAt: timestamp
                    }

                    // Enregistrer l'année réelle de la vidéo
                    const selectedYear = Number(year)

                    if (
                        year != null &&
                        year !== '' &&
                        Number.isInteger(selectedYear) &&
                        selectedYear >= 2006 &&
                        selectedYear <= new Date().getFullYear()
                    ) {
                        videoData.year = selectedYear
                    }

                    const videoCollectionRef = collection(
                        db,
                        'videos'
                    )

                    await addDoc(
                        videoCollectionRef,
                        videoData
                    )

                    setVidUrl(uploadedUrl)
                } catch (err) {
                    console.error(err)
                    setError(err)
                }
            }
        )
    }, [vidfile, year])

    return { progress, vidUrl, error }
}

export default useVidStorage
