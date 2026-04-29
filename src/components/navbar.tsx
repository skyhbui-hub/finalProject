import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { doSignOut } from '../../firebase/auth'
import './Navbar.css'

function Navbar() {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await doSignOut();
      navigate('/sign-in');
    } catch (err) {
      console.error('Failed to sign out', err);
    }
  };

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
          {userLoggedIn ? (
            <button onClick={handleSignOut} className="sign-out-btn">
              Sign Out
            </button>
          ) : (
            <NavLink to="/sign-in" className={({ isActive }) => isActive ? 'active' : ''}>
              Sign In
            </NavLink>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar