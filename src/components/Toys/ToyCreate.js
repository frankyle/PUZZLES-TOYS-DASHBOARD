import React, { useState } from 'react';
import axiosInstance from '../../auth/axiosInstance'; // Ensure this is correctly configured
import { useNavigate } from 'react-router-dom';

const ToyCreate = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    sold: '',
    pieces: '',
    image: '',
    age_group: '',
    rating: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input for image
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  // Submit the form data to create a new toy
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await axiosInstance.post('/api/toys/toys/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      navigate('/toys'); // Redirect to the toys list page after successful creation
      alert('Toy created successfully!');
    } catch (error) {
      setLoading(false);
      setError('Failed to create toy.');
      console.error('Error creating toy:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Create New Toy</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="stock" className="block text-sm font-medium">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="sold" className="block text-sm font-medium">Sold</label>
            <input
              type="number"
              id="sold"
              name="sold"
              value={formData.sold}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="pieces" className="block text-sm font-medium">Pieces</label>
            <input
              type="number"
              id="pieces"
              name="pieces"
              value={formData.pieces}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="age_group" className="block text-sm font-medium">Age Group</label>
          <input
            type="text"
            id="age_group"
            name="age_group"
            value={formData.age_group}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="rating" className="block text-sm font-medium">Rating</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Toy'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ToyCreate;
