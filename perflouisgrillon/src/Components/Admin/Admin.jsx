import React, { useState } from 'react'
import Footer from '../Footer/Footer'
import Layout from '../Layout/Layout'
import ProgressBar from './ProgressBar'
import VidProgressBar from './VidProgressBar'
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

    // Année réelle de prise de vue
    const currentYear = new Date().getFullYear()
    const [year, setYear] = useState(currentYear)
    const [selectedYear, setSelectedYear] = useState(null)

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
            setVidError('')
        } else {
            setVidFile(null)
            setVidError('Please select a file that is a mp4 or webm')
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

                <form
                    className="uploadForm"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <h1>Selectionnez une Vidéo</h1>

                    <label className="uploadLabel">
                        <input
                            className="uploadInput"
                            type="file"
                            onChange={changeVidHandler}
                            name="videos"
                            style={{ color: 'white' }}
                        />
                        <span className="uploadBtn">+</span>
                    </label>

                    <div className="output">
                        {viderror && (
                            <div className="error">{viderror}</div>
                        )}

                        {vidfile && <div>{vidfile.name}</div>}

                        {vidfile && (
                            <VidProgressBar
                                vidfile={vidfile}
                                setVidFile={setVidFile}
                            />
                        )}
                    </div>
                </form>

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
