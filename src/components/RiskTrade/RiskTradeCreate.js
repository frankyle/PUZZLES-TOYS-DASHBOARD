import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../auth/axiosInstance';
import axios from 'axios';

const RiskTradesCreate = () => {
  const [formData, setFormData] = useState({
    currency_pair: '',
    risk_pips: '',
    risk_dollars: '',
    risk_tsh: '',
    gain_pips: '',
    gain_dollars: '',
    gain_tsh: '',
    mt5_chart: null,
    tradeview_chart: null,
    mt5_positions: null,
  });
  const [loading, setLoading] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(null);  // New state for exchange rate
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current USD to TZS exchange rate
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD'); // Example API
        setExchangeRate(response.data.rates.TZS); // Set the TZS exchange rate
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };
    fetchExchangeRate();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'risk_dollars' || name === 'gain_dollars') {
      // Convert dollar to TZS if dollar values are changed
      const dollarAmount = parseFloat(value);
      if (!isNaN(dollarAmount) && exchangeRate) {
        const convertedAmount = dollarAmount * exchangeRate;
        if (name === 'risk_dollars') {
          setFormData((prev) => ({ ...prev, risk_tsh: convertedAmount.toFixed(2) }));
        } else {
          setFormData((prev) => ({ ...prev, gain_tsh: convertedAmount.toFixed(2) }));
        }
      }
    }
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append('currency_pair', formData.currency_pair);
    form.append('risk_pips', formData.risk_pips);
    form.append('risk_dollars', formData.risk_dollars);
    form.append('risk_tsh', formData.risk_tsh);
    form.append('gain_pips', formData.gain_pips);
    form.append('gain_dollars', formData.gain_dollars);
    form.append('gain_tsh', formData.gain_tsh);
    if (formData.mt5_chart) {
      form.append('mt5_chart', formData.mt5_chart);
    }
    if (formData.tradeview_chart) {
      form.append('tradeview_chart', formData.tradeview_chart);
    }
    if (formData.mt5_positions) {
      form.append('mt5_positions', formData.mt5_positions);
    }

    try {
      await axiosInstance.post('/api/risktrades/risktrades/', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Risk Trade created successfully!');
      navigate('/risk-trade'); // Redirect after success
    } catch (error) {
      console.error('Error creating risk trade:', error);
      alert('Failed to create risk trade.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Create Risk Trade</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Currency Pair</label>
          <input
            type="text"
            name="currency_pair"
            value={formData.currency_pair}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Risk (Pips)</label>
          <input
            type="number"
            name="risk_pips"
            value={formData.risk_pips}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Risk (USD)</label>
          <input
            type="number"
            name="risk_dollars"
            value={formData.risk_dollars}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Risk (TZS)</label>
          <input
            type="number"
            name="risk_tsh"
            value={formData.risk_tsh}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Gain (Pips)</label>
          <input
            type="number"
            name="gain_pips"
            value={formData.gain_pips}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Gain (USD)</label>
          <input
            type="number"
            name="gain_dollars"
            value={formData.gain_dollars}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Gain (TZS)</label>
          <input
            type="number"
            name="gain_tsh"
            value={formData.gain_tsh}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">MT5 Chart</label>
          <input
            type="file"
            name="mt5_chart"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">TradeView Chart</label>
          <input
            type="file"
            name="tradeview_chart"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">MT5 Positions</label>
          <input
            type="file"
            name="mt5_positions"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Risk Trade'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RiskTradesCreate;
