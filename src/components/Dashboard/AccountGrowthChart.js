import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AccountGrowthChart = ({ title, dataKey, color }) => {
  const [tradeData, setTradeData] = useState([]);

  useEffect(() => {
    fetchTradeData();
  }, []);

  const fetchTradeData = async () => {
    try {
      const response = await axios.get("YOUR_BACKEND_API_URL/trades/");
      setTradeData(response.data);
    } catch (error) {
      console.error("Error fetching trade data:", error);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-2 text-center">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={tradeData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="trade_date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={dataKey} fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AccountGrowthChart;
