import React, { useState, useEffect } from 'react';
import axiosInstance from '../../auth/axiosInstance';  // Adjust path to your axios instance
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CreateButton from '../../utils/CreateButton';
import TableViewButton from '../../utils/TableViewButton';

const GamesLitsView = () => {
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
    <div className="container mx-auto p-6">
      <CreateButton text="Create Game" redirectTo="/game-create" />
      <TableViewButton text="Table View" redirectTo="/games" />
     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {Array.isArray(games) && games.length > 0 ? (
          games.map((game) => (
            <div key={game.id} className="max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 dark:text-white">
              {game.image && (
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-48 object-contain cursor-pointer"
                  onClick={() => openModal(game.image)}
                />
              )}
              <div className="px-6 py-4">
                <h2 className="text-xl font-semibold">{game.name}</h2>
                <p className="text-gray-700 dark:text-gray-300 mt-2">{game.description}</p>
                <p className="mt-2 text-gray-900 dark:text-gray-200"><strong>Price:</strong> ${game.price}</p>
                <p className="mt-2 text-gray-900 dark:text-gray-200"><strong>Stock:</strong> {game.stock}</p>
                <p className="mt-2 text-gray-900 dark:text-gray-200"><strong>Sold:</strong> {game.sold}</p>
                <p className="mt-2 text-gray-900 dark:text-gray-200"><strong>Rating:</strong> {game.rating}</p>
                <p className="mt-2 text-gray-900 dark:text-gray-200"><strong>Category:</strong> {game.category}</p>
              </div>
              <div className="px-6 py-4 flex justify-around">
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
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-4">No games available.</div>
        )}
      </div>

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

export default GamesLitsView;
