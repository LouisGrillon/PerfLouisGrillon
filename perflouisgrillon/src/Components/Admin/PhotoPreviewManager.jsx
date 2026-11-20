import React, { useState } from 'react'
import { db } from '../../Firebase'
import {
    doc,
    writeBatch
} from 'firebase/firestore'
import useFireStore from '../../hooks/useFireStore'

function PhotoPreviewManager() {
    const { docs } = useFireStore('images')

    const [year, setYear] = useState('')
    const [selectedIds, setSelectedIds] = useState([])
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState('')

    const years = [...new Set(
        docs
            .map((photo) => Number(photo.year))
            .filter((value) =>
                Number.isInteger(value) && value >= 2006
            )
    )].sort((a, b) => b - a)

    const photos = docs.filter(
        (photo) => Number(photo.year) === Number(year)
    )

    const selectPhoto = (id) => {
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

        const savedPhotos = docs
            .filter(
                (photo) =>
                    Number(photo.year) === Number(value) &&
                    [1, 2, 3].includes(photo.previewOrder)
            )
            .sort((a, b) => a.previewOrder - b.previewOrder)

        setSelectedIds(
            savedPhotos.map((photo) => photo.id).slice(0, 3)
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

            photos.forEach((photo) => {
                const order = selectedIds.indexOf(photo.id)

                if (order !== -1 || photo.previewOrder != null) {
                    batch.update(
                        doc(db, 'images', photo.id),
                        {
                            previewOrder:
                                order !== -1 ? order + 1 : null
                        }
                    )
                }
            })

            await batch.commit()

            setMessage('Sélection enregistrée !')
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
                maxWidth: '1000px',
                margin: '40px auto',
                background: '#191919',
                borderRadius: '12px'
            }}
        >
            <h2>Choisir les 3 photos d'aperçu</h2>

            <p>
                Sélectionne une année, puis clique sur
                trois photos dans l'ordre souhaité.
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
                        {selectedIds.length} / 3 photos sélectionnées
                    </p>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns:
                                'repeat(auto-fill, minmax(120px, 1fr))',
                            gap: '12px'
                        }}
                    >
                        {photos.map((photo) => {
                            const position =
                                selectedIds.indexOf(photo.id)

                            return (
                                <button
                                    key={photo.id}
                                    type="button"
                                    onClick={() =>
                                        selectPhoto(photo.id)
                                    }
                                    disabled={saving}
                                    style={{
                                        position: 'relative',
                                        padding: '0',
                                        border:
                                            position !== -1
                                                ? '4px solid #e2b55c'
                                                : '2px solid #555',
                                        background: '#111',
                                        cursor: 'pointer',
                                        borderRadius: '6px',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <img
                                        src={photo.url}
                                        alt={`Photo ${year}`}
                                        loading="lazy"
                                        style={{
                                            width: '100%',
                                            height: '110px',
                                            objectFit: 'cover',
                                            display: 'block'
                                        }}
                                    />

                                    {position !== -1 && (
                                        <span
                                            style={{
                                                position: 'absolute',
                                                top: '5px',
                                                right: '5px',
                                                background: '#e2b55c',
                                                color: 'black',
                                                borderRadius: '50%',
                                                width: '26px',
                                                height: '26px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {position + 1}
                                        </span>
                                    )}
                                </button>
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
                            : 'Enregistrer les 3 photos'}
                    </button>

                    {message && <p>{message}</p>}
                </>
            )}
        </div>
    )
}

export default PhotoPreviewManager
