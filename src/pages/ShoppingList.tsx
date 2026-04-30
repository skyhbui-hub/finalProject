import { useShoppingList } from '../../contexts/shoppingListContext';
import { useAuth } from '../../contexts/authContext';
import './ShoppingList.css';

function ShoppingList() {
  const { items, removeItem, toggleChecked } = useShoppingList();
  const { userLoggedIn } = useAuth();

  const totalCalories = items.reduce((sum, i) => sum + i.calories, 0);
  const totalProtein = items.reduce((sum, i) => sum + i.protein, 0);
  const totalFat = items.reduce((sum, i) => sum + i.fat, 0);
  const totalCarbs = items.reduce((sum, i) => sum + i.carbs, 0);

  return (
    <div className="shopping-list-page">
      {!userLoggedIn && (
        <p className="guest-warning">You are not signed in. Your list will not be saved when you close the tab.</p>
      )}
      <div className="shopping-list-container">
        <div className="items-list">
          <h2>Items</h2>
          {items.length === 0 && <p className="empty">No items added yet. Search for groceries to add!</p>}
          {items.map((item) => (
            <div key={item.fdcId} className={`list-item ${item.checked ? 'checked' : ''}`}>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleChecked(item.fdcId)}
              />
              <div className="item-details">
                <span className="item-name">
                  {item.description?.toLowerCase() ?? 'Unknown item'}
                </span>
                {item.brandName && <span className="item-brand">{item.brandName}</span>}
              </div>
              <button className="remove-btn" onClick={() => removeItem(item.fdcId)}>✕</button>
            </div>
          ))}
        </div>

        <div className="macros-summary">
          <h2>Total Nutrition</h2>
          <div className="macro-card">
            <span>Calories</span>
            <strong>{totalCalories} kcal</strong>
          </div>
          <div className="macro-card">
            <span>Protein</span>
            <strong>{totalProtein}g</strong>
          </div>
          <div className="macro-card">
            <span>Fat</span>
            <strong>{totalFat}g</strong>
          </div>
          <div className="macro-card">
            <span>Carbs</span>
            <strong>{totalCarbs}g</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingList;