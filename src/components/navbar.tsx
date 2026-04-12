import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <div className='outerContainer'>
      <div className='website-title'>
        Dishcovery
      </div>
      <nav className="navbar">
        <div className="navbar-links">
          <NavLink to="/search-by-name" className={({ isActive }) => isActive ? 'active' : ''}>
            Search by Name
          </NavLink>
          <NavLink to="/search-by-ingredient" className={({ isActive }) => isActive ? 'active' : ''}>
            Search by Ingredient
          </NavLink>
          <NavLink to="/random" className={({ isActive }) => isActive ? 'active' : ''}>
            Random Recipe
          </NavLink>
          <NavLink to="/favorites" className={({ isActive }) => isActive ? 'active' : ''}>
            View Favorites
          </NavLink>
        </div>
      </nav>
    </div>
  )
}

export default Navbar