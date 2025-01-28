import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../auth/axiosInstance';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const TaskDetails = () => {
  const { id } = useParams(); // Get task ID from URL
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/task/tasks/${id}/`);
        setTask(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching task details:', error);
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [id]);

  const handleEdit = () => {
    navigate(`/task-edit/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axiosInstance.delete(`/api/task/tasks/${id}/`);
        alert('Task deleted successfully.');
        navigate('/tasks'); // Redirect to tasks list after deletion
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!task) {
    return <div>Task not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Task Details</h1>
      
      <div className="mb-4">
        <strong className="text-lg">Title:</strong> {task.title}
      </div>
      
      <div className="mb-4">
        <strong className="text-lg">Description:</strong> {task.description}
      </div>

      <div className="mb-4">
        <strong className="text-lg">Status:</strong> 
        <span className={`px-2 py-1 ${task.completed ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {task.completed ? 'Completed' : 'Pending'}
        </span>
      </div>

      {task.image && (
        <div className="mb-4">
          <strong className="text-lg">Image:</strong>
          <img src={task.image} alt="Task Image" className="w-32 h-32 object-contain" />
        </div>
      )}

      <div className="mb-4">
        <strong className="text-lg">Created At:</strong> {new Date(task.created_at).toLocaleDateString()}
      </div>

      <div className="mb-4">
        <strong className="text-lg">Updated At:</strong> {new Date(task.updated_at).toLocaleDateString()}
      </div>

      <div className="flex space-x-4">
        {/* Edit Button */}
        <button
          onClick={handleEdit}
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
        >
          <FaEdit size={16} className="inline mr-2" />
          Edit Task
        </button>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
        >
          <FaTrashAlt size={16} className="inline mr-2" />
          Delete Task
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
