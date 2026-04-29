import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import Home from './pages/Home'
import SearchByName from './pages/SearchByName'
import SearchByIngredient from './pages/SearchByIngredient'
import ShoppingList from './pages/ShoppingList'
import SignIn from './pages/SignIn'
import RecipeDetail from './pages/RecipeDetail'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-by-name" element={<SearchByName />} />
        <Route path="/search-by-ingredient" element={<SearchByIngredient />} />
        <Route path="/view-shopping-list" element={<ShoppingList />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  )
}

export default App