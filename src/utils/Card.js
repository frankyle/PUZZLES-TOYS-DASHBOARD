import React from 'react';

function Card({ title, content }) {
  return (
    <div className="bg-white shadow-md rounded px-4 py-6">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p>{content}</p>
    </div>
  );
}

export default Card;