import React, { useState } from 'react'
import { doc, writeBatch } from 'firebase/firestore'
import { db } from '../../Firebase'
import useFireStore from '../../hooks/useFireStore'

function PhotoYearManager() {
    const { docs } = useFireStore('images')

    const [selectedIds, setSelectedIds] = useState([])
    const [year, setYear] = useState(2026)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState('')
    const [confirming, setConfirming] = useState(false)

    // Uniquement les photos qui n'ont pas encore d'année
    const unclassified = docs.filter((photo) => {
        const photoYear = Number(photo.year)
        return !Number.isInteger(photoYear) || photoYear < 2006
    })

    const years = Array.from(
        { length: 2026 - 2015 + 1 },
        (_, index) => 2026 - index
    )

    function togglePhoto(id) {
        if (saving) return

        setSelectedIds((previous) =>
            previous.includes(id)
                ? previous.filter((selectedId) => selectedId !== id)
                : [...previous, id]
        )

        setConfirming(false)
        setMessage('')
    }

    function selectAll() {
        setSelectedIds(unclassified.map((photo) => photo.id))
        setConfirming(false)
        setMessage('')
    }

    function clearSelection() {
        setSelectedIds([])
        setConfirming(false)
        setMessage('')
    }

    async function saveYears() {
        if (saving || selectedIds.length === 0) return

        setSaving(true)
        setMessage('')

        try {
            // Firestore accepte jusqu'à 500 écritures par lot.
            // On limite volontairement chaque opération à 400.
            if (selectedIds.length > 400) {
                throw new Error(
                    'Sélection trop importante : limite de 400 photos.'
                )
            }

            const batch = writeBatch(db)

            selectedIds.forEach((id) => {
                const reference = doc(db, 'images', id)

                batch.update(reference, {
                    year: year
                })
            })

            await batch.commit()

            setMessage(
                `${selectedIds.length} photo(s) classée(s) en ${year}.`
            )

            setSelectedIds([])
            setConfirming(false)
        } catch (error) {
            console.error(error)
            setMessage(
                'Erreur : enregistrement impossible. ' +
                error.message
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
                margin: '40px auto'
            }}
        >
            <h2>Classement des anciennes photos</h2>

            <p>
                Photos restant à classer : {unclassified.length}
            </p>

            <p>
                Sélectionne les photos correspondant à une année,
                puis vérifie avant d'enregistrer.
            </p>

            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="classificationYear">
                    Année :
                </label>

                <select
                    id="classificationYear"
                    value={year}
                    disabled={saving}
                    onChange={(event) => {
                        setYear(Number(event.target.value))
                        setConfirming(false)
                    }}
                    style={{
                        marginLeft: '10px',
                        padding: '8px'
                    }}
                >
                    {years.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>

            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    marginBottom: '20px'
                }}
            >
                <button
                    type="button"
                    onClick={selectAll}
                    disabled={saving}
                >
                    Tout sélectionner
                </button>

                <button
                    type="button"
                    onClick={clearSelection}
                    disabled={saving}
                >
                    Effacer la sélection
                </button>
            </div>

            <p>
                {selectedIds.length} photo(s) sélectionnée(s)
            </p>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns:
                        'repeat(auto-fill, minmax(150px, 1fr))',
                    gap: '15px'
                }}
            >
                {unclassified.map((photo, index) => {
                    const selected =
                        selectedIds.includes(photo.id)

                    return (
                        <button
                            type="button"
                            key={photo.id}
                            disabled={saving}
                            onClick={() => togglePhoto(photo.id)}
                            style={{
                                position: 'relative',
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
                <p>
                    Année choisie : <strong>{year}</strong>
                </p>

                <p>
                    Photos sélectionnées :
                    <strong> {selectedIds.length}</strong>
                </p>

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
                            Confirmer l'attribution de l'année
                            {' '}{year} à ces
                            {' '}{selectedIds.length} photos ?
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
                            onClick={() => setConfirming(false)}
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
