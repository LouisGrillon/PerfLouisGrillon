import React, { useState } from 'react'
import Footer from '../Footer/Footer'
import Layout from '../Layout/Layout'
import ProgressBar from './ProgressBar'
import VidProgressBar from './VidProgressBar'
import PhotoPreviewManager from './PhotoPreviewManager'
import VideoPreviewManager from './VideoPreviewManager'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './Admin.css'

function Admin() {
    const imgtypes = ["image/png", "image/jpeg"]
    const vidtypes = ["video/mp4", "video/webm"]

    const [error, setError] = useState(null)
    const [viderror, setVidError] = useState(null)
    const [file, setFile] = useState(null)
    const [vidfile, setVidFile] = useState(null)

    const currentYear = new Date().getFullYear()

    // Année réelle des photos
    const [year, setYear] = useState(currentYear)
    const [selectedYear, setSelectedYear] = useState(null)

    // Année réelle des vidéos
    const [videoYear, setVideoYear] = useState(currentYear)
    const [selectedVideoYear, setSelectedVideoYear] = useState(null)

    // Rubrique actuellement affichée
    const [activeSection, setActiveSection] = useState('photos')

    const { logout } = useAuth()
    const navigate = useNavigate()

    function changeHandler(e) {
        const selected = e.target.files[0]

        if (selected && imgtypes.includes(selected.type)) {
            setFile(selected)
            setSelectedYear(year)
            setError('')
        } else {
            setFile(null)
            setSelectedYear(null)
            setError('Veuillez sélectionner une image PNG ou JPEG')
        }
    }

    function changeVidHandler(e) {
        const selected = e.target.files[0]

        if (selected && vidtypes.includes(selected.type)) {
            setVidFile(selected)
            setSelectedVideoYear(videoYear)
            setVidError('')
        } else {
            setVidFile(null)
            setSelectedVideoYear(null)
            setVidError(
                'Veuillez sélectionner une vidéo MP4 ou WebM'
            )
        }
    }

    async function exit(e) {
        e.preventDefault()
        await logout()
        navigate('/login', { replace: true })
    }

    return (
        <>
            <div className="uploadPage">

                {/* Navigation entre les quatre rubriques */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        gap: '12px',
                        width: '100%',
                        padding: '20px',
                        boxSizing: 'border-box'
                    }}
                >
                    {[
                        ['photos', 'Ajouter des photos'],
                        ['videos', 'Ajouter des vidéos'],
                        ['preview', "Photos d'aperçu"],
                        ['videoPreview', "Vidéos d'aperçu"]
                    ].map(([section, label]) => (
                        <button
                            key={section}
                            type="button"
                            onClick={() => setActiveSection(section)}
                            style={{
                                padding: '12px 18px',
                                borderRadius: '8px',
                                border: '1px solid #e2b55c',
                                background:
                                    activeSection === section
                                        ? '#e2b55c'
                                        : '#191919',
                                color:
                                    activeSection === section
                                        ? '#111'
                                        : '#fff',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Rubrique : Ajouter des photos */}
                {activeSection === 'photos' && (
                    <form
                        className="uploadForm"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <h1>Selectionnez une Image</h1>

                        <div style={{ marginBottom: '15px' }}>
                            <label
                                htmlFor="photoYear"
                                style={{
                                    display: 'block',
                                    color: 'white',
                                    marginBottom: '8px'
                                }}
                            >
                                Année réelle de la photo
                            </label>

                            <select
                                id="photoYear"
                                value={year}
                                onChange={(e) =>
                                    setYear(Number(e.target.value))
                                }
                                disabled={Boolean(file)}
                                style={{
                                    padding: '10px',
                                    borderRadius: '6px',
                                    fontSize: '16px',
                                    maxWidth: '100%'
                                }}
                            >
                                {Array.from(
                                    { length: currentYear - 2006 + 1 },
                                    (_, index) => currentYear - index
                                ).map((photoYear) => (
                                    <option
                                        key={photoYear}
                                        value={photoYear}
                                    >
                                        {photoYear}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <label className="uploadLabel">
                            <input
                                className="uploadInput"
                                type="file"
                                accept="image/png,image/jpeg"
                                onChange={changeHandler}
                                name="images"
                                style={{ color: 'white' }}
                                disabled={Boolean(file)}
                            />
                            <span className="uploadBtn">+</span>
                        </label>

                        <div className="output">
                            {error && (
                                <div className="error">{error}</div>
                            )}

                            {file && (
                                <div>
                                    {file.name} — Année : {selectedYear}
                                </div>
                            )}

                            {file && (
                                <ProgressBar
                                    file={file}
                                    setFile={setFile}
                                    year={selectedYear}
                                />
                            )}
                        </div>
                    </form>
                )}

                {/* Rubrique : Ajouter des vidéos */}
                {activeSection === 'videos' && (
                    <form
                        className="uploadForm"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <h1>Selectionnez une Vidéo</h1>

                        <div style={{ marginBottom: '15px' }}>
                            <label
                                htmlFor="videoYear"
                                style={{
                                    display: 'block',
                                    color: 'white',
                                    marginBottom: '8px'
                                }}
                            >
                                Année réelle de la vidéo
                            </label>

                            <select
                                id="videoYear"
                                value={videoYear}
                                onChange={(e) =>
                                    setVideoYear(Number(e.target.value))
                                }
                                disabled={Boolean(vidfile)}
                                style={{
                                    padding: '10px',
                                    borderRadius: '6px',
                                    fontSize: '16px',
                                    maxWidth: '100%'
                                }}
                            >
                                {Array.from(
                                    { length: currentYear - 2006 + 1 },
                                    (_, index) => currentYear - index
                                ).map((item) => (
                                    <option
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <label className="uploadLabel">
                            <input
                                className="uploadInput"
                                type="file"
                                accept="video/mp4,video/webm"
                                onChange={changeVidHandler}
                                name="videos"
                                style={{ color: 'white' }}
                                disabled={Boolean(vidfile)}
                            />
                            <span className="uploadBtn">+</span>
                        </label>

                        <div className="output">
                            {viderror && (
                                <div className="error">
                                    {viderror}
                                </div>
                            )}

                            {vidfile && (
                                <div>
                                    {vidfile.name} — Année : {selectedVideoYear}
                                </div>
                            )}

                            {vidfile && (
                                <VidProgressBar
                                    vidfile={vidfile}
                                    setVidFile={setVidFile}
                                    year={selectedVideoYear}
                                />
                            )}
                        </div>
                    </form>
                )}

                {/* Rubrique : Choisir les photos d'aperçu */}
                {activeSection === 'preview' && (
                    <PhotoPreviewManager />
                )}

                {/* Rubrique : Choisir les vidéos d'aperçu */}
                {activeSection === 'videoPreview' && (
                    <VideoPreviewManager />
                )}

                <LogoutIcon
                    className="logout"
                    onClick={exit}
                />
            </div>

            <Layout />

            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default Admin
