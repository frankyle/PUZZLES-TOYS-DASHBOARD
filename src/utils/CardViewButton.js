import React from 'react';
import { useNavigate } from 'react-router-dom';

const CardViewButton = ({ text = "Card View", redirectTo = "/card-view" }) => {
  const navigate = useNavigate();

  const handleCardViewClick = () => {
    navigate(redirectTo); // Navigate to the specified path
  };

  return (
    <button 
      onClick={handleCardViewClick}
      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
    >
      {text}
    </button>
  );
};

export default CardViewButton;
