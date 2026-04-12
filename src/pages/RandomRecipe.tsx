import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function RandomRecipe() {
  const navigate = useNavigate()

  const fetchRandom = async () => {
    const response = await axios.get(
      'https://www.themealdb.com/api/json/v1/1/random.php'
    )
    const meal = response.data.meals[0]
    navigate(`/recipe/${meal.idMeal}`)
  }

  useEffect(() => {
    fetchRandom()
  }, [])

  return (
    <></>
  )
}

export default RandomRecipe