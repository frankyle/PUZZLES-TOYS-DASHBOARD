import React, { useState, useEffect } from 'react';
import axiosInstance from '../../auth/axiosInstance';
import { FaEdit, FaTrashAlt, FaLightbulb } from 'react-icons/fa'; // Import icons
import CreateButton from '../../utils/CreateButton';
import { useNavigate } from 'react-router-dom';

const TasksTable = () => {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get('/api/task/tasks/');
        console.log("API Response:", response.data); // Log the response

        // Check if the response data and results are valid
        if (response.data && Array.isArray(response.data.results)) {
          const sortedTasks = response.data.results.sort((a, b) => b.completed - a.completed);
          setTasks(sortedTasks);
        } else {
          console.error('Unexpected response format: Missing or invalid "results" array.');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    // Fetch tasks on initial render
    fetchTasks();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  const handleViewTask = (id) => {
    console.log('Navigating to task details with ID:', id); // Debugging log
    navigate(`/task-details/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/task-edit/${id}`); // Navigate to the edit page for the selected task
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const response = await axiosInstance.delete(`/api/task/tasks/${id}/`);
        if (response.status === 204) {
          setTasks((prev) => prev.filter((task) => task.id !== id));
          alert('Task deleted successfully.');
        } else {
          alert('Failed to delete task.');
        }
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task.');
      }
    }
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <CreateButton text="Create Task" redirectTo="/task-create" />

      <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Title</th>
            <th scope="col" className="px-6 py-3">Description</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Image</th>
            <th scope="col" className="px-6 py-3">Created At</th>
            <th scope="col" className="px-6 py-3">Updated At</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                No tasks available.
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">{task.title}</td>
                <td className="px-6 py-4">{task.description}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 ${task.completed ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {task.completed ? 'Completed' : 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {task.image && (
                    <img
                      src={task.image}
                      alt="Task Image"
                      className="w-24 h-24 object-contain cursor-pointer"
                      onClick={() => openModal(task.image)}
                    />
                  )}
                </td>
                <td className="px-6 py-4">{formatDate(task.created_at)}</td>
                <td className="px-6 py-4">{formatDate(task.updated_at)}</td>
                <td className="px-6 py-4 flex space-x-4">
                  {/* View Task Button */}
                  <button
                    onClick={() => handleViewTask(task.id)}
                    className="text-yellow-500 hover:text-yellow-700"
                    title="View Task"
                  >
                    <FaLightbulb size={20} />
                  </button>

                  {/* Edit Button */}
                  <button
                    onClick={() => handleEdit(task.id)}
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit"
                  >
                    <FaEdit size={20} />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </td>
              </tr>
            ))
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

export default TasksTable;
