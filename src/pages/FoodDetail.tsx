import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FoodDetail.css';

// Central API base (no localhost anywhere)
const API_BASE = "/_/backend";

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
        const response = await axios.get(
          `${API_BASE}/api/food/${id}`
        );
        setFood(response.data.food);
      } catch (err) {
        console.error("Error fetching food details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handleSaveFavorite = async () => {
    if (!food) return;

    const servings = food.servings.serving;
    const mainServing = Array.isArray(servings) ? servings[0] : servings;

    try {
      await axios.post(`${API_BASE}/favorites`, {
        foodId: id,
        name: food.food_name,
        description: `Per ${mainServing.serving_description}: ${mainServing.calories}kcal`,
        category: food.brand_name || 'General',
        note: ''
      });

      alert('Added to your favorites!');
    } catch (err) {
      console.error("Failed to save favorite", err);
      alert('Failed to save to favorites.');
    }
  };

  if (loading) return <div className="loader">Loading nutritional facts...</div>;
  if (!food) return <div>Food not found.</div>;

  const servings = food.servings.serving;
  const mainServing = Array.isArray(servings) ? servings[0] : servings;

  return (
    <div className="detail-container">
      <div className="button-group" style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back to Search
        </button>

        <button onClick={handleSaveFavorite} className="fav-button">
          ★ Save Favorite
        </button>
      </div>

      <div className="food-header">
        <h1>{food.food_name}</h1>
        {food.brand_name && (
          <p className="brand">Brand: {food.brand_name}</p>
        )}
      </div>

      <div className="nutrition-card">
        <h2>Nutrition Facts</h2>
        <p className="serving-size">
          Serving: {mainServing.serving_description}
        </p>

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