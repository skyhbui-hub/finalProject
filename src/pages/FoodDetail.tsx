import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FoodDetail.css';

interface Serving {
  serving_description: string;
  calories: string;
  carbohydrate: string;
  protein: string;
  fat: string;
  sugar?: string;
  fiber?: string;
  sodium?: string;
}

interface FoodDetailData {
  food_name: string;
  brand_name?: string;
  servings: {
    serving: Serving | Serving[];
  };
}

function FoodDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState<FoodDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/food/${id}`);
        setFood(response.data.food);
      } catch (err) {
        console.error("Error fetching food details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div className="loader">Loading nutritional facts...</div>;
  if (!food) return <div>Food not found.</div>;

  // FatSecret might return a single serving object or an array of servings
  const servings = food.servings.serving;
  const mainServing = Array.isArray(servings) ? servings[0] : servings;

  return (
    <div className="detail-container">
      <button onClick={() => navigate(-1)} className="back-button">← Back to Search</button>
      
      <div className="food-header">
        <h1>{food.food_name}</h1>
        {food.brand_name && <p className="brand">Brand: {food.brand_name}</p>}
      </div>

      <div className="nutrition-card">
        <h2>Nutrition Facts</h2>
        <p className="serving-size">Serving: {mainServing.serving_description}</p>
        
        <div className="macro-grid">
          <div className="macro-item">
            <span className="label">Calories</span>
            <span className="value">{mainServing.calories}</span>
          </div>
          <div className="macro-item protein">
            <span className="label">Protein</span>
            <span className="value">{mainServing.protein}g</span>
          </div>
          <div className="macro-item carbs">
            <span className="label">Carbs</span>
            <span className="value">{mainServing.carbohydrate}g</span>
          </div>
          <div className="macro-item fat">
            <span className="label">Fat</span>
            <span className="value">{mainServing.fat}g</span>
          </div>
        </div>

        <div className="micro-list">
          {mainServing.fiber && <p>Fiber: {mainServing.fiber}g</p>}
          {mainServing.sugar && <p>Sugar: {mainServing.sugar}g</p>}
          {mainServing.sodium && <p>Sodium: {mainServing.sodium}mg</p>}
        </div>
      </div>
    </div>
  );
}

export default FoodDetail;