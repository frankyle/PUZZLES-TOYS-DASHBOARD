import React, { useState, useEffect } from 'react';
import axiosInstance from '../../auth/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';

const TradeDetailsView = () => {
  const [trade, setTrade] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentImageIndex(0);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  if (!trade) {
    return <div>Loading...</div>;
  }

  const imageFields = {
    idea_candle: 'Idea Candle',
    idea_candle_two: 'Idea Candle Two',
    youtube_candle: 'Youtube Candle',
    daily_candle: 'Daily Candle',
    signal_candle: 'Signal Candle',
    entry_candle: 'Entry Candle',
    line_graph_candle: 'Line Graph Candle',
    hour_candle: 'Hour Candle',
    four_hour_candle: '4-Hour Candle',
    two_hour_candle: '2-Hour Candle',
    breakeven_candle: 'Breakeven Candle',
    take_profit_one_candle: 'Take Profit 1 Candle',
    take_profit_two_candle: 'Take Profit 2 Candle',
    stoploss_candle: 'Stop Loss Candle',
  };

  const imageUrls = Object.entries(imageFields)
    .map(([key, label]) => ({
      url: trade[key],
      label,
    }))
    .filter(({ url }) => url); // Filter out any null or undefined images

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
        {Object.entries(imageFields).map(([key, label], index) => (
          <div key={key}>
            <strong>{label}:</strong>
            {trade[key] ? (
              <img
                src={trade[key]}
                alt={label}
                className="w-24 h-24 object-contain cursor-pointer"
                onClick={() => openModal(index)} // Open modal with the current index
              />
            ) : (
              <p className="text-gray-500">No image available for {label}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => navigate('/trade-details')}
          className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-700"
        >
          Back to Trade Details
        </button>

        <button
          onClick={() => navigate(`/trade-details-edit/${id}`)} // Redirect to the edit page
          className="px-4 py-2 bg-orange-500 text-white rounded-full shadow-md hover:bg-orange-700"
        >
          Edit Trade
        </button>
      </div>

      {/* Modal for displaying the selected image with navigation */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-4 rounded-lg max-w-full max-h-full overflow-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imageUrls[currentImageIndex]?.url}
              alt="Selected"
              className="max-w-full max-h-screen object-contain"
            />
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              onClick={handlePrevImage}
              disabled={imageUrls.length <= 1} // Disable if there's only one image
            >
              &lt;
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              onClick={handleNextImage}
              disabled={imageUrls.length <= 1} // Disable if there's only one image
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradeDetailsView;