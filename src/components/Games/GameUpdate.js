import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../auth/axiosInstance'; // Ensure you have your axios instance set up for API calls
import { FaSave, FaUndo } from 'react-icons/fa';

const GameUpdate = () => {
  const { id } = useParams(); // Get the game ID from URL
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    sold: '',
    rating: '',
    category: 'Other',
    image: null,
    user: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/games/games/${id}/`); // Fetch game details by ID
        setGame(response.data);
        setFormData(response.data); // Initialize form data with fetched game data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching game details:', error);
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const handleSave = async () => {
    const data = new FormData();

    // Append all non-file fields
    Object.keys(formData).forEach((key) => {
      if (key !== 'image') {
        data.append(key, formData[key]);
      }
    });

    // Append updated file
    if (formData.image instanceof File) {
      data.append('image', formData.image);
    }

    try {
      await axiosInstance.put(`/api/games/games/${id}/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Game details updated successfully.');
      navigate(`/games`); // Redirect to the game list page after saving
    } catch (error) {
      console.error('Error updating game details:', error);
      alert('Failed to update game details.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!game) {
    return <div>Game not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Update Game</h1>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name || ''}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Description:</label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Price:</label>
        <input
          type="number"
          name="price"
          value={formData.price || ''}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Stock:</label>
        <input
          type="number"
          name="stock"
          value={formData.stock || ''}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Sold:</label>
        <input
          type="number"
          name="sold"
          value={formData.sold || ''}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Rating:</label>
        <input
          type="number"
          name="rating"
          value={formData.rating || ''}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Category:</label>
        <select
          name="category"
          value={formData.category || ''}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Educational">Educational</option>
          <option value="Action">Action</option>
          <option value="Puzzle">Puzzle</option>
          <option value="Adventure">Adventure</option>
          <option value="For Fun">For Fun</option>
          <option value="Creative">Creative</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Image:</label>
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none"
        />
        {game.image && (
          <img
            src={game.image}
            alt="Game Image"
            className="w-32 h-32 object-contain mt-2"
          />
        )}
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">User:</label>
        <input
          type="text"
          name="user"
          value={formData.user || ''}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          readOnly
        />
      </div>

      <div className="flex space-x-4">
        {/* Save Button */}
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
        >
          <FaSave size={16} className="inline mr-2" />
          Save Changes
        </button>

        {/* Cancel Button */}
        <button
          onClick={() => navigate(`/game-details/${id}`)}
          className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600"
        >
          <FaUndo size={16} className="inline mr-2" />
          Cancel
        </button>
      </div>
    </div>
  );
};

export default GameUpdate;
