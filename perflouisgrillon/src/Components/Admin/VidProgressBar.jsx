import { useEffect } from 'react'
import useVidStorage from '../../hooks/useVidStorage'
import './Admin.css'

function VidProgressBar({ vidfile, setVidFile, year }) {
    const { vidUrl, progress, error } = useVidStorage(
        vidfile,
        year
    )

    useEffect(() => {
        if (vidUrl) {
            setVidFile(null)
        }
    }, [vidUrl, setVidFile])

    return (
        <>
            <span
                className="progressBar"
                role="progressbar"
                style={{ width: `${progress}%` }}
            />

            <span className="percentage">
                {progress}%
            </span>

            {error && (
                <div className="error">
                    Erreur lors de l'envoi de la vidéo.
                </div>
            )}
        </>
    )
}

export default VidProgressBar
