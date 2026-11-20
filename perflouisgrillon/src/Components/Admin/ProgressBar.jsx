import { useEffect } from 'react'
import useStorage from '../../hooks/useStorage'
import './Admin.css'

function ProgressBar({ file, setFile, year }) {
    const { url, progress, error } = useStorage(file, year)

    useEffect(() => {
        if (url) {
            setFile(null)
        }
    }, [url, setFile])

    return (
        <>
            <span
                className="progressBar"
                role="progressbar"
                style={{ width: progress + '%' }}
            ></span>

            <span className="percentage">
                {progress}%
            </span>

            {error && (
                <div className="error">
                    Erreur lors de l'importation de la photo.
                </div>
            )}
        </>
    )
}

export default ProgressBar
