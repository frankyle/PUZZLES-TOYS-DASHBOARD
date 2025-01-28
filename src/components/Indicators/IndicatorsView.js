import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from './../../auth/axiosInstance';
import { FaArrowLeft } from 'react-icons/fa';

const IndicatorsView = () => {
  const { id } = useParams(); // Extract the ID from the URL
  const navigate = useNavigate(); // For navigation
  const [indicator, setIndicator] = useState(null); // State to hold indicator details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchIndicator = async () => {
      try {
        const response = await axiosInstance.get(`/api/tradingindicators/tradingindicators/${id}/`);
        setIndicator(response.data); // Set the fetched indicator data
        setLoading(false); // Turn off loading
      } catch (err) {
        console.error("Error fetching indicator details:", err);
        setError('Failed to fetch indicator details.');
        setLoading(false);
      }
    };

    fetchIndicator();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <button
        onClick={() => navigate(-1)} // Go back to the previous page
        className="flex items-center text-blue-500 hover:text-blue-700 mb-4"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>
      
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-100 mb-6">
          Trading Indicator Details
        </h1>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 dark:text-gray-400"><strong>Currency Pair:</strong> {indicator.currency_pair}</p>
            <p className="text-gray-600 dark:text-gray-400"><strong>Candle Pattern:</strong> {indicator.candle_pattern}</p>
            <p className="text-gray-600 dark:text-gray-400"><strong>Fibonacci Level:</strong> {indicator.fibonacci_level}</p>
            <p className="text-gray-600 dark:text-gray-400"><strong>Session:</strong> {indicator.session}</p>
          </div>

          <div>
            <p className="text-gray-600 dark:text-gray-400"><strong>5 Min Order Block:</strong> {indicator.five_min_order_block ? 'Yes' : 'No'}</p>
            <p className="text-gray-600 dark:text-gray-400"><strong>Previous Day Color Structure:</strong> {indicator.previous_day_color_structure ? 'Yes' : 'No'}</p>
            <p className="text-gray-600 dark:text-gray-400"><strong>Asian Kill Zone:</strong> {indicator.asian_kill_zone ? 'Yes' : 'No'}</p>
            <p className="text-gray-600 dark:text-gray-400"><strong>London Kill Zone:</strong> {indicator.london_kill_zone ? 'Yes' : 'No'}</p>
          </div>

          <div>
            <p className="text-gray-600 dark:text-gray-400"><strong>New York Kill Zone:</strong> {indicator.newyork_kill_zone ? 'Yes' : 'No'}</p>
            <p className="text-gray-600 dark:text-gray-400"><strong>Flip 4-Hour Candle:</strong> {indicator.flip_four_hour_candle ? 'Yes' : 'No'}</p>
            <p className="text-gray-600 dark:text-gray-400"><strong>15 Min Break of Structure:</strong> {indicator.fifteen_min_break_of_structure ? 'Yes' : 'No'}</p>
            <p className="text-gray-600 dark:text-gray-400"><strong>FVG Blocks:</strong> {indicator.fvg_blocks ? 'Yes' : 'No'}</p>
          </div>

          <div>
            <p className="text-gray-600 dark:text-gray-400"><strong>Color UT Alert:</strong> {indicator.change_color_ut_alert ? 'Yes' : 'No'}</p>
            <p className="text-gray-600 dark:text-gray-400"><strong>Fractal & Alligator:</strong> {indicator.fractal_and_alligator ? 'Yes' : 'No'}</p>
            <p className="text-gray-600 dark:text-gray-400"><strong>Pips Stoploss:</strong> {indicator.pips_stoploss}</p>
            <p className="text-gray-600 dark:text-gray-400"><strong>Pips Gained:</strong> {indicator.pips_gained}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndicatorsView;
