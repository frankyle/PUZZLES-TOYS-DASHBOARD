import React from "react";

const stats = [
  { title: "Winning Trades", value: "75", color: "text-green-400" },
  { title: "Losing Trades", value: "25", color: "text-red-400" },
  { title: "Win Rate", value: "75%", color: "text-yellow-400" },
  { title: "Best Trade", value: "$500", color: "text-blue-400" },
  { title: "Worst Trade", value: "-$200", color: "text-red-400" },
  { title: "Current Balance", value: "$10,500", color: "text-green-400" },
];

const StatsCards = () => {
  return (
    <div className="flex gap-4 overflow-x-scroll scrollbar-hide p-2">
      {stats.map((stat, index) => (
        <div key={index} className={`bg-gray-800 p-4 rounded-lg min-w-[160px] text-center`}>
          <h3 className={`text-lg font-semibold ${stat.color}`}>{stat.title}</h3>
          <p className="text-2xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
