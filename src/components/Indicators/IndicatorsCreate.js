import React, { useState, useEffect } from 'react';
import axiosInstance from '../../auth/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { FaSave, FaUndo } from 'react-icons/fa';

const IndicatorsCreate = () => {
  const navigate = useNavigate();

  const [tradeDetails, setTradeDetails] = useState([]);
  const [formData, setFormData] = useState({
    trade_detail: '', // Default selected trade detail
    candle_pattern: '',
    fibonacci_level: '',
    session: '',
    five_min_order_block: false,
    previous_day_color_structure: false,
    asion_kill_zone: false,
    london_kill_zone: false,
    newyork_kill_zone: false,
    flip_four_hour_candle: false,
    fifteen_min_break_of_structure: false,
    fvg_blocks: false,
    change_color_ut_alert: false,
    flactial_and_alligator: false,
    pips_stoplost: '',
    pips_gained: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTradeDetails = async () => {
      try {
        const response = await axiosInstance.get('/api/tradedetails/tradedetails/');
        if (response.data && Array.isArray(response.data.results)) {
          const sortedTrades = response.data.results.sort((a, b) => b.is_active - a.is_active);
          setTradeDetails(sortedTrades);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching trade details:', error);
        setError('Failed to load trade details.'); // Set error message
      } finally {
        setLoading(false);
      }
    };

    fetchTradeDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post('/api/tradingindicators/tradingindicators/', formData);
      alert('Indicators created successfully');
      navigate('/indicators-confirmations');
    } catch (error) {
      console.error('Error creating indicators:', error);
      alert('Failed to create indicators');
    }
  };

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">Create New Trading Indicators</h1>

      <form onSubmit={handleCreate} className="space-y-6">
        {/* Dropdown for trade details */}
        <div className="flex flex-col gap-2">
          <label htmlFor="trade_detail" className="text-lg font-medium">Currency Pair</label>
          <select
            name="trade_detail"
            value={formData.trade_detail}
            onChange={handleInputChange}
            className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Currency Pair</option>
            {tradeDetails.map((trade) => (
              <option key={trade.id} value={trade.id}>
                {trade.currency_pair || `Trade ID: ${trade.id}`} {/* Adjusted to display currency_pair */}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown fields */}
        <div className="flex flex-col gap-2">
          <label htmlFor="candle_pattern" className="text-lg font-medium">Candle Pattern</label>
          <select
            name="candle_pattern"
            value={formData.candle_pattern}
            onChange={handleInputChange}
            className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Candle Pattern</option>
            <option value="Engulfing">Engulfing Candle</option>
            <option value="Small Body">Small Candle</option>
            <option value="Pinbar">Pin Bar Candle</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="fibonacci_level" className="text-lg font-medium">Fibonacci Level</label>
          <select
            name="fibonacci_level"
            value={formData.fibonacci_level}
            onChange={handleInputChange}
            className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Fibonacci Level</option>
            <option value="38.2%">38.2%</option>
            <option value="50%">50%</option>
            <option value="61.8%">61.8%</option>
            <option value="78.6%">78.6%</option>
          </select>
        </div>

        
        <div className="flex flex-col gap-2">
          <label htmlFor="session" className="text-lg font-medium">Session</label>
          <select
            name="session"
            value={formData.session}
            onChange={handleInputChange}
            className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Session</option>
            <option value="London">London Session</option>
            <option value="Newyork">New York Session</option>
          </select>
        </div>

        {/* Checkbox fields */}
        {[
          'five_min_order_block',
          'previous_day_color_structure',
          'asion_kill_zone',
          'london_kill_zone',
          'newyork_kill_zone',
          'flip_four_hour_candle',
          'fifteen_min_break_of_structure',
          'fvg_blocks',
          'change_color_ut_alert',
          'flactial_and_alligator',
        ].map((indicator) => (
          <div key={indicator} className="flex items-center gap-4">
            <input
              type="checkbox"
              name={indicator}
              checked={formData[indicator]}
              onChange={handleCheckboxChange}
              id={indicator}
              className="h-5 w-5"
            />
            <label htmlFor={indicator} className="text-lg font-medium capitalize">
              {indicator.replace(/_/g, ' ')}
            </label>
          </div>
        ))}

        {/* Numeric fields for Pips */}
        <div className="flex flex-col gap-2">
          <label htmlFor="pips_stoplost" className="text-lg font-medium">Pips Stop-Loss</label>
          <input
            type="number"
            name="pips_stoplost"
            value={formData.pips_stoplost}
            onChange={handleInputChange}
            className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="pips_gained" className="text-lg font-medium">Pips Gained</label>
          <input
            type="number"
            name="pips_gained"
            value={formData.pips_gained}
            onChange={handleInputChange}
            className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Save and Cancel Buttons */}
        <div className="flex justify-between">
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300"
          >
            <FaSave size={18} className="inline mr-2" />
            Save
          </button>

          <button
            type="button"
            onClick={() => navigate(`/trading-indicators`)}
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

export default IndicatorsCreate;
