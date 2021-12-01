import {useEffect} from 'react'
import useVidStorage from '../../hooks/useVidStorage'
import './Admin.css'

function VidProgressBar({vidfile, setVidFile}) {
    const {vidUrl, progress} = useVidStorage(vidfile)
    console.log(progress, vidUrl);

    useEffect(() => {
        if(vidUrl){
            setVidFile(null)
        }
    }, [vidUrl])

    return (
        <>
            <span className="progressBar" role="progressbar" style={{width:progress}}></span>
            <span className="percentage">{progress}%</span>
        </>
    )
}

export default VidProgressBar