import React, { useState, useEffect } from 'react';
import axiosInstance from '../../auth/axiosInstance';  // Adjust path to your axios instance
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CreateButton from '../../utils/CreateButton';
import CardViewButton from '../../utils/CardViewButton';

const GamesTable = () => {
  const [games, setGames] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axiosInstance.get('/api/games/games/');  // Update this URL according to your Django API
        console.log('API Response:', response.data);
        setGames(response.data.results);  // Adjust if API response structure is different
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  const handleView = (id) => {
    console.log(`Viewing game with ID: ${id}`);
    navigate(`/game-view/${id}`);
  };

  const handleEdit = (id) => {
    console.log(`Editing game with ID: ${id}`);
    navigate(`/game-edit/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this game?');
    if (confirmed) {
      try {
        await axiosInstance.delete(`/api/games/games/${id}/`);  // Adjust URL for delete
        setGames(games.filter((game) => game.id !== id));
        alert('Game deleted successfully.');
      } catch (error) {
        console.error('Error deleting game:', error);
        alert('Failed to delete game.');
      }
    }
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <CreateButton text="Create Game" redirectTo="/game-create" />
      <CardViewButton text="Card View" redirectTo="/game-list" />
     
      <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Description</th>
            <th scope="col" className="px-6 py-3">Price</th>
            <th scope="col" className="px-6 py-3">Stock</th>
            <th scope="col" className="px-6 py-3">Sold</th>
            <th scope="col" className="px-6 py-3">Rating</th>
            <th scope="col" className="px-6 py-3">Category</th>
            <th scope="col" className="px-6 py-3">Image</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(games) && games.length > 0 ? (
            games.map((game) => (
              <tr key={game.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">{game.name}</td>
                <td className="px-6 py-4">{game.description}</td>
                <td className="px-6 py-4">${game.price}</td>
                <td className="px-6 py-4">{game.stock}</td>
                <td className="px-6 py-4">{game.sold}</td>
                <td className="px-6 py-4">{game.rating}</td>
                <td className="px-6 py-4">{game.category}</td>
                <td className="px-6 py-4">
                  {game.image && (
                    <img
                      src={game.image}
                      alt={game.name}
                      className="w-24 h-24 object-contain cursor-pointer"
                      onClick={() => openModal(game.image)}
                    />
                  )}
                </td>
                <td className="px-6 py-4 flex space-x-3">
                  <button
                    onClick={() => handleView(game.id)}
                    className="text-yellow-500 hover:text-yellow-700"
                    title="View Game"
                  >
                    <FaEye size={20} />
                  </button>
                  <button
                    onClick={() => handleEdit(game.id)}
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit Game"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(game.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete Game"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center py-4">No games available.</td>
            </tr>
          )}
        </tbody>
      </table>

      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-4 rounded-lg max-w-full max-h-full overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-screen object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GamesTable;
