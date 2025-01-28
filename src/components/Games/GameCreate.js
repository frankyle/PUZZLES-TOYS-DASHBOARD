import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../auth/axiosInstance';

const GameCreate = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    sold: 0,
    rating: 0,
    category: 'Other',
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form data change
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) : value,
    });
  };

  // Handle image file change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Validate form fields before submitting
  const validateForm = () => {
    const { price, stock, sold, rating } = formData;
    if (isNaN(price) || price < 0) {
      alert('Price must be a valid number greater than or equal to 0.');
      return false;
    }
    if (isNaN(stock) || stock < 0) {
      alert('Stock must be a valid number greater than or equal to 0.');
      return false;
    }
    if (isNaN(sold) || sold < 0) {
      alert('Sold must be a valid number greater than or equal to 0.');
      return false;
    }
    if (isNaN(rating) || rating < 0 || rating > 5) {
      alert('Rating must be a valid number between 0 and 5.');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Validate before proceeding

    setLoading(true);

    // Create FormData object to send data, including image
    const form = new FormData();
    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('price', formData.price);
    form.append('stock', formData.stock);
    form.append('sold', formData.sold);
    form.append('rating', formData.rating);
    form.append('category', formData.category);
    if (image) {
      form.append('image', image); // Append image if present
    }

    try {
      // Send POST request to create a new game
      await axiosInstance.post('/api/games/games/', form, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure proper content type for FormData
        },
      });
      alert('Game created successfully!');
      navigate('/games'); // Redirect to the games list or another page
    } catch (error) {
      console.error('Error creating game:', error);
      // Display detailed error message in the alert
      if (error.response) {
        alert(`Failed to create game. Error: ${error.response.data.detail || error.response.data}`);
      } else {
        alert('Failed to create game. Please check the console for more details.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Create Game</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className=" block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Sold</label>
          <input
            type="number"
            name="sold"
            value={formData.sold}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Rating</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="0"
            max="5"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Other">Other</option>
            <option value="Educational">Educational</option>
            <option value="Action">Action</option>
            <option value="Puzzle">Puzzle</option>
            <option value="Adventure">Adventure</option>
            <option value="For Fun">For Fun</option>
            <option value="Creative">Creative</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none"
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded-md text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {loading ? 'Creating...' : 'Create Game'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/games')}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default GameCreate;
