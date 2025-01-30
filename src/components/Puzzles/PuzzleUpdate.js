import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../auth/axiosInstance';

const PuzzleUpdate = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    pieces: '',
    age_group: '',
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPuzzle = async () => {
      try {
        const response = await axiosInstance.get(`/api/puzzles/puzzles/${id}/`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching puzzle:', error);
      }
    };
    fetchPuzzle();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('price', formData.price);
    form.append('stock', formData.stock);
    form.append('pieces', formData.pieces);
    form.append('age_group', formData.age_group);
    if (image) {
      form.append('image', image);
    }

    try {
      await axiosInstance.put(`/api/puzzles/puzzles/${id}/`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Puzzle updated successfully!');
      navigate('/puzzle');
    } catch (error) {
      console.error('Error updating puzzle:', error);
      alert('Failed to update puzzle.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Update Puzzle</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Stock</label>
          <input type="number" name="stock" value={formData.stock} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Pieces</label>
          <input type="number" name="pieces" value={formData.pieces} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Age Group</label>
          <select name="age_group" value={formData.age_group} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select Age Group</option>
            <option value="under_5">Under 5 years</option>
            <option value="under_10">Under 10 years</option>
            <option value="under_18">Under 18 years</option>
            <option value="above_18">18 years and above</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full px-4 py-2 border rounded-md focus:outline-none" />
        </div>

        <div className="flex justify-between items-center">
          <button type="submit" disabled={loading} className={`px-4 py-2 rounded-md text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}>
            {loading ? 'Updating...' : 'Update Puzzle'}
          </button>
          <button type="button" onClick={() => navigate('/puzzles')} className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PuzzleUpdate;
