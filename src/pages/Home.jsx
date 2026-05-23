import { useContext, useEffect, useState } from 'react'

import CharacterCard from '../components/CharacterCard'
import Pagination from '../components/Pagination'
import Navbar from '../components/Navbar'

import { CharacterContext } from '../context/CharacterContext'

import '../styles/home.css'

function Home() {
  const {
    characters,
    loading,
    totalPages,
    loadCharacters,
  } = useContext(CharacterContext)

  const [currentPage, setCurrentPage] = useState(1)

  const [filters, setFilters] = useState({
    tipo: '',
    clase_heroe: '',
    nivel_amenaza: '',
  })

  const [ordering, setOrdering] = useState('')

  const pageSize = 3

  useEffect(() => {
    loadCharacters({
      page: currentPage,
      page_size: pageSize,
      ordering,
      ...filters,
    }, pageSize)
  }, [currentPage, ordering])

  function handleFilterChange(event) {
    const { name, value } = event.target

    setFilters({
      ...filters,
      [name]: value,
    })
  }

  function applyFilters() {
    setCurrentPage(1)

    loadCharacters({
      page: 1,
      page_size: pageSize,
      ordering,
      ...filters,
    }, pageSize)
  }

  function clearFilters() {
    const emptyFilters = {
      tipo: '',
      clase_heroe: '',
      nivel_amenaza: '',
    }

    setFilters(emptyFilters)
    setOrdering('')
    setCurrentPage(1)

    loadCharacters({
      page: 1,
      page_size: pageSize,
      ordering: '',
      ...emptyFilters,
    }, pageSize)
  }

  return (
    <>
      <Navbar />

      <div className="home-layout">
        <aside className="sidebar">
          <h2>Filtros</h2>

          <label>Tipo de personaje</label>
          <select
            name="tipo"
            value={filters.tipo}
            onChange={handleFilterChange}
          >
            <option value="">Todos</option>
            <option value="Heroe">Héroe</option>
            <option value="Kaijin">Kaijin</option>
            <option value="Civil">Civil</option>
          </select>

          <label>Clase de héroe</label>
          <select
            name="clase_heroe"
            value={filters.clase_heroe}
            onChange={handleFilterChange}
          >
            <option value="">Todas</option>
            <option value="Clase S">Clase S</option>
            <option value="Clase A">Clase A</option>
            <option value="Clase B">Clase B</option>
            <option value="Clase C">Clase C</option>
            <option value="Sin clase">Sin clase</option>
          </select>

          <label>Nivel de amenaza</label>
          <select
            name="nivel_amenaza"
            value={filters.nivel_amenaza}
            onChange={handleFilterChange}
          >
            <option value="">Todos</option>
            <option value="Lobo">Lobo</option>
            <option value="Tigre">Tigre</option>
            <option value="Demonio">Demonio</option>
            <option value="Dragón">Dragón</option>
            <option value="Dios">Dios</option>
          </select>

          <h2>Ordenamiento</h2>

          <select
            value={ordering}
            onChange={event => {
              setOrdering(event.target.value)
              setCurrentPage(1)
            }}
          >
            <option value="">Sin ordenar</option>
            <option value="nivel_poder">Nivel poder menor a mayor</option>
            <option value="-nivel_poder">Nivel poder mayor a menor</option>
            <option value="edad">Edad menor a mayor</option>
            <option value="-edad">Edad mayor a menor</option>
          </select>

          <button onClick={applyFilters}>
            Aplicar filtros
          </button>

          <button onClick={clearFilters}>
            Limpiar filtros
          </button>
        </aside>

        <main className="content">
          <h1>Lista de Personajes</h1>

          {loading && <p>Cargando personajes...</p>}

          {!loading && characters.length === 0 && (
            <p>No se encontraron personajes.</p>
          )}

          <div className="characters-grid">
            {characters.map(character => (
              <CharacterCard
                key={character.id}
                character={character}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </main>
      </div>
    </>
  )
}

export default Home