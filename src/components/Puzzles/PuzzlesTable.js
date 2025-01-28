import React, { useState, useEffect } from 'react';
import axiosInstance from '../../auth/axiosInstance';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CreateButton from '../../utils/CreateButton';

const PuzzleTable = () => {
  const [puzzles, setPuzzles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPuzzles = async () => {
      try {
        const response = await axiosInstance.get('/api/puzzles/puzzles/');
        console.log('API Response:', response.data);
        setPuzzles(response.data.results);
      } catch (error) {
        console.error('Error fetching puzzles:', error);
      }
    };

    fetchPuzzles();
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
    console.log(`Viewing puzzle with ID: ${id}`);
    navigate(`/puzzle-view/${id}`);
  };

  const handleEdit = (id) => {
    console.log(`Editing puzzle with ID: ${id}`);
    navigate(`/puzzle-edit/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this puzzle?');
    if (confirmed) {
      try {
        await axiosInstance.delete(`/api/puzzles/puzzles/${id}/`);
        setPuzzles(puzzles.filter((puzzle) => puzzle.id !== id));
        alert('Puzzle deleted successfully.');
      } catch (error) {
        console.error('Error deleting puzzle:', error);
        alert('Failed to delete puzzle.');
      } 
    }
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <CreateButton text="Create Puzzle" redirectTo="/puzzle-create" />
      <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Description</th>
            <th scope="col" className="px-6 py-3">Price</th>
            <th scope="col" className="px-6 py-3">Stock</th>
            <th scope="col" className="px-6 py-3">Sold</th>
            <th scope="col" className="px-6 py-3">Pieces</th>
            <th scope="col" className="px-6 py-3">Image</th>
            <th scope="col" className="px-6 py-3">Age Group</th>
            <th scope="col" className="px-6 py-3">Rating</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(puzzles) && puzzles.length > 0 ? (
            puzzles.map((puzzle) => (
              <tr key={puzzle.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">{puzzle.name}</td>
                <td className="px-6 py-4">{puzzle.description}</td>
                <td className="px-6 py-4">${puzzle.price}</td>
                <td className="px-6 py-4">{puzzle.stock}</td>
                <td className="px-6 py-4">{puzzle.sold}</td>
                <td className="px-6 py-4">{puzzle.pieces}</td>
                <td className="px-6 py-4">
                  {puzzle.image && (
                    <img
                      src={puzzle.image}
                      alt={puzzle.name}
                      className="w-24 h-24 object-contain cursor-pointer"
                      onClick={() => openModal(puzzle.image)}
                    />
                  )}
                </td>
                <td className="px-6 py-4">{puzzle.age_group}</td>
                <td className="px-6 py-4">{puzzle.rating}</td>
                <td className="px-6 py-4 flex space-x-3">
                  <button
                    onClick={() => handleView(puzzle.id)}
                    className="text-yellow-500 hover:text-yellow-700"
                    title="View Puzzle"
                  >
                    <FaEye size={20} />
                  </button>
                  <button
                    onClick={() => handleEdit(puzzle.id)}
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit Puzzle"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(puzzle.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete Puzzle"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center py-4">No puzzles available.</td>
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

export default PuzzleTable;
