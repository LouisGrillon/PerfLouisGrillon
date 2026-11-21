import Footer from '../Footer/Footer'
import Layout from '../Layout/Layout'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import useFireStoreVid from '../../hooks/useFireStoreVid'
import CloseRounded from '@mui/icons-material/CloseRounded'
import './Gallery.css'
import './Video.css'

function Video() {
    const [vidModel, setVidModel] = useState(false)
    const [tempVidSrc, setTempVidSrc] = useState('')
    const [openYears, setOpenYears] = useState([])

    const { vidDocs } = useFireStoreVid('videos')

    // Ouvrir une vidéo en grand
    const getVid = (url) => {
        if (!url) return

        setTempVidSrc(url)
        setVidModel(true)
    }

    // Fermer la vidéo et arrêter sa lecture
    const closeVid = () => {
        setVidModel(false)
        setTempVidSrc('')
    }

    // Une seule année ouverte à la fois
    const toggleYear = (year) => {
        setOpenYears((previous) =>
            previous.includes(year) ? [] : [year]
        )
    }

    // Regrouper les vidéos selon leur année réelle
    const groupedVideos = {}

    vidDocs.forEach((doc) => {
        const year = Number(doc.year)

        const group =
            Number.isInteger(year) && year >= 2006
                ? String(year)
                : 'Vidéos à classer'

        if (!groupedVideos[group]) {
            groupedVideos[group] = []
        }

        groupedVideos[group].push(doc)
    })

    // Afficher les années les plus récentes en premier
    const years = Object.keys(groupedVideos)
        .filter((year) => year !== 'Vidéos à classer')
        .sort((a, b) => Number(b) - Number(a))

    // Sécurité : ne pas masquer une vidéo sans année
    if (groupedVideos['Vidéos à classer']) {
        years.push('Vidéos à classer')
    }

    // Masquer les autres années lorsqu'une année est ouverte
    const visibleYears = years.filter(
        (year) =>
            openYears.length === 0 ||
            openYears.includes(year)
    )

    return (
        <>
            <Layout />

            <div className="galleryPage videoPage">
                <div className="gallery_Link">
                    <span className="redirect_img_wrapper">
                        <Link className="redirect" to="/gallery">
                            Images
                        </Link>
                    </span>

                    <span className="redirect_vid_wrapper">
                        <Link className="redirect" to="/video">
                            Videos
                        </Link>
                    </span>
                </div>

                {/* Lecture des vidéos en grand */}
                <div
                    className={
                        vidModel ? 'vidModel open' : 'vidModel'
                    }
                >
                    <div className="mediaContainer">
                        {vidModel && (
                            <video
                                controls
                                autoPlay
                                playsInline
                                src={tempVidSrc}
                            />
                        )}

                        <CloseRounded
                            className="mediaClose"
                            onClick={closeVid}
                        />
                    </div>
                </div>

                {/* Galerie organisée par année */}
                <div className="gallerySections">
                    {visibleYears.map((year) => {
                        const videos = groupedVideos[year]
                        const isOpen = openYears.includes(year)

                        // Récupérer les 3 vidéos choisies dans l'Admin
                        const selectedPreviews = videos
                            .filter((video) =>
                                [1, 2, 3].includes(
                                    video.previewOrder
                                )
                            )
                            .sort(
                                (a, b) =>
                                    a.previewOrder - b.previewOrder
                            )

                        // Utiliser la sélection enregistrée dans Firebase
                        // Sinon, afficher les 3 premières vidéos
                        const previewVideos =
                            selectedPreviews.length === 3
                                ? selectedPreviews
                                : videos.slice(0, 3)

                        return (
                            <section
                                className={
                                    isOpen
                                        ? 'galleryYearSection galleryYearSectionOpen'
                                        : 'galleryYearSection'
                                }
                                key={year}
                            >
                                <div className="galleryYearHeader">
                                    <h2 className="galleryYearTitle">
                                        {year}
                                    </h2>

                                    <button
                                        type="button"
                                        className="galleryYearToggle"
                                        onClick={() => toggleYear(year)}
                                        aria-expanded={isOpen}
                                        aria-label={
                                            isOpen
                                                ? `Fermer ${year}`
                                                : `Voir les vidéos de ${year}`
                                        }
                                    >
                                        {isOpen ? '−' : '+'}
                                    </button>
                                </div>

                                {/* Les 3 vidéos d'aperçu sélectionnées */}
                                <div className="galleryYearPreview">
                                    {previewVideos.map((video) => (
                                        <div
                                            className="galleryPreviewPhoto"
                                            key={video.id}
                                        >
                                            <video
                                                src={
                                                    video.url ||
                                                    video.vidUrl
                                                }
                                                muted
                                                playsInline
                                                preload="metadata"
                                                aria-hidden="true"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    display: 'block',
                                                    background: '#111',
                                                    pointerEvents: 'none'
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Toutes les vidéos de l'année */}
                                {isOpen && (
                                    <div className="galleryYearExpanded">
                                        <div className="vid_grid">
                                            {videos.map((video) => (
                                                <button
                                                    type="button"
                                                    className="vidWrap"
                                                    key={video.id}
                                                    onClick={() =>
                                                        getVid(
                                                            video.url ||
                                                            video.vidUrl
                                                        )
                                                    }
                                                    aria-label={
                                                        `Lire une vidéo de ${year}`
                                                    }
                                                    style={{
                                                        padding: 0,
                                                        cursor: 'pointer',
                                                        background: 'transparent'
                                                    }}
                                                >
                                                    <video
                                                        muted
                                                        playsInline
                                                        preload="metadata"
                                                        className="vidbox"
                                                        src={
                                                            video.url ||
                                                            video.vidUrl
                                                        }
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </section>
                        )
                    })}
                </div>
            </div>

            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default Video
