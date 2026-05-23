import { createContext, useState } from 'react'
import { getPersonajes } from '../services/api'

export const CharacterContext = createContext()

export function CharacterProvider({ children }) {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1)

  const loadCharacters = async (params = {}, pageSize = 3) => {
    try {
      setLoading(true)

      const cleanParams = { ...params }

      Object.keys(cleanParams).forEach(key => {
        if (cleanParams[key] === '') {
          delete cleanParams[key]
        }
      })

      const data = await getPersonajes(cleanParams)

      setCharacters(data.results || data)

      if (data.count) {
        setTotalPages(Math.ceil(data.count / pageSize))
      }
    } catch (error) {
      console.error('Error cargando personajes:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <CharacterContext.Provider
      value={{
        characters,
        loading,
        totalPages,
        loadCharacters,
      }}
    >
      {children}
    </CharacterContext.Provider>
  )
}