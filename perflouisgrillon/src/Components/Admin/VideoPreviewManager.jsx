import React, { useState } from 'react'
import { db } from '../../Firebase'
import { doc, writeBatch } from 'firebase/firestore'
import useFireStoreVid from '../../hooks/useFireStoreVid'

function VideoPreviewManager() {
    const { vidDocs } = useFireStoreVid('videos')

    const [year, setYear] = useState('')
    const [selectedIds, setSelectedIds] = useState([])
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState('')

    const currentYear = new Date().getFullYear()

    const years = [...new Set(
        vidDocs
            .map((video) => Number(video.year))
            .filter((value) =>
                Number.isInteger(value) &&
                value >= 2006 &&
                value <= currentYear
            )
    )].sort((a, b) => b - a)

    const videos = year
        ? vidDocs.filter(
            (video) => Number(video.year) === Number(year)
        )
        : []

    const selectVideo = (id) => {
        setMessage('')

        setSelectedIds((previous) => {
            if (previous.includes(id)) {
                return previous.filter((item) => item !== id)
            }

            if (previous.length >= 3) {
                return previous
            }

            return [...previous, id]
        })
    }

    const changeYear = (value) => {
        setYear(value)
        setMessage('')

        const savedVideos = vidDocs
            .filter(
                (video) =>
                    Number(video.year) === Number(value) &&
                    [1, 2, 3].includes(video.previewOrder)
            )
            .sort((a, b) => a.previewOrder - b.previewOrder)

        setSelectedIds(
            savedVideos.map((video) => video.id).slice(0, 3)
        )
    }

    const saveSelection = async () => {
        if (selectedIds.length !== 3 || saving) {
            return
        }

        setSaving(true)
        setMessage('')

        try {
            const batch = writeBatch(db)

            videos.forEach((video) => {
                const position = selectedIds.indexOf(video.id)

                const newOrder =
                    position !== -1 ? position + 1 : null

                if ((video.previewOrder ?? null) !== newOrder) {
                    batch.update(
                        doc(db, 'videos', video.id),
                        { previewOrder: newOrder }
                    )
                }
            })

            await batch.commit()

            setMessage(
                "Les 3 vidéos d'aperçu sont enregistrées !"
            )
        } catch (error) {
            console.error(error)
            setMessage(
                "Erreur lors de l'enregistrement."
            )
        } finally {
            setSaving(false)
        }
    }

    return (
        <div
            style={{
                color: 'white',
                padding: '25px',
                width: '100%',
                maxWidth: '1000px',
                boxSizing: 'border-box',
                margin: '40px auto',
                background: '#191919',
                borderRadius: '12px'
            }}
        >
            <h2>Choisir les 3 vidéos d'aperçu</h2>

            <p>
                Sélectionne une année, puis clique sur
                trois vidéos dans l'ordre souhaité.
            </p>

            <select
                value={year}
                onChange={(e) => changeYear(e.target.value)}
                style={{
                    padding: '10px',
                    marginBottom: '20px',
                    fontSize: '16px',
                    maxWidth: '100%'
                }}
            >
                <option value="">Choisir une année</option>

                {years.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>

            {year && (
                <>
                    <p>
                        {selectedIds.length} / 3 vidéos sélectionnées
                    </p>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns:
                                'repeat(auto-fill, minmax(160px, 1fr))',
                            gap: '12px',
                            width: '100%',
                            maxHeight: '500px',
                            overflowY: 'auto',
                            padding: '10px',
                            boxSizing: 'border-box',
                            alignContent: 'start'
                        }}
                    >
                        {videos.map((video) => {
                            const position =
                                selectedIds.indexOf(video.id)

                            return (
                                <div
                                    key={video.id}
                                    style={{
                                        background: '#111',
                                        border:
                                            position !== -1
                                                ? '4px solid #e2b55c'
                                                : '2px solid #555',
                                        borderRadius: '8px',
                                        padding: '8px'
                                    }}
                                >
                                    <video
                                        src={video.url || video.vidUrl}
                                        controls
                                        preload="metadata"
                                        playsInline
                                        style={{
                                            width: '100%',
                                            height: '150px',
                                            objectFit: 'contain'
                                        }}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            selectVideo(video.id)
                                        }
                                        disabled={saving}
                                        style={{
                                            width: '100%',
                                            padding: '10px',
                                            marginTop: '8px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {position !== -1
                                            ? `Sélectionnée n°${position + 1} — Retirer`
                                            : 'Sélectionner'}
                                    </button>
                                </div>
                            )
                        })}
                    </div>

                    <button
                        type="button"
                        onClick={saveSelection}
                        disabled={
                            selectedIds.length !== 3 || saving
                        }
                        style={{
                            marginTop: '25px',
                            padding: '12px 20px',
                            fontSize: '16px',
                            cursor: 'pointer'
                        }}
                    >
                        {saving
                            ? 'Enregistrement...'
                            : 'Enregistrer les 3 vidéos'}
                    </button>
                </>
            )}

            {message && <p>{message}</p>}
        </div>
    )
}

export default VideoPreviewManager
