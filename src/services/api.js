const API_URL = import.meta.env.VITE_API_URL

export async function getPersonajes(params = {}) {
  const queryParams = new URLSearchParams(params).toString()
  const response = await fetch(`${API_URL}/personajes/?${queryParams}`)

  if (!response.ok) {
    throw new Error('Error al obtener personajes')
  }

  return response.json()
}

export async function getPersonajeById(id) {
  const response = await fetch(`${API_URL}/personajes/${id}/`)

  if (!response.ok) {
    throw new Error('Error al obtener personaje')
  }

  return response.json()
}