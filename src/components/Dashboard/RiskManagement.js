import React, { useState } from "react";

const RiskManagement = () => {
  const [riskedAmount, setRiskedAmount] = useState("");
  const [riskedPips, setRiskedPips] = useState("");
  const [profitLoss, setProfitLoss] = useState("");
  const [profitLossPips, setProfitLossPips] = useState("");
  const [balance, setBalance] = useState(10000); // Default balance

  const handleCalculate = () => {
    const newBalance = balance + parseFloat(profitLoss || 0);
    setBalance(newBalance);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-lg font-semibold text-center mb-2">Risk Management Tracker</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Risked Amount */}
        <div>
          <label className="text-sm">Risked Amount ($)</label>
          <input
            type="number"
            value={riskedAmount}
            onChange={(e) => setRiskedAmount(e.target.value)}
            className="w-full p-2 bg-gray-700 rounded-lg"
          />
        </div>

        {/* Risked Pips */}
        <div>
          <label className="text-sm">Risked Pips</label>
          <input
            type="number"
            value={riskedPips}
            onChange={(e) => setRiskedPips(e.target.value)}
            className="w-full p-2 bg-gray-700 rounded-lg"
          />
        </div>

        {/* Profit/Loss Amount */}
        <div>
          <label className="text-sm">Profit/Loss ($)</label>
          <input
            type="number"
            value={profitLoss}
            onChange={(e) => setProfitLoss(e.target.value)}
            className="w-full p-2 bg-gray-700 rounded-lg"
          />
        </div>

        {/* Profit/Loss Pips */}
        <div>
          <label className="text-sm">Profit/Loss Pips</label>
          <input
            type="number"
            value={profitLossPips}
            onChange={(e) => setProfitLossPips(e.target.value)}
            className="w-full p-2 bg-gray-700 rounded-lg"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
        onClick={handleCalculate}
      >
        Update Balance
      </button>

      {/* Display Balance */}
      <div className="mt-4 text-center">
        <h3 className="text-lg font-bold">Updated Balance: ${balance.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default RiskManagement;
