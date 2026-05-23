import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import Navbar from '../components/Navbar'
import { getPersonajeById } from '../services/api'

import '../styles/CharacterDetail.css'

function CharacterDetail() {
  const { id } = useParams()

  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadCharacter()
  }, [id])

  async function loadCharacter() {
    try {
      setLoading(true)
      const data = await getPersonajeById(id)
      setCharacter(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <p>Cargando personaje...</p>
      </>
    )
  }

  if (!character) {
    return (
      <>
        <Navbar />
        <p>No se encontró el personaje.</p>
      </>
    )
  }

  return (
    <>
      <Navbar />

      <div className="detail-container">
        <div className="detail-card">
          <img
            src={character.imagen}
            alt={character.nombre_personaje}
          />

          <div className="detail-info">
            <Link to="/" className="back-button">
              ← Volver al inicio
            </Link>

            <h1>{character.nombre_personaje}</h1>

            <p><strong>Tipo:</strong> {character.tipo}</p>

            {character.tipo === 'Heroe' && (
              <>
                <p><strong>Clase:</strong> {character.clase_heroe}</p>
                <p><strong>Rango:</strong> {character.rango_heroe}</p>
              </>
            )}

            {character.tipo === 'Kaijin' && (
              <p><strong>Nivel de amenaza:</strong> {character.nivel_amenaza}</p>
            )}

            <p><strong>Afiliación:</strong> {character.afiliacion}</p>
            <p><strong>Nivel de poder:</strong> {character.nivel_poder}</p>
            <p><strong>Edad:</strong> {character.edad}</p>

            <p><strong>Descripción:</strong></p>
            <p>{character.descripcion}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default CharacterDetail

