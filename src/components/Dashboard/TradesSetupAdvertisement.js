import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import axiosInstance from "./../../auth/axiosInstance"; // Import axios instance

const TradesSetupAdvertisement = () => {
  const [tradeDetails, setTradeDetails] = useState([]);

  useEffect(() => {
    const fetchTradeDetails = async () => {
      try {
        const response = await axiosInstance.get("/api/tradedetails/tradedetails/");
        if (response.data && Array.isArray(response.data.results)) {
          const sortedTrades = response.data.results.sort((a, b) => b.is_active - a.is_active);
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

  const renderSignalIcon = (signal) => {
    if (signal === "Buy") {
      return <FaArrowUp className="text-green-500" />;
    } else if (signal === "Sell") {
      return <FaArrowDown className="text-red-500" />;
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-lg font-semibold text-center mb-4">Trade Setups</h2>
      <div className="flex overflow-x-auto space-x-4">
        {tradeDetails.map((trade) => (
          <div key={trade.id} className="w-80 bg-gray-700 rounded-lg shadow-lg">
            {/* Card Content */}
            <div className="relative">
              {/* Currency Name and Image */}
              <img
                src={trade.daily_candle}
                alt={trade.currency_pair}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute top-2 left-2 bg-gray-800 bg-opacity-60 text-white text-sm px-2 py-1 rounded">
                {trade.currency_pair}
              </div>
            </div>

            {/* Trader's Idea */}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white">{trade.traders_idea_name}</h3>

              {/* Signal */}
              <div className="mt-2 flex items-center">
                <span
                  className={`font-bold text-sm ${
                    trade.trade_signal === "Buy" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {trade.trade_signal}
                </span>
                {renderSignalIcon(trade.trade_signal)}
              </div>

              {/* More Info Button */}
              <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">
                More Info
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradesSetupAdvertisement;
