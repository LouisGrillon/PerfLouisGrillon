import React, { useState } from 'react'
import { db } from '../../Firebase'
import { doc, updateDoc, writeBatch } from 'firebase/firestore'
import useFireStoreVid from '../../hooks/useFireStoreVid'

function VideoPreviewManager() {
    const { vidDocs } = useFireStoreVid('videos')

    const [year, setYear] = useState('')
    const [selectedIds, setSelectedIds] = useState([])
    const [assignedYears, setAssignedYears] = useState({})
    const [saving, setSaving] = useState(false)
    const [updatingId, setUpdatingId] = useState(null)
    const [message, setMessage] = useState('')

    const currentYear = new Date().getFullYear()

    const yearOptions = Array.from(
        { length: currentYear - 2006 + 1 },
        (_, index) => currentYear - index
    )

    const hasValidYear = (video) => {
        const value = Number(video.year)
        return Number.isInteger(value) &&
            value >= 2006 &&
            value <= currentYear
    }

    const unclassifiedVideos = vidDocs.filter(
        (video) => !hasValidYear(video)
    )

    const years = [...new Set(
        vidDocs
            .filter(hasValidYear)
            .map((video) => Number(video.year))
    )].sort((a, b) => b - a)

    const videos = year
        ? vidDocs.filter(
            (video) => Number(video.year) === Number(year)
        )
        : []

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

    const assignYear = async (videoId) => {
        const selectedYear = Number(assignedYears[videoId])

        if (!yearOptions.includes(selectedYear)) {
            setMessage('Choisis une année valide.')
            return
        }

        setUpdatingId(videoId)
        setMessage('')

        try {
            await updateDoc(doc(db, 'videos', videoId), {
                year: selectedYear
            })

            setMessage('Année enregistrée avec succès !')
        } catch (error) {
            console.error(error)
            setMessage("Erreur lors de l'enregistrement de l'année.")
        } finally {
            setUpdatingId(null)
        }
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

            setMessage('Les 3 vidéos d’aperçu sont enregistrées !')
        } catch (error) {
            console.error(error)
            setMessage("Erreur lors de l'enregistrement.")
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

            {unclassifiedVideos.length > 0 && (
                <div style={{ marginBottom: '35px' }}>
                    <h3>
                        Vidéos sans année
                        ({unclassifiedVideos.length})
                    </h3>

                    <p>
                        Attribue leur année réelle aux vidéos
                        existantes. Elles ne seront pas supprimées.
                    </p>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns:
                                'repeat(auto-fill, minmax(200px, 1fr))',
                            gap: '15px',
                            maxHeight: '450px',
                            overflowY: 'auto',
                            padding: '10px'
                        }}
                    >
                        {unclassifiedVideos.map((video) => (
                            <div
                                key={video.id}
                                style={{
                                    background: '#111',
                                    padding: '10px',
                                    borderRadius: '8px'
                                }}
                            >
                                <video
                                    src={video.url || video.vidUrl}
                                    controls
                                    preload="metadata"
                                    playsInline
                                    style={{
                                        width: '100%',
                                        maxHeight: '160px'
                                    }}
                                />

                                <select
                                    value={assignedYears[video.id] || ''}
                                    onChange={(e) =>
                                        setAssignedYears({
                                            ...assignedYears,
                                            [video.id]: e.target.value
                                        })
                                    }
                                    style={{
                                        padding: '8px',
                                        marginTop: '10px',
                                        maxWidth: '100%'
                                    }}
                                >
                                    <option value="">
                                        Choisir une année
                                    </option>

                                    {yearOptions.map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>

                                <button
                                    type="button"
                                    onClick={() => assignYear(video.id)}
                                    disabled={
                                        updatingId !== null ||
                                        !assignedYears[video.id]
                                    }
                                    style={{
                                        display: 'block',
                                        marginTop: '10px',
                                        padding: '8px'
                                    }}
                                >
                                    {updatingId === video.id
                                        ? 'Enregistrement...'
                                        : "Enregistrer l'année"}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <h3>Sélection des vidéos d'aperçu</h3>

            <p>
                Choisis une année, puis sélectionne trois vidéos
                dans l'ordre souhaité.
            </p>

            <select
                value={year}
                onChange={(e) => changeYear(e.target.value)}
                style={{
                    padding: '10px',
                    marginBottom: '20px',
                    fontSize: '16px'
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
                            boxSizing: 'border-box'
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
