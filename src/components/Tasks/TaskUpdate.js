import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../auth/axiosInstance';
import { FaSave, FaUndo } from 'react-icons/fa';

const TaskUpdate = () => {
  const { id } = useParams(); // Get task ID from URL
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: '',
    priority: 'medium', // Default priority
    notes: '',
    estimated_time: '',
    image: null,
    completed: false, // Default completed state
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/task/tasks/${id}/`);
        setTask(response.data);
        setFormData({
          title: response.data.title || '',
          description: response.data.description || '',
          due_date: response.data.due_date || '',
          priority: response.data.priority || 'medium',
          notes: response.data.notes || '',
          estimated_time: response.data.estimated_time || '',
          image: null, // Do not prefill image, keep null
          completed: response.data.completed || false, // Prefill the completed state
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching task details:', error);
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleSave = async () => {
    const data = new FormData();

    // Append non-file fields
    Object.keys(formData).forEach((key) => {
      if (key !== 'image') {
        data.append(key, formData[key] || '');
      }
    });

    // Append image file if selected
    if (formData.image instanceof File) {
      data.append('image', formData.image);
    }

    try {
      await axiosInstance.put(`/api/task/tasks/${id}/`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Task details updated successfully.');
      navigate(`/tasks`); // Redirect to task list
    } catch (error) {
      console.error('Error updating task details:', error);
      alert('Failed to update task details.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!task) return <div>Task not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Update Task</h1>

      {/* Title */}
      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Due Date */}
      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Due Date:</label>
        <input
          type="datetime-local"
          name="due_date"
          value={formData.due_date}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Priority */}
      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Priority:</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Notes */}
      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Notes:</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Estimated Time */}
      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Estimated Time (minutes):</label>
        <input
          type="number"
          name="estimated_time"
          value={formData.estimated_time}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Image Upload */}
      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Image:</label>
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none"
        />
        {task.image && (
          <img src={task.image} alt="Task" className="w-32 h-32 object-contain mt-2" />
        )}
      </div>

      {/* Completed Checkbox */}
      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Completed:</label>
        <input
          type="checkbox"
          name="completed"
          checked={formData.completed}
          onChange={handleCheckboxChange}
          className="mr-2"
        />
        <span>Mark as Completed</span>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
        >
          <FaSave size={16} className="inline mr-2" />
          Save Changes
        </button>
        <button
          onClick={() => navigate(`/task-details/${id}`)}
          className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600"
        >
          <FaUndo size={16} className="inline mr-2" />
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TaskUpdate;
