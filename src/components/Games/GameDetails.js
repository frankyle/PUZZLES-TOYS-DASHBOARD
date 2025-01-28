import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../auth/axiosInstance';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const GameDetails = () => {
  const { id } = useParams(); // Get game ID from URL
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/games/games/${id}/`); // Update URL according to your Django API
        setGame(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching game details:', error);
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  const handleEdit = () => {
    navigate(`/game-edit/${id}`); // Navigate to the edit page for this game
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      try {
        await axiosInstance.delete(`/api/games/games/${id}/`); // Adjust URL for delete
        alert('Game deleted successfully.');
        navigate('/games'); // Redirect to games list after deletion
      } catch (error) {
        console.error('Error deleting game:', error);
        alert('Failed to delete game.');
      }
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
      <h1 className="text-2xl font-semibold mb-4">Game Details</h1>
      
      <div className="mb-4">
        <strong className="text-lg">Title:</strong> {game.name}
      </div>
      
      <div className="mb-4">
        <strong className="text-lg">Description:</strong> {game.description}
      </div>

      <div className="mb-4">
        <strong className="text-lg">Price:</strong> ${game.price}
      </div>

      <div className="mb-4">
        <strong className="text-lg">Stock:</strong> {game.stock}
      </div>

      <div className="mb-4">
        <strong className="text-lg">Rating:</strong> {game.rating} / 5
      </div>

      <div className="mb-4">
        <strong className="text-lg">Category:</strong> {game.category}
      </div>

      {game.image && (
        <div className="mb-4">
          <strong className="text-lg">Image:</strong>
          <img src={game.image} alt="Game Image" className="w-32 h-32 object-contain" />
        </div>
      )}

      <div className="mb-4">
        <strong className="text-lg">Created At:</strong> {new Date(game.created_at).toLocaleDateString()}
      </div>

      <div className="mb-4">
        <strong className="text-lg">Updated At:</strong> {new Date(game.updated_at).toLocaleDateString()}
      </div>

      <div className="flex space-x-4">
        {/* Edit Button */}
        <button
          onClick={handleEdit}
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
        >
          <FaEdit size={16} className="inline mr-2" />
          Edit Game
        </button>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
        >
          <FaTrashAlt size={16} className="inline mr-2" />
          Delete Game
        </button>
      </div>
    </div>
  );
};

export default GameDetails;
