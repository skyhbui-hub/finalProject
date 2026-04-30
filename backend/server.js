const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- FatSecret Auth Logic ---
let cachedToken = null;
let tokenExpiry = 0;

async function getFatSecretToken() {
  const now = Math.floor(Date.now() / 1000);
  
  // Return cached token if valid (30s buffer)
  if (cachedToken && now < tokenExpiry - 30) {
    return cachedToken;
  }

  try {
    const auth = Buffer.from(
      `${process.env.FATSECRET_CLIENT_ID}:${process.env.FATSECRET_CLIENT_SECRET}`
    ).toString('base64');

    const response = await axios.post(
      'https://oauth.fatsecret.com/connect/token',
      'grant_type=client_credentials&scope=basic',
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    cachedToken = response.data.access_token;
    tokenExpiry = now + response.data.expires_in; 
    return cachedToken;
  } catch (error) {
    console.error('Auth Error:', error.response?.data || error.message);
    throw new Error('Failed to authenticate with FatSecret');
  }
}

// --- Database Schema ---
const favoriteSchema = new mongoose.Schema({
  foodId: { type: String, required: true },
  name: { type: String, required: true },
  description: String, // Stores the macro summary string
  category: String,
  note: String
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

// --- Routes ---

// 1. Food Search
app.get('/api/search', async (req, res) => {
  const foodQuery = req.query.food;

  if (!foodQuery) {
    return res.status(400).json({ error: 'Search term "food" is required' });
  }

  try {
    const token = await getFatSecretToken();
    const response = await axios.get('https://platform.fatsecret.com/rest/server.api', {
      params: {
        method: 'foods.search',
        search_expression: foodQuery,
        format: 'json',
        max_results: 20
      },
      headers: { Authorization: `Bearer ${token}` }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Search API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error retrieving food data' });
  }
});

// 2. Get All Favorites
app.get('/favorites', async (req, res) => {
  try {
    const favorites = await Favorite.find();
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

// 3. Add a Favorite
app.post('/favorites', async (req, res) => {
  try {
    const newFavorite = new Favorite(req.body);
    const saved = await newFavorite.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: 'Failed to save favorite' });
  }
});

// 4. Update Note on Favorite
app.put('/favorites/:id', async (req, res) => {
  try {
    const updated = await Favorite.findByIdAndUpdate(
      req.params.id,
      { note: req.body.note },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Favorite not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: 'Update failed' });
  }
});

// 5. Delete Favorite
app.delete('/favorites/:id', async (req, res) => {
  try {
    const deleted = await Favorite.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Favorite not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Deletion failed' });
  }
});

// --- Server & DB Connection ---
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB!');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Database Connection Error:', err);
    process.exit(1); // Exit if DB fails
  });