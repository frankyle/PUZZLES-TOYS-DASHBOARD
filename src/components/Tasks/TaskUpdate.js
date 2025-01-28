import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../auth/axiosInstance';
import { FaSave, FaUndo } from 'react-icons/fa';

const PuzzleUpdate = () => {
  const { id } = useParams(); // Get puzzle ID from URL
  const [puzzle, setPuzzle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPuzzleDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/puzzles/puzzles/${id}/`);
        setPuzzle(response.data);
        setFormData(response.data); // Initialize form data with fetched puzzle data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching puzzle details:', error);
        setLoading(false);
      }
    };

    fetchPuzzleDetails();
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

    // Append only updated file
    if (formData.image instanceof File) {
      data.append('image', formData.image);
    }

    try {
      await axiosInstance.put(`/api/puzzles/puzzles/${id}/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Puzzle details updated successfully.');
      navigate(`/puzzles`); // Redirect to puzzle list page after saving
    } catch (error) {
      console.error('Error updating puzzle details:', error);
      alert('Failed to update puzzle details.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!puzzle) {
    return <div>Puzzle not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Update Puzzle</h1>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title || ''}
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
        <label className="block text-lg font-medium mb-1">Category:</label>
        <input
          type="text"
          name="category"
          value={formData.category || ''}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        {puzzle.image && (
          <img
            src={puzzle.image}
            alt="Puzzle Image"
            className="w-32 h-32 object-contain mt-2"
          />
        )}
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
          onClick={() => navigate(`/puzzle-details/${id}`)}
          className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600"
        >
          <FaUndo size={16} className="inline mr-2" />
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PuzzleUpdate;
