import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import Home from './pages/Home'
import SearchByName from './pages/SearchByName'
import ShoppingList from './pages/ShoppingList'
import SignIn from './pages/SignIn'
import RecipeDetail from './pages/RecipeDetail'
import FoodDetail from './pages/FoodDetail' // 1. Import the new component
import SignUp from './pages/SignUp'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-by-name" element={<SearchByName />} />
        <Route path="/saved-recipes" element={<ShoppingList />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        
        {/* 2. Add the dynamic route for food macros */}
        <Route path="/food/:id" element={<FoodDetail />} />
      </Routes>
    </Router>
  )
}

export default App