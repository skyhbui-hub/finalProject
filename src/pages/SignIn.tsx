import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './SignIn.css'

interface Favorite {
  _id: string
  mealId: string
  name: string
  thumbnail: string
  category: string
  note: string
}

function Favorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [noteInput, setNoteInput] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchFavorites()
  }, [])

  const fetchFavorites = async () => {
    const response = await axios.get('http://localhost:3001/favorites')
    setFavorites(response.data)
  }

  const handleDelete = async (id: string) => {
    await axios.delete(`http://localhost:3001/favorites/${id}`)
    setFavorites(favorites.filter(f => f._id !== id))
  }

  const handleEditSave = async (id: string) => {
    await axios.put(`http://localhost:3001/favorites/${id}`, { note: noteInput })
    setFavorites(favorites.map(f =>
      f._id === id ? { ...f, note: noteInput } : f
    ))
    setEditingId(null)
    setNoteInput('')
  }

  return (
    <div className="favorites-page">
      <p>This is the sign in page</p>
      <div className="favorites-list">
        {favorites.map((favorite) => (
          <div className="favorite-item" key={favorite._id}>
            <img
              src={favorite.thumbnail}
              alt={favorite.name}
              onClick={() => navigate(`/recipe/${favorite.mealId}`)}
            />
            <div className="favorite-info">
              <h3 onClick={() => navigate(`/recipe/${favorite.mealId}`)}>
                {favorite.name}
              </h3>
              <span>{favorite.category}</span>

              {editingId === favorite._id ? (
                <div className="note-edit">
                  <input
                    type="text"
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    placeholder="Add a note..."
                  />
                  <button onClick={() => handleEditSave(favorite._id)}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              ) : (
                <div className="note-display">
                  <p>{favorite.note || 'No note added'}</p>
                  <button onClick={() => {
                    setEditingId(favorite._id)
                    setNoteInput(favorite.note)
                  }}>Edit Note</button>
                </div>
              )}
            </div>

            <button className="delete-btn" onClick={() => handleDelete(favorite._id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Favorites