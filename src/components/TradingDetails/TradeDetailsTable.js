import React, { useState, useEffect } from 'react';
import axiosInstance from '../../auth/axiosInstance';
import { FaEdit, FaTrashAlt, FaLightbulb, FaSortUp, FaSortDown } from 'react-icons/fa'; // Import icons
import CreateButton from '../../utils/CreateButton';
import { useNavigate } from 'react-router-dom';
import TradeDetailsModal from '../../utils/TradeDetailsModal';

const TradeDetailsTable = () => {
  const [tradeDetails, setTradeDetails] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'currency_pair', direction: 'ascending' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTradeDetails = async () => {
      try {
        const response = await axiosInstance.get('/api/tradedetails/tradedetails/');
        if (response.data && Array.isArray(response.data.results)) {
          const sortedTrades = sortData(response.data.results);
          setTradeDetails(sortedTrades);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching trade details:', error);
      }
    };

    fetchTradeDetails();
  }, []);

  const sortData = (data) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    return sortedData;
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setTradeDetails((prevTradeDetails) => sortData(prevTradeDetails));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  const handleTradingIdea = (id) => {
    console.log('Navigating to trade details with ID:', id);
    navigate(`/trade-details/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/trade-details-edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this trade?')) {
      try {
        await axiosInstance.delete(`/api/tradedetails/tradedetails/${id}/`);
        setTradeDetails((prev) => prev.filter((trade) => trade.id !== id));
        alert('Trade deleted successfully.');
      } catch (error) {
        console.error('Error deleting trade:', error);
        alert('Failed to delete trade.');
      }
    }
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <CreateButton text="Create Trading Detail" redirectTo="/trade-details-create" />
      <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
          <th scope="col" className="px-6 py-3"><strong>S/N</strong></th>
            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('currency_pair')}>
              Currency Pair {sortConfig.key === 'currency_pair' && (sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />)}
            </th>
            <th scope="col" className="px-6 py-3">Traders Idea Name</th>
            <th scope="col" className="px-6 py-3">Trade Signal</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Tradeview Idea</th>
            <th scope="col" className="px-6 py-3">Tradeview Idea Two</th>
            <th scope="col" className="px-6 py-3">Youtube Idea</th>
            <th scope="col" className="px-6 py-3">Daily Candle</th>
            <th scope="col" className="px-6 py-3">Line Graph Candle</th>
            <th scope="col" className="px-6 py-3">4-Hour Candle</th>
            <th scope="col" className="px-6 py-3">2-Hour Candle</th>
            <th scope="col" className="px-6 py-3">1-Hour Candle</th>
            <th scope="col" className="px-6 py-3">Signal Candle(30min)</th>
            <th scope="col" className="px-6 py-3">Entry Candle(15min)</th>
            <th scope="col" className="px-6 py-3">Breakeven Candle</th>
            <th scope="col" className="px-6 py-3">Take Profit 1 Candle</th>
            <th scope="col" className="px-6 py-3">Take Profit 2 Candle</th>
            <th scope="col" className="px-6 py-3">Stop Loss Candle</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Created At</th>
          </tr>
        </thead>
        <tbody>
          {tradeDetails.map((trade, index) => (
            <tr key={trade.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{trade.currency_pair}</td>
              <td className="px-6 py-4">{trade.traders_idea_name}</td>
              <td className="px-6 py-4">{trade.trade_signal}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 ${trade.is_active ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                  {trade.is_active ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-6 py-4">
                <img
                  src={trade.idea_candle}
                  alt="Idea Candle"
                  className="w-24 h-24 object-contain cursor-pointer"
                  onClick={() => openModal(trade.idea_candle)}
                />
              </td>

              <td className="px-6 py-4">
                <img
                  src={trade.idea_candle_two}
                  alt="Idea Candle"
                  className="w-24 h-24 object-contain cursor-pointer"
                  onClick={() => openModal(trade.idea_candle_two)}
                />
              </td>

              <td className="px-6 py-4">
                <img
                  src={trade.youtube_candle}
                  alt="Youtube Candle"
                  className="w-24 h-24 object-contain cursor-pointer"
                  onClick={() => openModal(trade.youtube_candle)}
                />
              </td>
              <td className="px-6 py-4">
                <img
                  src={trade.daily_candle}
                  alt="Daily Candle"
                  className="w-24 h-24 object-contain cursor-pointer"
                  onClick={() => openModal(trade.daily_candle)}
                />
              </td>
              <td className="px-6 py-4">
                <img
                  src={trade.line_graph_candle}
                  alt="Line Graph Candle"
                  className="w-24 h-24 object-contain cursor-pointer"
                  onClick={() => openModal(trade.line_graph_candle)}
                />
              </td>
              <td className="px-6 py-4">
                <img
                  src={trade.four_hour_candle}
                  alt="4-Hour Candle"
                  className="w-24 h-24 object-contain cursor-pointer"
                  onClick={() => openModal(trade.four_hour_candle)}
                />
              </td>
              <td className="px-6 py-4">
                <img
                  src={trade.two_hour_candle}
                  alt="2-Hour Candle"
                  className="w-24 h-24 object-contain cursor-pointer"
                  onClick={() => openModal(trade.two_hour_candle)}
                />
              </td>
              <td className="px-6 py-4">
                <img
                  src={trade.hour_candle}
                  alt="Hour Candle"
                  className="w-24 h-24 object-contain cursor-pointer"
                  onClick={() => openModal(trade.hour_candle)}
                />
              </td>
              <td className="px-6 py-4">
                <img
                  src={trade.signal_candle}
                  alt="Signal Candle"
                  className="w-24 h-24 object-contain cursor-pointer"
                  onClick={() => openModal(trade.signal_candle)}
                />
              </td>
              <td className="px-6 py-4">
                <img
                  src={trade.entry_candle}
                  alt="Entry Candle"
                  className="w-24 h-24 object-contain cursor-pointer"
                  onClick={() => openModal(trade.entry_candle)}
                />
              </td>
              <td className="px-6 py-4">
                <img
                  src={trade.breakeven_candle}
                  alt="Breakeven Candle"
                  className="w-24 h-24 object-contain cursor-pointer"
                  onClick={() => openModal(trade.breakeven_candle)}
                />
              </td>
              <td className="px-6 py-4">
                <img
                  src={trade.take_profit_one_candle}
                  alt="Take Profit 1 Candle"
                  className="w-24 h-24 object-contain cursor-pointer"
                  onClick={() => openModal(trade.take_profit_one_candle)}
                />
              </td>
              <td className="px-6 py-4">
                <img
                  src={trade.take_profit_two_candle}
                  alt="Take Profit 2 Candle"
                  className="w-24 h-24 object-contain cursor-pointer"
                  onClick={() => openModal(trade.take_profit_two_candle)}
                />
              </td>
              <td className="px-6 py-4">
                <img
                  src={trade.stoploss_candle}
                  alt="Stop Loss Candle"
                  className="w-24 h-24 object-contain cursor-pointer"
                  onClick={() => openModal(trade.stoploss_candle)}
                />
              </td>
              <td className="px-6 py-4">{formatDate(trade.created_at)}</td>
              <td className="px-6 py-4 flex space-x-4">
                <button
                  onClick={() => handleTradingIdea(trade.id)}
                  className="text-yellow-500 hover:text-yellow-700"
                  title="View Trading Idea"
                >
                  <FaLightbulb size={20} />
                </button>
                <button
                  onClick={() => handleEdit(trade.id)}
                  className="text-blue-500 hover:text-blue-700"
                  title="Edit"
                >
                  <FaEdit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(trade.id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  <FaTrashAlt size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

        {/* Image Modal */}
        <TradeDetailsModal isOpen={modalOpen} imageUrl={selectedImage} onClose={closeModal} />
  
    </div>
  );
};

export default TradeDetailsTable;