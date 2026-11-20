import { useEffect, useState } from 'react'
import { storage, db, timestamp } from '../Firebase'
import {
    ref as storageRef,
    uploadBytesResumable,
    getDownloadURL
} from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore'

function useStorage(file, year) {
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(null)
    const [url, setUrl] = useState(null)

    useEffect(() => {
        if (!file || !Number.isInteger(year)) {
            return
        }

        const reference = storageRef(storage, file.name)
        const uploadTask = uploadBytesResumable(reference, file)

        const unsubscribe = uploadTask.on(
            'state_changed',
            (snapshot) => {
                const percent =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100

                setProgress(Math.floor(percent))
            },
            (err) => {
                setError(err)
            },
            async () => {
                try {
                    const downloadUrl = await getDownloadURL(reference)

                    await addDoc(collection(db, 'images'), {
                        url: downloadUrl,
                        createdAt: timestamp,
                        year: year
                    })

                    setUrl(downloadUrl)
                } catch (err) {
                    setError(err)
                }
            }
        )

        return () => {
            unsubscribe()
        }
    }, [file, year])

    return { progress, url, error }
}

export default useStorage
