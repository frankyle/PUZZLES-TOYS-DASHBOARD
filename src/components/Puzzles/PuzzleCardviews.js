import React, { useState, useEffect } from 'react';
import axiosInstance from '../../auth/axiosInstance';
import { FaEye, FaEdit, FaTrashAlt, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CreateButton from '../../utils/CreateButton';
import TableViewButton from '../../utils/TableViewButton';

const PuzzleCardviews = () => {
  const [puzzles, setPuzzles] = useState([]);
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

  const handleView = (id) => {
    navigate(`/puzzle-view/${id}`);
  };

  const handleEdit = (id) => {
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

  const handleAddToCart = (puzzle) => {
    alert(`${puzzle.name} added to cart!`);
  };

  return (
    <div className="container mx-auto p-6">
      <CreateButton text="Create Puzzle" redirectTo="/puzzle-create" />
      <TableViewButton text="Table View" redirectTo="/puzzle" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {puzzles.length > 0 ? (
          puzzles.map((puzzle) => (
            <div key={puzzle.id} className="bg-white shadow-lg rounded-lg p-4">
              <img
                src={puzzle.image || 'https://via.placeholder.com/150'}
                alt={puzzle.name}
                className="w-full h-48 object-cover rounded-md cursor-pointer"
                onClick={() => setSelectedImage(puzzle.image || 'https://via.placeholder.com/150')}
              />
              <h3 className="text-lg font-bold mt-2">{puzzle.name}</h3>
              <p className="text-gray-600 text-sm">{puzzle.description}</p>
              <p className="text-lg font-semibold mt-2">${puzzle.price}</p>
              <p className="text-sm text-gray-500">Stock: {puzzle.stock} | Sold: {puzzle.sold}</p>
              <p className="text-sm text-gray-500">Rating: {puzzle.rating} | Rating: {puzzle.rating}</p>
              <p className="text-sm text-gray-500">Sold: {puzzle.sold} | Sold: {puzzle.sold}</p>
              <div className="flex justify-between items-center mt-4">
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
                <button
                  onClick={() => handleAddToCart(puzzle)}
                  className="text-green-500 hover:text-green-700"
                  title="Add to Cart"
                >
                  <FaShoppingCart size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No puzzles available.</p>
        )}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={() => setSelectedImage(null)}>
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg">
            <img src={selectedImage} alt="Selected Puzzle" className="w-full h-auto rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PuzzleCardviews;
