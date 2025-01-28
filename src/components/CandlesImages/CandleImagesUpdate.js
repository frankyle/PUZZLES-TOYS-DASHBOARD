import React, { useState, useEffect } from 'react';
import axiosInstance from '../../auth/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave, FaUndo } from 'react-icons/fa';

const CandleImageUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [candleImages, setCandleImages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    trade_detail: id, // Assuming the 'id' is passed from the TradeDetails route
  });

  useEffect(() => {
    const fetchCandleImages = async () => {
      try {
        const response = await axiosInstance.get(`/api/candleimages/candleimages/${id}/`);
        if (response.data) {
          setCandleImages(response.data);
          setFormData({
            trade_detail: id, // Make sure trade_detail is correctly set
            ...response.data,
          });
        } else {
          console.error('No candle image data found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching candle images:', error);
        setLoading(false);
      }
    };

    fetchCandleImages();
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    // Append trade_detail to the form data
    data.append('trade_detail', formData.trade_detail);
    Object.keys(formData).forEach((key) => {
      if (formData[key] instanceof File) {
        data.append(key, formData[key]);
      } else if (formData[key] !== candleImages[key]) {
        data.append(key, formData[key]);
      }
    });

    try {
      await axiosInstance.put(`/api/candleimages/candleimages/${id}/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Candle images updated successfully');
      navigate(`/candle-images`);
    } catch (error) {
      console.error('Error updating candle images:', error);
      alert('Failed to update candle images');
    }
  };

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">Edit Candle Images</h1>

      <form onSubmit={handleUpdate} className="space-y-6">
        {/* Image Upload Inputs for Candles */}
        {['monday_candle', 'tuesday_candle', 'wednesday_candle', 'thursday_candle', 'friday_candle', 'saturday_candle', 'sunday_candle', 'swing_trade_candle'].map((candleType) => (
          <div key={candleType} className="flex flex-col gap-2">
            <label htmlFor={candleType} className="text-lg font-medium">{candleType.replace('_', ' ').toUpperCase()} Image:</label>
            <input
              type="file"
              name={candleType}
              onChange={handleFileChange}
              id={candleType}
              className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {formData[candleType] && formData[candleType] instanceof File && (
              <img
                src={URL.createObjectURL(formData[candleType])}
                alt={candleType}
                className="mt-2 w-24 h-24 object-contain"
              />
            )}

            {/* Displaying already saved image if available */}
            {candleImages[candleType] && !formData[candleType] && (
              <img
                src={candleImages[candleType]}
                alt={candleType}
                className="mt-2 w-24 h-24 object-contain"
              />
            )}
          </div>
        ))}

        {/* Save and Cancel Buttons */}
        <div className="flex justify-between">
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300"
          >
            <FaSave size={18} className="inline mr-2" />
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => navigate(`/candle-images`)}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
          >
            <FaUndo size={18} className="inline mr-2" />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CandleImageUpdate;