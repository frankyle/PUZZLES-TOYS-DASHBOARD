import React from 'react';
import { useNavigate } from 'react-router-dom';

const TableViewButton = ({ text = "Table View", redirectTo = "/table-view" }) => {
  const navigate = useNavigate();

  const handleTableViewClick = () => {
    navigate(redirectTo); // Navigate to the specified path
  };

  return (
    <button 
      onClick={handleTableViewClick}
      className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
    >
      {text}
    </button>
  );
};

export default TableViewButton;
