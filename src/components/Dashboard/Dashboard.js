import React from "react";
import AccountGrowthChart from "./AccountGrowthChart";
// import StatsCards from "./StatsCards";
import TradeHistoryTable from "./TradeHistoryTable";
import TradeSetups from "./TradeSetups";
import RiskManagement from "./RiskManagement";
import TradesSetupAdvertisement from "./TradesSetupAdvertisement";

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

      {/* Risk Management Section */}
      <div className="mt-6">
        <RiskManagement />
      </div>

      {/* Stats Cards Section */}
      <div className="mt-6">
        <TradesSetupAdvertisement/>
      </div>

      {/* Main Content: Trade History & Side Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2 bg-gray-800 p-4 rounded-lg">
          <TradeHistoryTable />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <TradeSetups />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
