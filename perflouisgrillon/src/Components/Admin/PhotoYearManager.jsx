import React, { useState } from 'react'
import { doc, writeBatch } from 'firebase/firestore'
import { db } from '../../Firebase'
import useFireStore from '../../hooks/useFireStore'

function PhotoYearManager() {
    const { docs } = useFireStore('images')

    const [selectedIds, setSelectedIds] = useState([])
    const [year, setYear] = useState(2025)
    const [filter, setFilter] = useState('2026')
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState('')
    const [confirming, setConfirming] = useState(false)

    const years = Array.from(
        { length: 2026 - 2015 + 1 },
        (_, index) => 2026 - index
    )

    function getPhotoYear(photo) {
        const value = Number(photo.year)

        return Number.isInteger(value) && value >= 2006
            ? value
            : null
    }

    const visiblePhotos = docs.filter((photo) => {
        const photoYear = getPhotoYear(photo)

        if (filter === 'unclassified') {
            return photoYear === null
        }

        if (filter === 'all') {
            return true
        }

        return photoYear === Number(filter)
    })

    const selectedPhotos = docs.filter((photo) =>
        selectedIds.includes(photo.id)
    )

    function resetConfirmation() {
        setConfirming(false)
        setMessage('')
    }

    function togglePhoto(id) {
        if (saving) return

        setSelectedIds((previous) =>
            previous.includes(id)
                ? previous.filter((item) => item !== id)
                : [...previous, id]
        )

        resetConfirmation()
    }

    function clearSelection() {
        setSelectedIds([])
        resetConfirmation()
    }

    function changeFilter(value) {
        setFilter(value)
        setSelectedIds([])
        resetConfirmation()
    }

    async function saveYears() {
        if (saving || !confirming || selectedIds.length === 0) {
            return
        }

        if (selectedIds.length > 400) {
            setMessage('Limite de 400 photos par opération.')
            return
        }

        setSaving(true)
        setMessage('')

        try {
            const batch = writeBatch(db)

            selectedIds.forEach((id) => {
                const reference = doc(db, 'images', id)

                batch.update(reference, {
                    year: year
                })
            })

            await batch.commit()

            setMessage(
                `${selectedIds.length} photo(s) enregistrée(s) en ${year}.`
            )

            setSelectedIds([])
            setConfirming(false)
        } catch (error) {
            console.error(error)

            setMessage(
                'Erreur Firebase : ' + error.message
            )

            setConfirming(false)
        } finally {
            setSaving(false)
        }
    }

    return (
        <div
            style={{
                color: 'white',
                padding: '30px 20px',
                maxWidth: '1100px',
                margin: '40px auto',
                position: 'relative',
                zIndex: 1
            }}
        >
            <h2>Classement et correction des photos</h2>

            <p>
                Tu peux classer les anciennes photos ou
                corriger l'année des photos déjà enregistrées.
            </p>

            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px',
                    marginBottom: '20px'
                }}
            >
                <div>
                    <label htmlFor="photoFilter">
                        Afficher les photos :
                    </label>

                    <select
                        id="photoFilter"
                        value={filter}
                        disabled={saving}
                        onChange={(event) =>
                            changeFilter(event.target.value)
                        }
                        style={{
                            display: 'block',
                            marginTop: '8px',
                            padding: '10px'
                        }}
                    >
                        <option value="unclassified">
                            Photos à classer
                        </option>

                        {years.map((item) => (
                            <option key={item} value={item}>
                                Photos classées en {item}
                            </option>
                        ))}

                        <option value="all">
                            Toutes les photos
                        </option>
                    </select>
                </div>

                <div>
                    <label htmlFor="classificationYear">
                        Attribuer l'année :
                    </label>

                    <select
                        id="classificationYear"
                        value={year}
                        disabled={saving}
                        onChange={(event) => {
                            setYear(Number(event.target.value))
                            resetConfirmation()
                        }}
                        style={{
                            display: 'block',
                            marginTop: '8px',
                            padding: '10px'
                        }}
                    >
                        {years.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <p>
                Photos affichées : {visiblePhotos.length}
            </p>

            <p>
                Photos sélectionnées : {selectedIds.length}
            </p>

            <button
                type="button"
                onClick={clearSelection}
                disabled={saving}
                style={{ marginBottom: '20px' }}
            >
                Effacer la sélection
            </button>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns:
                        'repeat(auto-fill, minmax(150px, 1fr))',
                    gap: '15px'
                }}
            >
                {visiblePhotos.map((photo, index) => {
                    const selected =
                        selectedIds.includes(photo.id)

                    const photoYear = getPhotoYear(photo)

                    return (
                        <button
                            type="button"
                            key={photo.id}
                            disabled={saving}
                            onClick={() => togglePhoto(photo.id)}
                            style={{
                                padding: '5px',
                                background: selected
                                    ? '#1e824c'
                                    : '#222',
                                border: selected
                                    ? '3px solid white'
                                    : '1px solid #666',
                                cursor: 'pointer'
                            }}
                        >
                            <img
                                src={photo.url}
                                alt={`Photo ${index + 1}`}
                                loading="lazy"
                                style={{
                                    width: '100%',
                                    height: '130px',
                                    objectFit: 'contain'
                                }}
                            />

                            <span
                                style={{
                                    display: 'block',
                                    color: 'white',
                                    padding: '5px'
                                }}
                            >
                                Photo {index + 1}
                                {selected ? ' ✓' : ''}
                            </span>

                            <span
                                style={{
                                    display: 'block',
                                    color: '#ddd',
                                    fontSize: '12px'
                                }}
                            >
                                Année actuelle :{' '}
                                {photoYear === null
                                    ? 'Non classée'
                                    : photoYear}
                            </span>
                        </button>
                    )
                })}
            </div>

            <div
                style={{
                    marginTop: '30px',
                    padding: '20px',
                    border: '1px solid #777'
                }}
            >
                <h3>Vérification avant enregistrement</h3>

                <p>
                    Année à attribuer : <strong>{year}</strong>
                </p>

                <p>
                    Photos sélectionnées :{' '}
                    <strong>{selectedPhotos.length}</strong>
                </p>

                {selectedPhotos.length > 0 && (
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns:
                                'repeat(auto-fill, minmax(100px, 1fr))',
                            gap: '10px',
                            marginBottom: '20px'
                        }}
                    >
                        {selectedPhotos.map((photo) => (
                            <img
                                key={photo.id}
                                src={photo.url}
                                alt="Photo sélectionnée"
                                style={{
                                    width: '100%',
                                    height: '90px',
                                    objectFit: 'contain',
                                    background: '#222'
                                }}
                            />
                        ))}
                    </div>
                )}

                {!confirming ? (
                    <button
                        type="button"
                        disabled={
                            saving || selectedIds.length === 0
                        }
                        onClick={() => setConfirming(true)}
                    >
                        Vérifier la sélection
                    </button>
                ) : (
                    <>
                        <p>
                            Tu vas attribuer l'année{' '}
                            <strong>{year}</strong> à{' '}
                            <strong>
                                {selectedIds.length} photo(s)
                            </strong>.
                        </p>

                        <button
                            type="button"
                            disabled={saving}
                            onClick={saveYears}
                        >
                            {saving
                                ? 'Enregistrement...'
                                : 'Confirmer et enregistrer'}
                        </button>

                        <button
                            type="button"
                            disabled={saving}
                            onClick={() =>
                                setConfirming(false)
                            }
                            style={{ marginLeft: '10px' }}
                        >
                            Annuler
                        </button>
                    </>
                )}

                {message && <p>{message}</p>}
            </div>
        </div>
    )
}

export default PhotoYearManager
