import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../auth/axiosInstance';
import { FaSave, FaUndo } from 'react-icons/fa';

const RiskTradeUpdate = () => {
  const { id } = useParams(); // Get risk trade ID from URL
  const [riskTrade, setRiskTrade] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [formImages, setFormImages] = useState({
    mt5_chart: null,
    tradeview_chart: null,
    mt5_positions: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRiskTradeDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/risktrades/risktrades/${id}/`);
        setRiskTrade(response.data);
        setFormData(response.data); // Initialize form data with fetched risk trade data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching risk trade details:', error);
        setLoading(false);
      }
    };

    fetchRiskTradeDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setFormImages({ ...formImages, [name]: files[0] });
  };

  const handleSave = async () => {
    const formDataWithImages = new FormData();
  
    // Append form data fields (text inputs)
    Object.keys(formData).forEach((key) => {
      formDataWithImages.append(key, formData[key]);
    });
  
    // Only append the images if they are selected
    if (formImages.mt5_chart) {
      formDataWithImages.append('mt5_chart', formImages.mt5_chart);
    }
    if (formImages.tradeview_chart) {
      formDataWithImages.append('tradeview_chart', formImages.tradeview_chart);
    }
    if (formImages.mt5_positions) {
      formDataWithImages.append('mt5_positions', formImages.mt5_positions);
    }
  
    try {
      await axiosInstance.put(`/api/risktrades/risktrades/${id}/`, formDataWithImages, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure correct encoding type for file uploads
        },
      });
      alert('Risk trade details updated successfully.');
      navigate(`/risk-trade/${id}`); // Redirect to risk trade details page after saving
    } catch (error) {
      console.error('Error updating risk trade details:', error);
      alert('Failed to update risk trade details.');
    }
  };
  
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!riskTrade) {
    return <div>Risk trade not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Update Risk Trade</h1>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Currency Pair:</label>
        <input
          type="text"
          name="currency_pair"
          value={formData.currency_pair || ''}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Risk (Pips):</label>
        <input
          type="number"
          name="risk_pips"
          value={formData.risk_pips || ''}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Risk (USD):</label>
        <input
          type="number"
          name="risk_dollars"
          value={formData.risk_dollars || ''}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Risk (TZS):</label>
        <input
          type="number"
          name="risk_tsh"
          value={formData.risk_tsh || ''}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Gain (Pips):</label>
        <input
          type="number"
          name="gain_pips"
          value={formData.gain_pips || ''}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Gain (USD):</label>
        <input
          type="number"
          name="gain_dollars"
          value={formData.gain_dollars || ''}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">Gain (TZS):</label>
        <input
          type="number"
          name="gain_tsh"
          value={formData.gain_tsh || ''}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Image Inputs */}
      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">MT5 Chart:</label>
        <input
          type="file"
          name="mt5_chart"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {riskTrade.mt5_chart && (
          <div className="mt-2">
            <img src={riskTrade.mt5_chart} alt="MT5 Chart" className="w-1/2" />
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">TradeView Chart:</label>
        <input
          type="file"
          name="tradeview_chart"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {riskTrade.tradeview_chart && (
          <div className="mt-2">
            <img src={riskTrade.tradeview_chart} alt="TradeView Chart" className="w-1/2" />
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-1">MT5 Positions:</label>
        <input
          type="file"
          name="mt5_positions"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {riskTrade.mt5_positions && (
          <div className="mt-2">
            <img src={riskTrade.mt5_positions} alt="MT5 Positions" className="w-1/2" />
          </div>
        )}
      </div>

      <div className="flex space-x-4">
        {/* Save Button */}
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
        >
          <FaSave size={16} className="inline mr-2" />
          Save Changes
        </button>

        {/* Cancel Button */}
        <button
          onClick={() => navigate(`/risk-trade/${id}`)} // Go back to risk trade details
          className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600"
        >
          <FaUndo size={16} className="inline mr-2" />
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RiskTradeUpdate;
