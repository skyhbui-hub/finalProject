import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './RecipeDetail.css'

interface Meal {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strInstructions: string
  strCategory: string
  strArea: string
  [key: string]: string
}

function RecipeDetail() {
  const { id } = useParams()
  const [meal, setMeal] = useState<Meal | null>(null)

  useEffect(() => {
    const fetchMeal = async () => {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      )
      setMeal(response.data.meals[0])
    }
    fetchMeal()
  }, [id])

  const getIngredients = (meal: Meal) => {
    const ingredients = []
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`]
      const measure = meal[`strMeasure${i}`]
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure?.trim()} ${ingredient.trim()}`)
      }
    }
    return ingredients
  }

  const handleFavorite = async () => {
    await axios.post('http://localhost:3001/favorites', {
      mealId: meal?.idMeal,
      name: meal?.strMeal,
      thumbnail: meal?.strMealThumb,
      category: meal?.strCategory,
      note: ''
    })
    alert('Added to favorites!')
  }

  if (!meal) return <p className="loading">Loading...</p>

  return (
    <div className="recipe-detail">
      <div className="recipe-header">
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        <div className="recipe-header-info">
          <h1>{meal.strMeal}</h1>
          <button className="favorite-btn" onClick={handleFavorite}>
            ♥ Add to Favorites
          </button>
        </div>
      </div>

      <div className="recipe-body">
        <div className="ingredients">
          <h2>Ingredients</h2>
          <ul>
            {getIngredients(meal).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="instructions">
          <h2>Instructions</h2>
          <p>{meal.strInstructions}</p>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetail