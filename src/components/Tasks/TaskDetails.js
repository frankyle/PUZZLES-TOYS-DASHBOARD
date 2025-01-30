import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../auth/axiosInstance';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/task/tasks/${id}/`);
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching task details:', error);
        setError('Failed to fetch task details.');
      } finally {
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
        navigate('/tasks');
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task.');
      }
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!task) return <div className="text-center">Task not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Task Details</h1>

      <div className="mb-4">
        <strong className="text-lg">Title:</strong> {task.title || 'N/A'}
      </div>

      <div className="mb-4">
        <strong className="text-lg">Description:</strong> {task.description || 'No description'}
      </div>

      <div className="mb-4">
        <strong className="text-lg">Completed:</strong> {task.completed ? 'Yes' : 'No'}
      </div>

      <div className="mb-4">
        <strong className="text-lg">Priority:</strong> {task.priority}
      </div>

      {task.due_date && (
        <div className="mb-4">
          <strong className="text-lg">Due Date:</strong> {new Date(task.due_date).toLocaleDateString()}
        </div>
      )}

      {task.notes && (
        <div className="mb-4">
          <strong className="text-lg">Notes:</strong> {task.notes}
        </div>
      )}

      {task.estimated_time && (
        <div className="mb-4">
          <strong className="text-lg">Estimated Time:</strong> {Math.floor(task.estimated_time / 60)}h {task.estimated_time % 60}m
        </div>
      )}

      {task.image && (
        <div className="mb-4">
          <strong className="text-lg">Image:</strong>
          <img src={task.image} alt="Task" className="w-32 h-32 object-contain border rounded-lg mt-2" />
        </div>
      )}

      <div className="mb-4">
        <strong className="text-lg">Created At:</strong> {new Date(task.created_at).toLocaleString()}
      </div>

      <div className="mb-4">
        <strong className="text-lg">Updated At:</strong> {new Date(task.updated_at).toLocaleString()}
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleEdit}
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 flex items-center"
        >
          <FaEdit size={16} className="mr-2" />
          Edit Task
        </button>

        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 flex items-center"
        >
          <FaTrashAlt size={16} className="mr-2" />
          Delete Task
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;