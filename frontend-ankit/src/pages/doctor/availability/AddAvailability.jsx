import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import TopIcons from "../../../components/TopIcons";
import axios from "axios"; // <-- Add this import
import { apiUrl } from "../../../utils/api";

const AddAvailability = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("YYYY-MM-DD");
  const [selectedSlots, setSelectedSlots] = useState([]);

  const allSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 AM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
  ];

  const toggleSlot = (slot) => {
    setSelectedSlots(prev =>
      prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]
    );
  };

  const handleConfirm = async () => {
    if (!selectedDate || selectedSlots.length === 0) {
      alert("Please select a date and at least one slot.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        apiUrl("/api/availability"),
        {
          days: [
            {
              date: selectedDate,
              slots: selectedSlots,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(`Availability added for ${selectedDate}:\n${selectedSlots.join(", ")}`);
      navigate("/doctor/availability");
    } catch (err) {
      alert("Failed to add availability: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-[Poppins] px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/doctor/availability")} className="text-[#0A4D68] text-xl">
            <FaArrowLeft />
          </button>
          <h1 className="text-2xl font-bold text-[#0A4D68]">Availability</h1>
        </div>
        <TopIcons/>
      </div>

      {/* Date Picker */}
      <h2 className="text-lg font-semibold mb-2">Select Date</h2>
      <input
        type="date"
        value={selectedDate}
        min={new Date().toISOString().slice(0, 10)}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="mb-6 w-full max-w-xs p-2 border border-gray-300 rounded-md shadow-sm focus:outline-[#0A4D68]"
      />

      {/* Time Slots */}
      <h2 className="text-lg font-semibold mb-3">Select Hour</h2>
      <div className="grid grid-cols-3 gap-4">
        {allSlots.map((slot) => (
          <button
            key={slot}
            onClick={() => toggleSlot(slot)}
            className={`py-2 border rounded-md text-sm font-semibold ${
              selectedSlots.includes(slot)
                ? "bg-[#0A4D68] text-white"
                : "bg-white text-[#0A4D68] border-[#0A4D68]"
            }`}
          >
            {slot}
          </button>
        ))}
      </div>

      {/* Confirm Button */}
      <div className="mt-10">
        <button
          onClick={handleConfirm}
          className="w-full bg-[#0A4D68] text-white py-3 rounded-full font-semibold hover:bg-[#08374f]"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default AddAvailability;
