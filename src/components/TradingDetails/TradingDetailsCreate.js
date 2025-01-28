import React, { useState } from "react";
import axiosInstance from "../../auth/axiosInstance";

const TradingDetailsCreate = () => {
  const [formData, setFormData] = useState({
    currency_pair: "",
    traders_idea_name: "",
    trade_signal: "",
    is_active: false,
  });

  const [images, setImages] = useState({
    idea_candle: null,
    line_graph_candle: null,
    signal_candle: null,
    hour_candle: null,
    two_hour_candle: null,
    entry_candle: null,
    breakeven_candle: null,
    take_profit_one_candle: null,
    take_profit_two_candle: null,
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setImages({
      ...images,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast({ message: "", type: "" }); // Clear any existing toast messages

    const formPayload = new FormData();
    Object.keys(formData).forEach((key) => {
      formPayload.append(key, formData[key]);
    });

    Object.keys(images).forEach((key) => {
      if (images[key]) {
        formPayload.append(key, images[key]);
      }
    });

    try {
      const response = await axiosInstance.post("/api/tradedetails/tradedetails/", formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Trade detail created successfully:", response.data);
      setToast({ message: "Trade detail saved successfully!", type: "success" });
      setFormData({
        currency_pair: "",
        traders_idea_name: "",
        trade_signal: "",
        is_active: false,
      });
      setImages({
        idea_candle: null,
        line_graph_candle: null,
        signal_candle: null,
        hour_candle: null,
        two_hour_candle: null,
        entry_candle: null,
        breakeven_candle: null,
        take_profit_one_candle: null,
        take_profit_two_candle: null,
      });
    } catch (error) {
      console.error("Error creating trade detail:", error);
      setToast({ message: "Failed to save trade detail. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Create Trade Detail</h1>
  
      {/* Toast Messages */}
      {toast.message && (
        <div
          className={`mb-4 p-4 rounded ${
            toast.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {toast.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="currency_pair"
            value={formData.currency_pair}
            onChange={handleInputChange}
            placeholder="Currency Pair"
            className="border border-gray-300 p-2 rounded"
          />
          <input
            type="text"
            name="traders_idea_name"
            value={formData.traders_idea_name}
            onChange={handleInputChange}
            placeholder="Trader's Idea Name"
            className="border border-gray-300 p-2 rounded"
          />
          <select
            name="trade_signal"
            value={formData.trade_signal}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded"
          >
            <option value="">Select Trade Signal</option>
            <option value="BUYS">BUYS</option>
            <option value="SELLS">SELLS</option>
          </select>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleInputChange}
              className="form-checkbox"
            />
            <span>Active</span>
          </label>
          {Object.keys(images).map((key) => (
            <div key={key}>
              <label className="block mb-1 capitalize">{key.replace(/_/g, " ")}</label>
              <input
                type="file"
                name={key}
                onChange={handleImageChange}
                className="border border-gray-300 p-2 rounded"
                accept="image/*"
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`mt-4 px-4 py-2 rounded ${
            loading ? "bg-gray-400" : "bg-blue-500 text-white"
          }`}
        >
          {loading ? "Saving..." : "Save Trade Detail"}
        </button>
      </form>
    </div>
  );
};

export default TradingDetailsCreate;
