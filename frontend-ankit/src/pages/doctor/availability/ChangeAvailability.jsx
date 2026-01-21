import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import BottomNav from "../../../components/BottomNav";
import TopIcons from "../../../components/TopIcons";
import axios from "axios";
import { apiUrl } from "../../../utils/api";

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
];

const ChangeAvailability = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("YYYY-MM-DD");
  const [selectedSlots, setSelectedSlots] = useState([]);

  const toggleSlot = (slot) => {
    setSelectedSlots(prev =>
      prev.includes(slot)
        ? prev.filter(s => s !== slot)
        : [...prev, slot]
    );
  };

  const resetSlots = () => setSelectedSlots([]);

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
      alert("Availability updated!");
      navigate("/doctor/availability");
    } catch (err) {
      alert("Failed to update availability: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="relative bg-[#F8FAFC] min-h-screen font-[Poppins] px-4 py-6 md:px-10 md:py-10 overflow-hidden">
      {/* Gradient Header Background */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-[#E0F7FA] to-[#D1F2EB] blur-xl opacity-60 rounded-b-full -z-10" />

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/doctor/availability")}
            className="text-[#0A4D68] text-xl"
          >
            <FaArrowLeft />
          </button>
          <h1 className="text-3xl font-bold text-[#0A4D68] tracking-tight">Change Availability</h1>
        </div>
        <TopIcons />
      </div>

      {/* Availability Form */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-gray-100 transition-all">
        <h2 className="text-lg font-bold text-[#1F2A37] mb-3">Select Date</h2>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full mb-8 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A4D68] text-[#0A4D68] font-medium text-sm shadow-sm"
        />

        <h2 className="text-lg font-bold text-[#1F2A37] mb-4">Select Hour</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {timeSlots.map((slot) => (
            <SlotButton
              key={slot}
              label={slot}
              selected={selectedSlots.includes(slot)}
              onClick={() => toggleSlot(slot)}
            />
          ))}
        </div>

        {/* Confirm & Reset Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <button
            onClick={handleConfirm}
            className="flex-1 bg-[#0A4D68] hover:bg-[#08374f] text-white py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Confirm Changes
          </button>
          <button
            onClick={resetSlots}
            className="flex-1 bg-white text-[#0A4D68] border border-[#0A4D68] py-3 rounded-full font-semibold hover:bg-[#F1FCFB] transition"
          >
            Reset Slots
          </button>
        </div>
      </div>

      {/* BottomNav for mobile */}
      <div className="block md:hidden mt-10">
        <BottomNav />
      </div>
    </div>
  );
};

const SlotButton = ({ label, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`rounded-lg px-4 py-2 text-sm font-semibold border transition-all duration-200 shadow-sm ${
      selected
        ? "bg-[#0A4D68] text-white border-[#0A4D68] scale-[1.05]"
        : "bg-white text-[#0A4D68] border-[#BEE3E5] hover:shadow-md"
    }`}
  >
    {label}
  </button>
);

export default ChangeAvailability;
