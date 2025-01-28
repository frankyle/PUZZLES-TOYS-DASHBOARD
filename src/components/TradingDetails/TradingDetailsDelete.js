import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../auth/axiosInstance";

const TradingDetailsDelete = () => {
  const { id } = useParams(); // Get the trade detail ID from the URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this trade detail?");
    if (!confirmDelete) return;

    setLoading(true);
    setToast({ message: "", type: "" });

    try {
      await axiosInstance.delete(`/api/tradedetails/tradedetails/${id}/`);
      setToast({ message: "Trade detail deleted successfully!", type: "success" });
      setTimeout(() => navigate("/tradedetails"), 2000); // Redirect after success
    } catch (error) {
      console.error("Error deleting trade detail:", error);
      setToast({ message: "Failed to delete trade detail. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Delete Trade Detail</h1>

      {/* Toast Notifications */}
      {toast.message && (
        <div
          className={`mb-4 p-4 rounded ${
            toast.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {toast.message}
        </div>
      )}

      <p className="mb-4 text-gray-600">
        Are you sure you want to delete this trade detail? This action cannot be undone.
      </p>

      <button
        onClick={handleDelete}
        disabled={loading}
        className={`px-4 py-2 rounded ${
          loading ? "bg-gray-400" : "bg-red-500 text-white"
        }`}
      >
        {loading ? "Deleting..." : "Delete Trade Detail"}
      </button>

      <button
        onClick={() => navigate("/tradedetails")}
        className="ml-4 px-4 py-2 rounded bg-gray-500 text-white"
      >
        Cancel
      </button>
    </div>
  );
};

export default TradingDetailsDelete;
