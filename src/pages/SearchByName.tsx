import { useState } from 'react'
import axios from 'axios'
import './SearchStyling.css'
import { useShoppingList } from '../../contexts/shoppingListContext';

interface Food {
  fdcId: number;
  description: string;
  brandName?: string;
  brandOwner?: string;
  foodCategory?: string;
  foodNutrients?: {
    nutrientName: string;
    value: number;
    unitName: string;
  }[];
}

function SearchByName() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Food[]>([])
  const [searched, setSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [brand, setBrand] = useState('')
  const { addItem } = useShoppingList();


  const getNutrient = (food: Food, name: string) => {
    const nutrient = food.foodNutrients?.find(n => n.nutrientName === name)
    return nutrient ? `${Math.round(nutrient.value)}${nutrient.unitName.toLowerCase()}` : 'N/A'
  }

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3001/api/search?food=${encodeURIComponent(query)}${brand ? `&brand=${encodeURIComponent(brand)}` : ''}`
      );
      setResults(response.data.foods || []);
      setSearched(true);
    } catch (err) {
      console.error("Search failed", err);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleAddToList = (food: Food) => {
    const getNutrientValue = (name: string) => {
      const nutrient = food.foodNutrients?.find(n => n.nutrientName === name);
      return nutrient ? Math.round(nutrient.value) : 0;
    };
  
    addItem({
      fdcId: food.fdcId,
      description: food.description,
      brandName: food.brandName,
      foodCategory: food.foodCategory,
      calories: getNutrientValue('Energy'),
      protein: getNutrientValue('Protein'),
      fat: getNutrientValue('Total lipid (fat)'),
      carbs: getNutrientValue('Carbohydrate, by difference'),
      checked: false
    });
  };

  return (
    <div className="search-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a grocery item..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          disabled={isLoading}
        />
        <input
          type="text"
          placeholder="Brand (optional)..."
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          disabled={isLoading}
        />
        <button onClick={handleSearch} disabled={isLoading}>Search</button>
      </div>

      {isLoading && <p className="no-results">Searching...</p>}

      {!isLoading && searched && results.length === 0 && (
        <p className="no-results">No items found. Try another name!</p>
      )}

      <div className="results-grid">
        {!isLoading && results.map((food) => (
          <div className="recipe-card" key={food.fdcId}>
            <div className="recipe-card-info">
              <h3>{food.description.toLowerCase()}</h3>
              {food.brandName && <span className="brand">{food.brandName}</span>}
              {food.foodCategory && <span className="category">{food.foodCategory}</span>}
              <div className="nutrition">
                <span>Calories: {getNutrient(food, 'Energy')}</span>
                <span>Protein: {getNutrient(food, 'Protein')}</span>
                <span>Fat: {getNutrient(food, 'Total lipid (fat)')}</span>
                <span>Carbs: {getNutrient(food, 'Carbohydrate, by difference')}</span>
              </div>
              <button onClick={() => handleAddToList(food)}>
                + Add to List
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchByName;