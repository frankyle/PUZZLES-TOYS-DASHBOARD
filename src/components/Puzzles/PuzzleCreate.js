import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../auth/axiosInstance';

const PuzzleCreate = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    pieces: '',
    age_group: '',
    rating: '',
    sold: '',
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });
    if (image) {
      form.append('image', image);
    }

    try {
      await axiosInstance.post('/api/puzzles/puzzles/', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Puzzle created successfully!');
      navigate('/puzzle');
    } catch (error) {
      console.error('Error creating puzzle:', error);
      alert('Failed to create puzzle.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-5 text-gray-800">Create Puzzle</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((key) => (
          key !== 'age_group' && (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 capitalize">{key.replace('_', ' ')}</label>
              <input
                type={key === 'price' || key === 'stock' || key === 'pieces' || key === 'rating' || key === 'sold' ? 'number' : 'text'}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )
        ))}
        <div>
          <label className="block text-sm font-medium text-gray-700">Age Group</label>
          <select
            name="age_group"
            value={formData.age_group}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Age Group</option>
            <option value="under_5">Under 5 years</option>
            <option value="under_10">Under 10 years</option>
            <option value="under_18">Under 18 years</option>
            <option value="above_18">18 years and above</option>
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
            {loading ? 'Creating...' : 'Create Puzzle'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/puzzles')}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PuzzleCreate;
