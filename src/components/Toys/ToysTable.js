import React, { useState, useEffect } from 'react';
import axiosInstance from '../../auth/axiosInstance'; // Ensure this is correctly configured
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CreateButton from '../../utils/CreateButton';
import CardViewButton from '../../utils/CardViewButton';

const ToysTable = () => {
  const [toys, setToys] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedToy, setSelectedToy] = useState(null);
  const navigate = useNavigate();

  // Fetch toys data
  useEffect(() => {
    const fetchToys = async () => {
      try {
        const response = await axiosInstance.get('/api/toys/toys/'); // Adjust the endpoint as needed
        console.log('API Response:', response.data);
        setToys(response.data.results); // Assuming the response is in results
      } catch (error) {
        console.error('Error fetching toys:', error);
      }
    };

    fetchToys();
  }, []);

  const openModal = (toy) => {
    setSelectedToy(toy);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedToy(null);
  };

  const handleView = (id) => {
    console.log(`Viewing toy with ID: ${id}`);
    navigate(`/toy-view/${id}`);
  };

  const handleEdit = (id) => {
    console.log(`Editing toy with ID: ${id}`);
    navigate(`/toy-edit/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this toy?');
    if (confirmed) {
      try {
        await axiosInstance.delete(`/api/toys/toys/${id}/`); // Adjust the endpoint as needed
        setToys(toys.filter((toy) => toy.id !== id));
        alert('Toy deleted successfully.');
      } catch (error) {
        console.error('Error deleting toy:', error);
        alert('Failed to delete toy.');
      }
    }
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <CreateButton text="Create Toy" redirectTo="/toy-create" />
      <CardViewButton text="Card View" redirectTo="/toys-list" />
     
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
          {Array.isArray(toys) && toys.length > 0 ? (
            toys.map((toy) => (
              <tr key={toy.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">{toy.name}</td>
                <td className="px-6 py-4">{toy.description}</td>
                <td className="px-6 py-4">${toy.price}</td>
                <td className="px-6 py-4">{toy.stock}</td>
                <td className="px-6 py-4">{toy.sold}</td>
                <td className="px-6 py-4">{toy.pieces}</td>
                <td className="px-6 py-4">
                  {toy.image && (
                    <img
                      src={toy.image}
                      alt={toy.name}
                      className="w-24 h-24 object-contain cursor-pointer"
                      onClick={() => openModal(toy)} // Pass the entire toy object to modal
                    />
                  )}
                </td>
                <td className="px-6 py-4">{toy.age_group}</td>
                <td className="px-6 py-4">{toy.rating}</td>
                <td className="px-6 py-4 flex space-x-3">
                  <button
                    onClick={() => handleView(toy.id)}
                    className="text-yellow-500 hover:text-yellow-700"
                    title="View Toy"
                  >
                    <FaEye size={20} />
                  </button>
                  <button
                    onClick={() => handleEdit(toy.id)}
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit Toy"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(toy.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete Toy"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center py-4">No toys available.</td>
            </tr>
          )}
        </tbody>
      </table>

      {modalOpen && selectedToy && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-4 rounded-lg max-w-full max-h-full overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedToy.image}
              alt={selectedToy.name}
              className="max-w-full max-h-screen object-contain"
            />
            <div className="mt-4">
              <h2 className="text-xl font-semibold">{selectedToy.name}</h2>
              <p>{selectedToy.description}</p>
              <p><strong>Price:</strong> ${selectedToy.price}</p>
              <p><strong>Stock:</strong> {selectedToy.stock}</p>
              <p><strong>Age Group:</strong> {selectedToy.age_group}</p>
              <p><strong>Rating:</strong> {selectedToy.rating}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToysTable;
