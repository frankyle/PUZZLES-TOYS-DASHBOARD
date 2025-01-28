import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../auth/axiosInstance';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const ToyDetails = () => {
  const { id } = useParams(); // Get toy ID from URL
  const [toy, setToy] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToyDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/toys/toys/${id}/`); // Update URL according to your Django API
        setToy(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching toy details:', error);
        setLoading(false);
      }
    };

    fetchToyDetails();
  }, [id]);

  const handleEdit = () => {
    navigate(`/toy-edit/${id}`); // Navigate to the edit page for this toy
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this toy?')) {
      try {
        await axiosInstance.delete(`/api/toys/toys/${id}/`); // Adjust URL for delete
        alert('Toy deleted successfully.');
        navigate('/toys'); // Redirect to toys list after deletion
      } catch (error) {
        console.error('Error deleting toy:', error);
        alert('Failed to delete toy.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!toy) {
    return <div>Toy not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Toy Details</h1>
      
      <div className="mb-4">
        <strong className="text-lg">Name:</strong> {toy.name}
      </div>
      
      <div className="mb-4">
        <strong className="text-lg">Description:</strong> {toy.description}
      </div>

      <div className="mb-4">
        <strong className="text-lg">Price:</strong> ${toy.price}
      </div>

      <div className="mb-4">
        <strong className="text-lg">Stock:</strong> {toy.stock}
      </div>

      <div className="mb-4">
        <strong className="text-lg">Category:</strong> {toy.category}
      </div>

      {toy.image && (
        <div className="mb-4">
          <strong className="text-lg">Image:</strong>
          <img src={toy.image} alt="Toy Image" className="w-32 h-32 object-contain" />
        </div>
      )}

      <div className="mb-4">
        <strong className="text-lg">Created At:</strong> {new Date(toy.created_at).toLocaleDateString()}
      </div>

      <div className="mb-4">
        <strong className="text-lg">Updated At:</strong> {new Date(toy.updated_at).toLocaleDateString()}
      </div>

      <div className="flex space-x-4">
        {/* Edit Button */}
        <button
          onClick={handleEdit}
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
        >
          <FaEdit size={16} className="inline mr-2" />
          Edit Toy
        </button>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
        >
          <FaTrashAlt size={16} className="inline mr-2" />
          Delete Toy
        </button>
      </div>
    </div>
  );
};

export default ToyDetails;
