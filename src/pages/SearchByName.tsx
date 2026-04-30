import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './SearchStyling.css'

interface Food {
  food_id: string;
  food_name: string;
  food_type: string;
  brand_name?: string;
  food_description: string; 
}

function SearchByName() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Food[]>([])
  const [searched, setSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false) // Added loading state
  const navigate = useNavigate()

  const handleSearch = async () => {
    if (!query.trim()) return; // Don't search for empty strings

    setIsLoading(true);
    try {
      // Use encodeURIComponent for safe URL strings
      const response = await axios.get(`http://localhost:3001/api/search?food=${encodeURIComponent(query)}`);
      
      const data = response.data.foods?.food;
      
      // Keep your array check—it's essential for this API
      const formattedResults = Array.isArray(data) ? data : data ? [data] : [];
      
      setResults(formattedResults);
      setSearched(true);
    } catch (err) {
      console.error("Search failed", err);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="search-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for food macros..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          // Trigger search on Enter
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          disabled={isLoading}
        />
      </div>

      {isLoading && <div className="loader">Finding nutritional info...</div>}

      {!isLoading && searched && results.length === 0 && (
        <p className="no-results">No food items found. Try another name!</p>
      )}

      <div className="results-grid">
        {!isLoading && results.map((food) => (
          <div
            className="food-card" 
            key={food.food_id}
            style={{ cursor: 'pointer' }} // Visual hint that it's clickable
          >
            <div className="food-card-info">
              <h3>
                {food.brand_name ? `${food.brand_name} - ` : ''}
                {food.food_name}
              </h3>
              {/* This summary string often contains the macros */}
              <p>{food.food_description}</p> 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchByName;