import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './SearchStyling.css'

interface Meal {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strCategory: string
  strArea: string
}

function SearchByName() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Meal[]>([])
  const [searched, setSearched] = useState(false)
  const navigate = useNavigate()

  const handleSearch = async () => {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    )
    setResults(response.data.meals || [])
    setSearched(true)
  }

  return (
    <div className="search-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {searched && results.length === 0 && (
        <p className="no-results">No recipes found. Try another name!</p>
      )}

      <div className="results-grid">
        {results.map((meal) => (
          <div
            className="recipe-card"
            key={meal.idMeal}
            onClick={() => navigate(`/recipe/${meal.idMeal}`)}
          >
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <div className="recipe-card-info">
              <h3>{meal.strMeal}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchByName;