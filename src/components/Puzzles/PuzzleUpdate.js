import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../auth/axiosInstance';
import { FaSave, FaUndo } from 'react-icons/fa';

const PuzzleCreate = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    pieces: '',
    age_group: 'under_5',
    rating: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

    // Append file if provided
    if (formData.image instanceof File) {
      data.append('image', formData.image);
    }

    setLoading(true);

    try {
      await axiosInstance.post('/api/puzzles/puzzles/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Puzzle created successfully.');
      navigate(`/puzzle`); // Redirect to puzzle list page after saving
    } catch (error) {
      console.error('Error creating puzzle:', error);
      alert('Failed to create puzzle.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Create New Puzzle</h1>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Title:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Price:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Stock:</label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Pieces:</label>
        <input
          type="number"
          name="pieces"
          value={formData.pieces}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Age Group:</label>
        <select
          name="age_group"
          value={formData.age_group}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="under_5">Under 5 years</option>
          <option value="under_10">Under 10 years</option>
          <option value="under_18">Under 18 years</option>
          <option value="above_18">18 years and above</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Rating:</label>
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="0"
          max="5"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Image:</label>
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none"
        />
      </div>

      <div className="flex space-x-4">
        {/* Save Button */}
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
          disabled={loading}
        >
          <FaSave size={16} className="inline mr-2" />
          {loading ? 'Saving...' : 'Save Puzzle'}
        </button>

        {/* Cancel Button */}
        <button
          onClick={() => navigate(`/puzzle`)}
          className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600"
        >
          <FaUndo size={16} className="inline mr-2" />
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PuzzleCreate;
