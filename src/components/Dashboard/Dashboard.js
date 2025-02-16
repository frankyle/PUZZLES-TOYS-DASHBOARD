import React from "react";
import AccountGrowthChart from "./AccountGrowthChart";
import TradeHistoryTable from "./TradeHistoryTable";
import TradesSetups from "./TradesSetups";

const Dashboard = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Trading Dashboard</h1>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AccountGrowthChart title="Account Growth ($)" dataKey="account_usd" color="#4ade80" />
        <AccountGrowthChart title="Account Growth (TSh)" dataKey="account_tsh" color="#60a5fa" />
        <AccountGrowthChart title="Pips Gained" dataKey="pips_gained" color="#facc15" />
      </div>
      {/* Stats Cards Section */}
      <div className="mt-6">
        <TradesSetups/>
      </div>

     <div >
          <TradeHistoryTable />
      </div>
    </div>
  );
};

export default Dashboard;
