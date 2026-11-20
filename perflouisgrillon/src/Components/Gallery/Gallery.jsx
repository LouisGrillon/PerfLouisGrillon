import Footer from '../Footer/Footer'
import Layout from '../Layout/Layout'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import useFireStore from '../../hooks/useFireStore'
import CloseRounded from '@mui/icons-material/CloseRounded'
import './Gallery.css'
import '../Layout/Layout.css'

function Gallery() {
    const [model, setModel] = useState(false)
    const [tempImgSrc, setTempImgSrc] = useState('')
    const [openYears, setOpenYears] = useState([])

    const { docs } = useFireStore('images')

    const getImg = (url) => {
        setTempImgSrc(url)
        setModel(true)
    }

    const toggleYear = (year) => {
        setOpenYears((previous) =>
            previous.includes(year)
                ? previous.filter((item) => item !== year)
                : [...previous, year]
        )
    }

    // Regrouper les photos selon leur année réelle
    const groupedPhotos = {}

    docs.forEach((doc) => {
        const year = Number(doc.year)

        const group =
            Number.isInteger(year) && year >= 2006
                ? String(year)
                : 'Photos à classer'

        if (!groupedPhotos[group]) {
            groupedPhotos[group] = []
        }

        groupedPhotos[group].push(doc)
    })

    // Afficher les années les plus récentes en premier
    const years = Object.keys(groupedPhotos)
        .filter((year) => year !== 'Photos à classer')
        .sort((a, b) => Number(b) - Number(a))

    if (groupedPhotos['Photos à classer']) {
        years.push('Photos à classer')
    }

    return (
        <>
            <Layout />

            <div className="galleryPage">
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

                <div className={model ? 'model open' : 'model'}>
                    <div className="mediaContainer">
                        <img
                            src={tempImgSrc}
                            alt="Photo agrandie"
                        />

                        <CloseRounded
                            className="mediaClose"
                            onClick={() => setModel(false)}
                        />
                    </div>
                </div>

                <div className="gallerySections">
                    {years.map((year) => {
                        const photos = groupedPhotos[year]
                        const isOpen = openYears.includes(year)

                        return (
                            <section
                                className="galleryYearSection"
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
                                                : `Voir les photos de ${year}`
                                        }
                                    >
                                        {isOpen ? '−' : '+'}
                                    </button>
                                </div>

                                <div className="galleryYearPreview">
                                    {photos.slice(0, 3).map((photo) => (
                                        <div
                                            className="galleryPreviewPhoto"
                                            key={photo.id}
                                        >
                                            <img
                                                src={photo.url}
                                                alt={`Aperçu ${year}`}
                                                loading="lazy"
                                            />
                                        </div>
                                    ))}
                                </div>

                                {isOpen && (
                                    <div className="galleryYearExpanded">
                                        <div className="img_grid">
                                            {photos.map((photo) => (
                                                <button
                                                    type="button"
                                                    className="imgWrap"
                                                    key={photo.id}
                                                    onClick={() =>
                                                        getImg(photo.url)
                                                    }
                                                >
                                                    <img
                                                        className="imgbox"
                                                        src={photo.url}
                                                        alt={`Galerie ${year}`}
                                                        loading="lazy"
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

export default Gallery
