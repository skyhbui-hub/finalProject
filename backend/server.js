const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.log('Error connecting to MongoDB:', err))

const favoriteSchema = new mongoose.Schema({
  mealId: String,
  name: String,
  thumbnail: String,
  category: String,
  note: String
})

const Favorite = mongoose.model('Favorite', favoriteSchema)

app.get('/favorites', async (req, res) => {
  const favorites = await Favorite.find()
  res.json(favorites)
})

app.post('/favorites', async (req, res) => {
  const favorite = new Favorite(req.body)
  await favorite.save()
  res.json(favorite)
})

app.put('/favorites/:id', async (req, res) => {
  const favorite = await Favorite.findByIdAndUpdate(
    req.params.id,
    { note: req.body.note },
    { new: true }
  )
  res.json(favorite)
})

app.delete('/favorites/:id', async (req, res) => {
  await Favorite.findByIdAndDelete(req.params.id)
  res.json({ message: 'Deleted successfully' })
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})