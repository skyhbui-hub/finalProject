const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- DB CONNECTION (FIXED) ---
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
  console.log("Connected to MongoDB");
};

// ensure DB before routes
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// --- Schema ---
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
    console.error(error.message);
    res.status(500).json({ error: 'Error retrieving food data' });
  }
});

app.get('/shopping-list/:uid', async (req, res) => {
  const items = await ShoppingListItem.find({ uid: req.params.uid });
  res.json(items);
});

app.post('/shopping-list', async (req, res) => {
  const item = new ShoppingListItem(req.body);
  const saved = await item.save();
  res.status(201).json(saved);
});

app.put('/shopping-list/:id', async (req, res) => {
  const updated = await ShoppingListItem.findByIdAndUpdate(
    req.params.id,
    { checked: req.body.checked },
    { new: true }
  );
  res.json(updated);
});

app.delete('/shopping-list/:id', async (req, res) => {
  await ShoppingListItem.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

// --- EXPORT FOR VERCEL ---
module.exports = app;