import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 text-white shadow-md transition-all duration-300">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-extrabold tracking-wider flex items-center">
          <span
            className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent font-Pacifico"
            style={{
              fontFamily: "'Pacifico', cursive",
            }}
          >
            MGI
          </span>{" "}
          <span className="text-white ml-1">Candles</span>
        </div>

        {/* Avatar and Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0">
            <img
              src="https://via.placeholder.com/40"
              alt="User Avatar"
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-yellow-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Divider and Desktop Nav */}
      <div className="hidden md:block border-t border-gray-300 mt-2">
        <ul className="flex justify-end space-x-12 items-center text-base px-4 py-2">
          {["Dashboard", "Trade Details","Risk Trade", "Candle Images", "Indicators Confirmations", "Tasks", "Billing", "Puzzle", "Toys", "Games"].map(
            (item) => (
              <li key={item}>
                <Link
                  to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="capitalize text-white hover:text-yellow-500 transition-all"
                >
                  {item}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 text-white transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "60%", paddingTop: "2rem" }}
      >
        {/* Close Button */}
        <button
          className="absolute top-6 right-6 text-white"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Avatar */}
        <div className="flex items-center px-6 mt-4 space-x-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full">
            <img
              src="https://via.placeholder.com/40"
              alt="User Avatar"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <span className="text-lg font-semibold">User Name</span>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-col space-y-6 p-6 mt-4">
          {["Dashboard", "Trade Details","Risk Trade", "Candle Images", "Indicators Confirmations", "Tasks", "Billing", "Puzzle", "Toys", "Games"].map(
            (item) => (
              <li key={item}>
                <Link
                  to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="capitalize text-white hover:text-yellow-500 transition-all"
                >
                  {item}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
