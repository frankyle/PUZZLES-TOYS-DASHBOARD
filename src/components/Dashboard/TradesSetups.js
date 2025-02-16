import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axiosInstance from "../../auth/axiosInstance"; 

const TradesSetups = () => {
  const [tradeDetails, setTradeDetails] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchTradeDetails = async () => {
      try {
        const response = await axiosInstance.get("/api/tradedetails/tradedetails/");
        if (response.data && Array.isArray(response.data.results)) {
          const sortedTrades = response.data.results.sort((a, b) =>
            a.currency_pair.localeCompare(b.currency_pair)
          );
          setTradeDetails(sortedTrades);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching trade details:", error);
      }
    };

    fetchTradeDetails();
  }, []);

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-white mb-6">Trade Setups</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tradeDetails.map((trade) => (
          <div
            key={trade.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
          >
            {/* Image Section */}
            <div className="relative">
              <img src={trade.daily_candle} alt={trade.currency_pair} className="w-full h-56 object-cover" />
              <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-sm px-3 py-1 rounded">
                {trade.currency_pair}
              </div>
            </div>

            {/* Details Section */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2">{trade.traders_idea_name}</h3>

              {/* Trade Signal */}
              <div className="flex items-center text-white">
                <span className="font-bold text-lg">{trade.trade_signal}</span>
              </div>

              {/* More Info Button */}
              <button
                onClick={() => navigate(`/trade-setup/${trade.id}`)}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-300"
              >
                More Info
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradesSetups;
