import Footer from '../Footer/Footer'
import Layout from '../Layout/Layout'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import useFireStore from '../../hooks/useFireStore'
import CloseRounded from '@mui/icons-material/CloseRounded';
import './Gallery.css'
import '../Layout/Layout.css'


function Gallery() {

    const [model, setModel] = useState(false)

    const [tempImgSrc, setTempImgSrc] = useState('')
    
    const {docs} = useFireStore('images')

    const getImg = (url) =>{
        setTempImgSrc(url)
        setModel(true)
    }

    return (
        <>
            <Layout/>       
            <div className="galleryPage" >
            <div className="gallery_Link">
                    <span className="redirect_img_wrapper">
                        <Link className="redirect" to='/gallery'>Images</Link>
                    </span>
                    <span className="redirect_vid_wrapper" >
                        <Link className="redirect" to='/video'>Videos</Link>
                    </span>
            </div>
                <div className={ model? "model open" : "model" } >
                   <img src={ tempImgSrc } />
                   <CloseRounded onClick={ () => setModel(false) } />
                </div> 
                <div className="img_grid">
                    {docs && docs.map( doc =>
                            {
                                return (
                                    <div className="imgWrap" key={doc.id} onClick={ () =>getImg(doc.url) } >
                                        <img className="imgbox" src={doc.url} alt="gallery" />
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
 export default Gallery