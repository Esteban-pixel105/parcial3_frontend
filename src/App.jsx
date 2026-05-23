import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CharacterDetail from './pages/CharacterDetail'


function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/personaje/:id" element={<CharacterDetail />}/>
    </Routes>
  )
}

export default App
