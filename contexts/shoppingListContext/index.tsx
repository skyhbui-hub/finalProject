import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import { useAuth } from '../authContext';

const API_BASE = "/_/backend";

interface ShoppingItem {
  _id?: string;
  fdcId: number;
  description: string;
  brandName?: string;
  foodCategory?: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  checked: boolean;
}

interface ShoppingListContextType {
  items: ShoppingItem[];
  addItem: (item: ShoppingItem) => void;
  removeItem: (fdcId: number) => void;
  toggleChecked: (fdcId: number) => void;
}

const ShoppingListContext = createContext<ShoppingListContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  toggleChecked: () => {}
});

export function ShoppingListProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const { currentUser } = useAuth();

  // Load from MongoDB if logged in
  useEffect(() => {
    if (currentUser) {
      axios
        .get(`${API_BASE}/shopping-list/${currentUser.uid}`)
        .then(res => setItems(res.data))
        .catch(err => console.error('Failed to load list', err));
    } else {
      setItems([]);
    }
  }, [currentUser]);

  const addItem = async (item: ShoppingItem) => {
    if (currentUser) {
      const res = await axios.post(`${API_BASE}/shopping-list`, {
        ...item,
        uid: currentUser.uid
      });
      setItems(prev => [...prev, res.data]);
    } else {
      setItems(prev => [...prev, { ...item, checked: false }]);
    }
  };

  const removeItem = async (fdcId: number) => {
    const item = items.find(i => i.fdcId === fdcId);

    if (currentUser && item?._id) {
      await axios.delete(`${API_BASE}/shopping-list/${item._id}`);
    }

    setItems(prev => prev.filter(i => i.fdcId !== fdcId));
  };

  const toggleChecked = async (fdcId: number) => {
    const item = items.find(i => i.fdcId === fdcId);
    if (!item) return;

    const updated = { ...item, checked: !item.checked };

    if (currentUser && item._id) {
      await axios.put(`${API_BASE}/shopping-list/${item._id}`, {
        checked: updated.checked
      });
    }

    setItems(prev =>
      prev.map(i => (i.fdcId === fdcId ? updated : i))
    );
  };

  return (
    <ShoppingListContext.Provider
      value={{ items, addItem, removeItem, toggleChecked }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
}

export const useShoppingList = () =>
  useContext(ShoppingListContext);