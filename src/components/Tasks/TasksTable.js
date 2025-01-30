import React, { useState, useEffect } from 'react';
import axiosInstance from '../../auth/axiosInstance';
import { FaEdit, FaTrashAlt, FaLightbulb } from 'react-icons/fa';
import CreateButton from '../../utils/CreateButton';
import { useNavigate } from 'react-router-dom';

const TasksTable = () => {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get('/api/task/tasks/');
        let taskList = Array.isArray(response.data.results) ? response.data.results : response.data;
        setTasks(taskList.sort((a, b) => b.completed - a.completed));
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString('en-GB', {
      weekday: 'short', year: 'numeric', month: 'long', day: 'numeric',
    }) : 'N/A';
  };

  const openModal = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTask(null);
  };

  const handleViewTask = (id) => navigate(`/task-details/${id}`);
  const handleEdit = (id) => navigate(`/task-edit/${id}`);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axiosInstance.delete(`/api/task/tasks/${id}/`);
        setTasks((prev) => prev.filter((task) => task.id !== id));
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <CreateButton text="Create Task" redirectTo="/task-create" />

      <table className="min-w-full text-sm text-gray-500">
        <thead className="text-xs text-gray-700 bg-gray-50">
          <tr>
            {['Title', 'Description', 'Status', 'Image', 'Created At', 'Updated At', 'Priority', 'Actions'].map((header) => (
              <th key={header} className="px-6 py-3">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="9" className="px-6 py-4 text-center">No tasks available.</td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task.id} className="bg-white border-b">
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
                      alt={task.name}
                      className="w-24 h-24 object-contain cursor-pointer"
                      onClick={() => openModal(task)}
                    />
                  )}
                
                </td>
                <td className="px-6 py-4">{formatDate(task.created_at)}</td>
                <td className="px-6 py-4">{formatDate(task.updated_at)}</td>
                <td className="px-6 py-4">{task.priority || 'N/A'}</td>
                 <td className="px-6 py-4 flex space-x-4">
                  <button onClick={() => handleViewTask(task.id)} className="text-yellow-500" title="View Task">
                    <FaLightbulb size={20} />
                  </button>
                  <button onClick={() => handleEdit(task.id)} className="text-blue-500" title="Edit">
                    <FaEdit size={20} />
                  </button>
                  <button onClick={() => handleDelete(task.id)} className="text-red-500" title="Delete">
                    <FaTrashAlt size={20} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {modalOpen && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={closeModal}>
          <div className="bg-white p-4 rounded-lg max-w-full max-h-full overflow-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-semibold">{selectedTask.title}</h2>
            <p className="text-sm my-2">{selectedTask.description}</p>
            <p><strong>Status:</strong> {selectedTask.completed ? 'Completed' : 'Pending'}</p>
            <p><strong>Priority:</strong> {selectedTask.priority}</p>
             {selectedTask.image && (
              <img src={`${process.env.REACT_APP_BACKEND_URL}${selectedTask.image}`} alt="Task" className="max-w-full max-h-screen object-contain" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksTable;
