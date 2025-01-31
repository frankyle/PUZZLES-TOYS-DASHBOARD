import React, { useState, useEffect } from 'react';
import axiosInstance from '../../auth/axiosInstance'; // Ensure this is correctly configured
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CreateButton from '../../utils/CreateButton';
import TableViewButton from '../../utils/TableViewButton';

const ToysCardView = () => {
  const [toys, setToys] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // State to manage selected image for modal
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

  // Function to handle image click and show modal
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // Close the modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="container mx-auto p-6">
      <CreateButton text="Create Toy" redirectTo="/toy-create" />
      <TableViewButton text="Table View" redirectTo="/toys" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {Array.isArray(toys) && toys.length > 0 ? (
          toys.map((toy) => (
            <div key={toy.id} className="max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 dark:text-white">
              {toy.image && (
                <img
                  src={toy.image}
                  alt={toy.name}
                  className="w-full h-48 object-contain cursor-pointer"
                  onClick={() => handleImageClick(toy.image)} // Open the modal on image click
                />
              )}
              <div className="px-6 py-4">
                <h2 className="text-xl font-semibold">{toy.name}</h2>
                <p className="text-gray-700 dark:text-gray-300 mt-2">{toy.description}</p>
                <p className="mt-2 text-gray-900 dark:text-gray-200"><strong>Price:</strong> ${toy.price}</p>
                <p className="mt-2 text-gray-900 dark:text-gray-200"><strong>Age Group:</strong> {toy.age_group}</p>
                <p className="mt-2 text-gray-900 dark:text-gray-200"><strong>Rating:</strong> {toy.rating}</p>
              </div>
              <div className="px-6 py-4 flex justify-around">
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
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-4">No toys available.</div>
        )}
      </div>

      {/* Modal for Image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={closeModal}>
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Selected Toy" className="w-full h-auto rounded-lg " />
          </div>
        </div>
      )}
    </div>
  );
};

export default ToysCardView;
