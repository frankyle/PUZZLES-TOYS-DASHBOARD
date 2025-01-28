import React, { useState, useEffect } from 'react';
import axiosInstance from '../../auth/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';

const CandleImageView = () => {
  const [candleImage, setCandleImage] = useState(null);
  const { id } = useParams(); // Get the candle image id from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandleImageDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/candleimages/candleimages/${id}/`);
        if (response.data) {
          setCandleImage(response.data);
        } else {
          console.error('No candle image data found for this ID');
        }
      } catch (error) {
        console.error('Error fetching candle image details:', error);
      }
    };

    fetchCandleImageDetails();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!candleImage) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Candle Image Details</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div>
          <strong>Currency Pair:</strong> {candleImage.currency_pair}
        </div>
        <div>
          <strong>Created At:</strong> {formatDate(candleImage.created_at)}
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Candles</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {['monday_candle', 'tuesday_candle', 'wednesday_candle', 'thursday_candle', 'friday_candle', 'saturday_candle', 'sunday_candle', 'swing_trade_candle'].map((key) => (
          <div key={key}>
            <strong>{key.replace('_', ' ').toUpperCase()}:</strong>
            {candleImage[key] ? (
              <img src={candleImage[key]} alt={key} className="w-24 h-24 object-contain" />
            ) : (
              <p className="text-gray-500">No image available</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => navigate('/candle-images')} // Navigate back to candle images list
          className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-700"
        >
          Back to Candle Images
        </button>

        <button
          onClick={() => navigate(`/candle-images-edit/${id}`)} // Redirect to the edit page
          className="px-4 py-2 bg-orange-500 text-white rounded-full shadow-md hover:bg-orange-700"
        >
          Edit Candle Image
        </button>
      </div>
    </div>
  );
};

export default CandleImageView;
