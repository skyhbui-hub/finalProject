const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Database Schema ---
const shoppingListSchema = new mongoose.Schema({
  uid: String,
  fdcId: Number,
  description: String,  
  brandName: String,
  foodCategory: String,
  calories: Number,
  protein: Number,
  fat: Number,
  carbs: Number,
  checked: { type: Boolean, default: false }
});

const ShoppingListItem = mongoose.model('ShoppingListItem', shoppingListSchema);

// --- Routes ---

// 1. Food Search via USDA
app.get('/api/search', async (req, res) => {
  const foodQuery = req.query.food;
  const brandQuery = req.query.brand;

  if (!foodQuery) {
    return res.status(400).json({ error: 'Search term is required' });
  }

  try {
    const response = await axios.get(
      'https://api.nal.usda.gov/fdc/v1/foods/search',
      {
        params: {
          query: foodQuery,
          api_key: process.env.USDA_API_KEY,
          pageSize: 20,
          dataType: 'Branded',
          ...(brandQuery && { brandOwner: brandQuery })
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Search API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error retrieving food data' });
  }
});

// 2. Get shopping list for a user
app.get('/shopping-list/:uid', async (req, res) => {
  try {
    const items = await ShoppingListItem.find({ uid: req.params.uid });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch shopping list' });
  }
});

// 3. Add item to shopping list
app.post('/shopping-list', async (req, res) => {
  try {
    const item = new ShoppingListItem(req.body);
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: 'Failed to save item' });
  }
});

// 4. Toggle checked status
app.put('/shopping-list/:id', async (req, res) => {
  try {
    const updated = await ShoppingListItem.findByIdAndUpdate(
      req.params.id,
      { checked: req.body.checked },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Item not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: 'Update failed' });
  }
});

// 5. Delete item from shopping list
app.delete('/shopping-list/:id', async (req, res) => {
  try {
    const deleted = await ShoppingListItem.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Deletion failed' });
  }
});

// --- Server & DB Connection ---
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB!');
    // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Database Connection Error:', err);
    process.exit(1);
  });

  module.exports = app;