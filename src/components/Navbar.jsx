import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>ONE PUNCH MAN</h2>
        <span>Hero Database</span>
      </div>

      <div className="navbar-links">
        <Link to="/">
          Inicio
        </Link>
      </div>
    </nav>
  )
}

export default Navbar