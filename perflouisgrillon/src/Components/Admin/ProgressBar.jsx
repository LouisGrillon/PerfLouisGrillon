import {useEffect} from 'react'
import useStorage from '../../hooks/useStorage'
import './Admin.css'

function ProgressBar({file, setFile}) {
    const {url, progress} = useStorage(file)
    console.log(progress, url);

    useEffect(() => {
        if(url){
            setFile(null)
        }
    }, [url, setFile])

    return (
        <>
            <span className="progressBar" role="progressbar" style={{width:progress + '%'}}></span>
            <span className="percentage">{progress}%</span>
        </>
    )
}

export default ProgressBar