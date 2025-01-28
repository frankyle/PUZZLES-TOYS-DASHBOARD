import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateButton = ({ text = "Create", redirectTo = "/trade-details-create" }) => {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate(redirectTo); // Now it will navigate to /trade-details-create
  };

  return (
    <button 
      onClick={handleCreateClick}
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
    >
      {text}
    </button>
  );
};

export default CreateButton;
