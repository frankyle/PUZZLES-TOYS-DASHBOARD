import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [summary ] = useState({
    total_trades: 10,
    active_trades: 6,
    inactive_trades: 4,
    profit_trades: 8,
    loss_trades: 2,
    total_candles: 12,
    swing_trade_candles: 3,
    total_indicators: 15,
    active_patterns: 5,
    fibonacci_levels: 4,
    active_sessions: 2,
    active_flags: 7,
  });

  useEffect(() => {
    // Dummy data - Fetch from API later
    // const fetchSummaryData = async () => {
    //   try {
    //     const response = await fetch('http://www.api.mgi.com/dashboard-summary/');
    //     const data = await response.json();
    //     setSummary(data);
    //   } catch (error) {
    //     console.error("Error fetching summary data:", error);
    //   }
    // };
    // fetchSummaryData();
  }, []);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">Dashboard Summary</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Trade Details Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-blue-600">Trade Details</h2>
          <div className="mt-4 space-y-2">
            <p><strong>Total Trade Ideas:</strong> {summary.total_trades}</p>
            <p><strong>Active Trade Ideas:</strong> {summary.active_trades}</p>
            <p><strong>Inactive Trade Ideas:</strong> {summary.inactive_trades}</p>
            <p><strong>Profit Trades:</strong> {summary.profit_trades}</p>
            <p><strong>Loss Trades:</strong> {summary.loss_trades}</p>
          </div>
        </div>

        {/* Candle Images Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-blue-600">Candle Images</h2>
          <div className="mt-4 space-y-2">
            <p><strong>Total Candle Images:</strong> {summary.total_candles}</p>
            <p><strong>Swing Trade Candles:</strong> {summary.swing_trade_candles}</p>
          </div>
        </div>

        {/* Trading Indicators Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-blue-600">Trading Indicators</h2>
          <div className="mt-4 space-y-2">
            <p><strong>Total Trading Indicators:</strong> {summary.total_indicators}</p>
            <p><strong>Active Patterns:</strong> {summary.active_patterns}</p>
            <p><strong>Fibonacci Levels:</strong> {summary.fibonacci_levels}</p>
            <p><strong>Active Sessions:</strong> {summary.active_sessions}</p>
            <p><strong>Active Flags:</strong> {summary.active_flags}</p>
          </div>
        </div>
      </div>

      {/* Additional Metrics / Stats */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-blue-600">Additional Metrics</h2>
        <div className="mt-4 space-y-2">
          <p><strong>Most Active Trade Pair:</strong> EUR/USD</p>
          <p><strong>Most Profitable Trade Idea:</strong> Buy EUR/USD - 15% gain</p>
          <p><strong>Average Profit per Trade:</strong> 8.5%</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
