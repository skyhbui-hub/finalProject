import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <div className='outerContainer'>
      <div className='website-title'>
        GrocerEase
      </div>
      <nav className="navbar">
        <div className="navbar-links">
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            Home
          </NavLink>
          <NavLink to="/search-by-name" className={({ isActive }) => isActive ? 'active' : ''}>
            Search by Name
          </NavLink>
          <NavLink to="/view-shopping-list" className={({ isActive }) => isActive ? 'active' : ''}>
            View Shopping List
          </NavLink>
          <NavLink to="/sign-in" className={({ isActive }) => isActive ? 'active' : ''}>
            Sign In
          </NavLink>
        </div>
      </nav>
    </div>
  )
}

export default Navbar