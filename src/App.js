import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Billing from "./components/Billing";
import Login from "./auth/Login";

import TradeDetailsTable from "./components/TradingDetails/TradeDetailsTable";
import TableDetailsCreate from "./components/TradingDetails/TradingDetailsCreate";
import TableDetailsDelete from "./components/TradingDetails/TradingDetailsDelete"; // Import the Delete component
import TradeDetailsUpdate from "./components/TradingDetails/TradeDetailsUpdate";
import TradeDetailsView from "./components/TradingDetails/TradeDetailsView";

import TasksTable from "./components/Tasks/TasksTable";
import TaskCreate from "./components/Tasks/TaskCreate";
import TaskDetails from "./components/Tasks/TaskDetails";
import TaskUpdate from "./components/Tasks/TaskUpdate";

import CandleImages from "./components/CandlesImages/CandleImages";
import CandleImagesView from "./components/CandlesImages/CandleImagesView";
import CandleImageUpdate from "./components/CandlesImages/CandleImagesUpdate";
import CandleImageCreate from "./components/CandlesImages/CandleImagesCreate";

import IndicatorsTable from "./components/Indicators/IndicatorsTable";
import IndicatorsView from "./components/Indicators/IndicatorsView";
import IndicatorsUpdate from "./components/Indicators/IndicatorsUpdate";
import IndicatorsCreate from "./components/Indicators/IndicatorsCreate";
import PuzzleTable from "./components/Puzzles/PuzzlesTable";
import PuzzleCreate from "./components/Puzzles/PuzzleCreate";
import PuzzleDetails from "./components/Puzzles/PuzzleDetails";
import PuzzleUpdate from "./components/Puzzles/PuzzleUpdate";
import ToysTable from "./components/Toys/ToysTable";
import GamesTable from "./components/Games/GamesTable";
import GameDetails from "./components/Games/GameDetails";
import ToyDetails from "./components/Toys/ToyDetails";
import ToysUpdate from "./components/Toys/ToyUpdate";
import GameUpdate from "./components/Games/GameUpdate";
import GameCreate from "./components/Games/GameCreate";
import ToyCreate from "./components/Toys/ToyCreate";
import PuzzleCardviews from "./components/Puzzles/PuzzleCardviews";
import ToysCardView from "./components/Toys/ToysCardview";
import GamesLitsView from "./components/Games/GamesLitsView";

function App() {
  return (
    <Router>
      <div className="app">
        {/* Fixed Header */}
        <Header />
        {/* Main Content */}
        <main className="container mx-auto px-4 pt-32 pb-8"> {/* Adjusted top padding */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/trade-details" element={<TradeDetailsTable />} />
            <Route path="/trade-details-create" element={<TableDetailsCreate />} />
            <Route path="/trade-details/:id" element={<TradeDetailsView />} />
            <Route path="/trade-details-edit/:id" element={<TradeDetailsUpdate />} />
            <Route path="/trade-details/delete/:id" element={<TableDetailsDelete />} /> {/* Delete Route */}
            
            <Route path="/tasks" element={<TasksTable />} />
            <Route path="/task-create" element={<TaskCreate />} />
            <Route path="/task-details/:id" element={<TaskDetails />} />
            <Route path="/task-edit/:id" element={<TaskUpdate />} />
            
        
        
            <Route path="/candle-images" element={<CandleImages />} />
            <Route path="/candles-image-create" element={<CandleImageCreate />} />
            <Route path="/candle-view/:id" element={<CandleImagesView />} />
            <Route path="/candle-images-edit/:id" element={<CandleImageUpdate />} />

            <Route path="/indicators-confirmations" element={<IndicatorsTable />} />
            <Route path="/indicators-create" element={<IndicatorsCreate />} />
            <Route path="/indicators-view/:id" element={<IndicatorsView />} />
            <Route path="/indicators-edit/:id" element={<IndicatorsUpdate />} />

            
            <Route path="/puzzle" element={<PuzzleTable />} />
            <Route path="/puzzle-list" element={<PuzzleCardviews />} />
            <Route path="/puzzle-create" element={<PuzzleCreate />} />
            <Route path="/puzzle-view/:id" element={<PuzzleDetails />} />
            <Route path="/puzzle-edit/:id" element={<PuzzleUpdate />} />



            <Route path="/toys" element={<ToysTable />} />
            <Route path="/toys-list" element={<ToysCardView />} />
            <Route path="/toy-create" element={<ToyCreate />} />
            <Route path="/toy-view/:id" element={<ToyDetails />} />
            <Route path="/toy-edit/:id" element={<ToysUpdate />} />


            <Route path="/games" element={<GamesTable />} />
            <Route path="/game-list" element={<GamesLitsView />} />
            <Route path="/game-create" element={<GameCreate />} />
            <Route path="/game-view/:id" element={<GameDetails />} />
            <Route path="/game-edit/:id" element={<GameUpdate />} />

            <Route path="/billing" element={<Billing />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
