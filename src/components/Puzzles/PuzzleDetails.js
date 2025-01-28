import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../auth/axiosInstance';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const PuzzleDetails = () => {
  const { id } = useParams(); // Get puzzle ID from URL
  const [puzzle, setPuzzle] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPuzzleDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/puzzles/puzzles/${id}/`); // Update URL according to your Django API
        setPuzzle(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching puzzle details:', error);
        setLoading(false);
      }
    };

    fetchPuzzleDetails();
  }, [id]);

  const handleEdit = () => {
    navigate(`/puzzle-edit/${id}`); // Navigate to the edit page for this puzzle
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this puzzle?')) {
      try {
        await axiosInstance.delete(`/api/puzzles/puzzles/${id}/`); // Adjust URL for delete
        alert('Puzzle deleted successfully.');
        navigate('/puzzles'); // Redirect to puzzles list after deletion
      } catch (error) {
        console.error('Error deleting puzzle:', error);
        alert('Failed to delete puzzle.');
      }
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
      <h1 className="text-2xl font-semibold mb-4">Puzzle Details</h1>
      
      <div className="mb-4">
        <strong className="text-lg">Name:</strong> {puzzle.name}
      </div>
      
      <div className="mb-4">
        <strong className="text-lg">Description:</strong> {puzzle.description}
      </div>

      <div className="mb-4">
        <strong className="text-lg">Price:</strong> ${puzzle.price}
      </div>

      <div className="mb-4">
        <strong className="text-lg">Stock:</strong> {puzzle.stock}
      </div>

      <div className="mb-4">
        <strong className="text-lg">Category:</strong> {puzzle.category}
      </div>

      {puzzle.image && (
        <div className="mb-4">
          <strong className="text-lg">Image:</strong>
          <img src={puzzle.image} alt="Puzzle Image" className="w-32 h-32 object-contain" />
        </div>
      )}

      <div className="mb-4">
        <strong className="text-lg">Created At:</strong> {new Date(puzzle.created_at).toLocaleDateString()}
      </div>

      <div className="mb-4">
        <strong className="text-lg">Updated At:</strong> {new Date(puzzle.updated_at).toLocaleDateString()}
      </div>

      <div className="flex space-x-4">
        {/* Edit Button */}
        <button
          onClick={handleEdit}
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
        >
          <FaEdit size={16} className="inline mr-2" />
          Edit Puzzle
        </button>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
        >
          <FaTrashAlt size={16} className="inline mr-2" />
          Delete Puzzle
        </button>
      </div>
    </div>
  );
};

export default PuzzleDetails;
