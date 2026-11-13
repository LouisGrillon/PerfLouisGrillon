import Footer from '../Footer/Footer'
import Layout from '../Layout/Layout'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import useFireStoreVid from '../../hooks/useFireStoreVid'
import CloseRounded from '@mui/icons-material/CloseRounded';
import './Video.css'


function Video() {
    const [vidModel, setVidModel] = useState(false)
    const [tempVidSrc,setTempVidSrc] = useState('')
    const {vidDocs} = useFireStoreVid('videos')
    const getVid = (url) =>{
        setTempVidSrc(url)
        setVidModel(true)
    }
    return (
        <>
            <Layout/>       
            <div className="videoPage" >
            <div className="gallery_Link">
                    <span className="redirect_img_wrapper">
                        <Link className="redirect" to='/gallery'>Images</Link>
                    </span>
                    <span className="redirect_vid_wrapper" >
                        <Link className="redirect" to='/video'>Videos</Link>
                    </span>
                </div>

                <<div className={vidModel ? "vidModel open" : "vidModel"}>
  <div className="mediaContainer">
    <video controls src={tempVidSrc} />
    <CloseRounded
      className="mediaClose"
      onClick={() => setVidModel(false)}
    />
  </div>
</div> 

                <div className="vid_grid">
                    {vidDocs && vidDocs.map( doc =>
                            {
                                return (
                                    <div className="vidWrap" key={doc.id} onClick={ () => getVid(doc.url || doc.vidUrl) } >
                                        <video muted="true" className="vidbox" src={doc.url || doc.vidUrl} alt="gallery" id="vid" />
                                    </div>
                                )
                            } 
                        )
                    }
                </div>
            </div>
            <footer>
                <Footer/>
            </footer>
        </>
      )
}
 export default Video
