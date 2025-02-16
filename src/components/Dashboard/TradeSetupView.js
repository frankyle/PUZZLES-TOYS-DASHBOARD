import React, { useState, useEffect } from 'react';
import axiosInstance from '../../auth/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';

const TradeSetupView = () => {
  const [trade, setTrade] = useState(null);
  const { id } = useParams(); // Get the trade id from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTradeDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/tradedetails/tradedetails/${id}/`);
        if (response.data) {
          setTrade(response.data);
        } else {
          console.error('No trade data found for this ID');
        }
      } catch (error) {
        console.error('Error fetching trade details:', error);
      }
    };

    fetchTradeDetails();
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

  if (!trade) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Trade Details</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div>
          <strong>Currency Pair:</strong> {trade.currency_pair}
        </div>
        <div>
          <strong>Traders Idea Name:</strong> {trade.traders_idea_name}
        </div>
        <div>
          <strong>Trade Signal:</strong> {trade.trade_signal}
        </div>
        <div>
          <strong>Status:</strong>
          <span className={`px-2 py-1 ${trade.is_active ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {trade.is_active ? 'Active' : 'Inactive'}
          </span>
        </div>
        <div>
          <strong>Created At:</strong> {formatDate(trade.created_at)}
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Candles</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.entries({
          idea_candle: 'Idea Candle',
          you_candle: 'Youtube Candle',
          daily_candle: 'Daily Candle',
          signal_candle: 'Signal Candle',
          entry_candle: 'Entry Candle',
          line_graph_candle: 'Line Graph Candle',
          hour_candle: 'Hour Candle',
          four_hour_candle: '4-Hour Candle',
          two_hour_candle: '2-Hour Candle',
          breakeven_candle: 'Breakeven Candle',
          take_profit1_candle: 'Take Profit 1 Candle',
          take_profit2_candle: 'Take Profit 2 Candle',
          stoploss_candle: 'Stop Loss Candle',
        }).map(([key, label]) => (
          <div key={key}>
            <strong>{label}:</strong>
            {trade[key] ? (
              <img src={trade[key]} alt={label} className="w-24 h-24 object-contain" />
            ) : (
              <p className="text-gray-500">No image available</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-700"
        >
          Back Dashboard
        </button>

      </div>
    </div>
  );
};

export default TradeSetupView;
