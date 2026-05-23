import { Link } from 'react-router-dom'

function CharacterCard({ character }) {
  return (
    <div className="character-card">
      <img
        src={character.imagen}
        alt={character.nombre_personaje}
        className="character-image"
      />

      <div className="character-info">
        <h3>{character.nombre_personaje}</h3>

        <p>{character.tipo}</p>

        {character.tipo === 'Heroe' && (
          <p>{character.clase_heroe} - {character.rango_heroe}</p>
        )}

        {character.tipo === 'Kaijin' && (
          <p>Amenaza: {character.nivel_amenaza}</p>
        )}

        <Link to={`/personaje/${character.id}`}>
          <button>Ver detalle</button>
        </Link>
      </div>
    </div>
  )
}

export default CharacterCard