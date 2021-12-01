import React, { useState } from 'react'
import Footer from '../Footer/Footer'
import Layout from '../Layout/Layout'
import ProgressBar from './ProgressBar'
import VidProgressBar from './VidProgressBar'
import './Admin.css'

function Admin() {
    const imgtypes = ["image/png", "image/jpeg"];
    const vidtypes = ["video/mp4", "video/webm"];
    const [error, setError] = useState(null);
    const [viderror, setVidError] = useState(null);
    const [file, setFile] = useState(null);
    const [vidfile, setVidFile] = useState(null);

    function changeHandler (e) {
        let selected = e.target.files[0];
        console.log(selected);
    
        if (selected && imgtypes.includes(selected.type)) {
            setFile(selected);
            setError('');
        } else{
            setFile(null);
            setError('Please select a file that is a png or jpeg');
        }
    };
 
    function changeVidHandler (e) {
        let selected = e.target.files[0];
        console.log(selected);
    
        if (selected && vidtypes.includes(selected.type)) {
            setVidFile(selected);
            setVidError('');
        } else{
            setVidFile(null);
            setVidError('Please select a file that is a mp4 or webm');
        }
    };

    return (
        <>
        <div className="uploadPage">
            <form className="uploadForm">
            <h1>Selectionnez une Image</h1>
                <label className="uploadLabel">
                    <input className="uploadInput" type="file" onChange={changeHandler} name="images" style={{color:'white'}} />
                    <span className="uploadBtn">+</span>
                </label>
                <div className="output">
                    { error && <div className="error">{ error }</div> }
                    { file && <div>{file.name}</div> }
                    { file && <ProgressBar file={file} setFile={setFile} /> }
                </div>
            </form>
            <form className="uploadForm">
                <h1>Selectionnez une Vidéo</h1>
                <label className="uploadLabel">
                    <input className="uploadInput" type="file" onChange={changeVidHandler} name="videos" style={{color:'white'}} />
                    <span className="uploadBtn">+</span>
                </label>
                <div className="output">
                    { viderror && <div className="error">{ viderror }</div> }
                    { vidfile && <div>{vidfile.name}</div> }
                    { vidfile && <VidProgressBar vidfile={vidfile} setVidFile={setVidFile} /> }
                </div>
            </form>

            </div>
            
            <Layout/>
        <footer>
            <Footer/>
        </footer>
        </>
    )
}


export default Admin;