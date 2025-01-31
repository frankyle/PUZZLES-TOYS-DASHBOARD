import React from "react";

const trades = [
  { id: 1, pair: "EUR/USD", result: "+$250", pips: "+30", date: "2025-01-31" },
  { id: 2, pair: "GBP/USD", result: "-$100", pips: "-15", date: "2025-01-30" },
];

const TradeHistoryTable = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Trade History</h2>
      <table className="w-full text-left border-collapse border border-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <th className="p-2 border border-gray-600">Pair</th>
            <th className="p-2 border border-gray-600">Result</th>
            <th className="p-2 border border-gray-600">Pips</th>
            <th className="p-2 border border-gray-600">Date</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <tr key={trade.id} className="bg-gray-800">
              <td className="p-2 border border-gray-600">{trade.pair}</td>
              <td className="p-2 border border-gray-600">{trade.result}</td>
              <td className="p-2 border border-gray-600">{trade.pips}</td>
              <td className="p-2 border border-gray-600">{trade.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradeHistoryTable;
